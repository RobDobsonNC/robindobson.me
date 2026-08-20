<?php
/**
 * Importer.
 *
 * Reads the generated bundle (dist/coeus-bundle.json) and installs it into
 * Bricks: global variables, global classes, theme styles and page templates.
 *
 * Writing the Bricks options directly is more reliable than hand-feeding
 * several dozen JSON files through the UI, and it is idempotent — every
 * record carries a deterministic id, so re-running updates in place instead
 * of duplicating.
 *
 * Usage:
 *   wp coeus import                 # everything
 *   wp coeus import --only=classes  # variables|classes|styles|templates
 *   wp coeus import --dry-run
 *
 * Or: Appearance -> Coeus Import in wp-admin.
 *
 * @package coeus
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** Where the build output lives, relative to the child theme. */
function coeus_bundle_path() {
	/**
	 * Filter the bundle location, e.g. to load from outside the theme.
	 *
	 * @param string $path Absolute path to coeus-bundle.json.
	 */
	return apply_filters( 'coeus/bundle_path', COEUS_DIR . '/dist/coeus-bundle.json' );
}

/**
 * Read and decode the bundle.
 *
 * @return array|WP_Error
 */
function coeus_read_bundle() {
	$path = coeus_bundle_path();

	if ( ! file_exists( $path ) ) {
		return new WP_Error(
			'coeus_bundle_missing',
			sprintf( 'Bundle not found at %s. Run `npm run build` in coeus-bricks/ and copy dist/ into the theme.', $path )
		);
	}

	$raw  = file_get_contents( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	$data = json_decode( $raw, true );

	if ( JSON_ERROR_NONE !== json_last_error() ) {
		return new WP_Error( 'coeus_bundle_invalid', 'Bundle is not valid JSON: ' . json_last_error_msg() );
	}

	return $data;
}

/**
 * Install global variables.
 *
 * @param array $bundle  Decoded bundle.
 * @param bool  $dry_run Report only.
 * @return string
 */
function coeus_import_variables( $bundle, $dry_run = false ) {
	$incoming   = $bundle['variables']['variables'] ?? array();
	$categories = $bundle['variables']['categories'] ?? array();

	if ( ! $incoming ) {
		return 'variables: nothing to import';
	}

	// Preserve any variable the client added that we do not manage.
	$existing = get_option( 'bricks_global_variables', array() );
	$managed  = wp_list_pluck( $incoming, 'id' );
	$kept     = array_values(
		array_filter(
			is_array( $existing ) ? $existing : array(),
			function ( $var ) use ( $managed ) {
				return ! in_array( $var['id'] ?? '', $managed, true );
			}
		)
	);

	if ( ! $dry_run ) {
		update_option( 'bricks_global_variables', array_merge( $kept, $incoming ) );
		update_option( 'bricks_global_variables_categories', $categories );
	}

	return sprintf(
		'variables: %d installed, %d client-defined preserved',
		count( $incoming ),
		count( $kept )
	);
}

/**
 * Install global classes.
 *
 * @param array $bundle  Decoded bundle.
 * @param bool  $dry_run Report only.
 * @return string
 */
function coeus_import_classes( $bundle, $dry_run = false ) {
	$incoming   = $bundle['classes']['globalClasses'] ?? array();
	$categories = $bundle['classes']['categories'] ?? array();

	if ( ! $incoming ) {
		return 'classes: nothing to import';
	}

	$existing = get_option( 'bricks_global_classes', array() );
	$managed  = wp_list_pluck( $incoming, 'id' );
	$kept     = array_values(
		array_filter(
			is_array( $existing ) ? $existing : array(),
			function ( $class ) use ( $managed ) {
				return ! in_array( $class['id'] ?? '', $managed, true );
			}
		)
	);

	if ( ! $dry_run ) {
		update_option( 'bricks_global_classes', array_merge( $kept, $incoming ) );
		update_option( 'bricks_global_classes_categories', $categories );
	}

	return sprintf(
		'classes: %d installed, %d client-defined preserved',
		count( $incoming ),
		count( $kept )
	);
}

/**
 * Install theme styles.
 *
 * @param array $bundle  Decoded bundle.
 * @param bool  $dry_run Report only.
 * @return string
 */
function coeus_import_theme_styles( $bundle, $dry_run = false ) {
	$styles = $bundle['themeStyles'] ?? array();

	if ( ! $styles ) {
		return 'theme styles: nothing to import';
	}

	if ( ! $dry_run ) {
		$existing = get_option( 'bricks_theme_styles', array() );
		$existing = is_array( $existing ) ? $existing : array();
		update_option( 'bricks_theme_styles', array_merge( $existing, $styles ) );
	}

	return sprintf( 'theme styles: %d installed', count( $styles ) );
}

/**
 * Install page templates as bricks_template posts.
 *
 * Matched on the `_coeus_slug` meta key, so re-running updates the same post
 * rather than creating a second copy.
 *
 * @param array $bundle  Decoded bundle.
 * @param bool  $dry_run Report only.
 * @return string
 */
function coeus_import_templates( $bundle, $dry_run = false ) {
	$templates = $bundle['templates'] ?? array();

	if ( ! $templates ) {
		return 'templates: nothing to import';
	}

	$created = 0;
	$updated = 0;

	foreach ( $templates as $template ) {
		$slug = $template['slug'] ?? '';
		if ( ! $slug ) {
			continue;
		}

		$found = get_posts(
			array(
				'post_type'        => 'bricks_template',
				'post_status'      => 'any',
				'numberposts'      => 1,
				'meta_key'         => '_coeus_slug',   // phpcs:ignore WordPress.DB.SlowDBQuery
				'meta_value'       => $slug,           // phpcs:ignore WordPress.DB.SlowDBQuery
				'suppress_filters' => false,
			)
		);

		if ( $dry_run ) {
			$found ? $updated++ : $created++;
			continue;
		}

		$postarr = array(
			'post_type'   => 'bricks_template',
			'post_title'  => $template['title'] ?? $slug,
			'post_name'   => $slug,
			'post_status' => 'publish',
		);

		if ( $found ) {
			$postarr['ID'] = $found[0]->ID;
			$post_id       = wp_update_post( $postarr, true );
			$updated++;
		} else {
			$post_id = wp_insert_post( $postarr, true );
			$created++;
		}

		if ( is_wp_error( $post_id ) ) {
			continue;
		}

		// Bricks reads a template's element tree from this meta key.
		update_post_meta( $post_id, '_bricks_page_content_2', $template['content'] );
		update_post_meta( $post_id, '_bricks_template_type', $template['type'] ?? 'content' );
		update_post_meta( $post_id, '_coeus_slug', $slug );

		if ( ! empty( $template['settings'] ) ) {
			update_post_meta( $post_id, '_bricks_page_settings', $template['settings'] );
		}
	}

	return sprintf( 'templates: %d created, %d updated', $created, $updated );
}


/**
 * Create the seed case studies and insights.
 *
 * Seeded posts are marked with `_coeus_seed`. An existing seed post is left
 * completely alone on re-import — the client's edits are never overwritten.
 *
 * @param array $bundle  Decoded bundle.
 * @param bool  $dry_run Report only.
 * @return string
 */
function coeus_import_seed( $bundle, $dry_run = false ) {
	$posts = $bundle['seed'] ?? array();

	if ( ! $posts ) {
		return 'seed: nothing to import';
	}

	$created = 0;
	$skipped = 0;

	foreach ( $posts as $seed ) {
		$key = sanitize_title( $seed['title'] );

		$existing = get_posts(
			array(
				'post_type'   => $seed['post_type'],
				'post_status' => 'any',
				'numberposts' => 1,
				'meta_key'    => '_coeus_seed',  // phpcs:ignore WordPress.DB.SlowDBQuery
				'meta_value'  => $key,           // phpcs:ignore WordPress.DB.SlowDBQuery
			)
		);

		if ( $existing ) {
			$skipped++;
			continue;
		}

		if ( $dry_run ) {
			$created++;
			continue;
		}

		$postarr = array(
			'post_type'    => $seed['post_type'],
			'post_title'   => $seed['title'],
			'post_excerpt' => $seed['excerpt'] ?? '',
			'post_content' => $seed['content'] ?? '',
			'post_status'  => 'publish',
		);

		if ( ! empty( $seed['date'] ) ) {
			$postarr['post_date'] = $seed['date'] . ' 09:00:00';
		}

		$post_id = wp_insert_post( $postarr, true );

		if ( is_wp_error( $post_id ) ) {
			continue;
		}

		update_post_meta( $post_id, '_coeus_seed', $key );

		foreach ( $seed['meta'] ?? array() as $meta_key => $meta_value ) {
			update_post_meta( $post_id, $meta_key, $meta_value );
		}

		foreach ( $seed['terms'] ?? array() as $taxonomy => $terms ) {
			wp_set_object_terms( $post_id, $terms, $taxonomy );
		}

		// Featured images are placeholders from the design. Sideload only if
		// the site can reach them; a failure here must not abort the import.
		if ( ! empty( $seed['remote_image'] ) && apply_filters( 'coeus/sideload_seed_images', true ) ) {
			require_once ABSPATH . 'wp-admin/includes/media.php';
			require_once ABSPATH . 'wp-admin/includes/file.php';
			require_once ABSPATH . 'wp-admin/includes/image.php';

			$attachment_id = media_sideload_image( $seed['remote_image'], $post_id, $seed['title'], 'id' );

			if ( ! is_wp_error( $attachment_id ) ) {
				set_post_thumbnail( $post_id, $attachment_id );
			}
		}

		$created++;
	}

	return sprintf( 'seed: %d created, %d already present (left untouched)', $created, $skipped );
}

/**
 * Run the import.
 *
 * @param string $only    One of all|variables|classes|styles|templates.
 * @param bool   $dry_run Report only.
 * @return array|WP_Error Lines of output.
 */
function coeus_run_import( $only = 'all', $dry_run = false ) {
	$bundle = coeus_read_bundle();

	if ( is_wp_error( $bundle ) ) {
		return $bundle;
	}

	$lines = array();
	$all   = ( 'all' === $only );

	if ( $all || 'variables' === $only ) {
		$lines[] = coeus_import_variables( $bundle, $dry_run );
	}
	if ( $all || 'classes' === $only ) {
		$lines[] = coeus_import_classes( $bundle, $dry_run );
	}
	if ( $all || 'styles' === $only ) {
		$lines[] = coeus_import_theme_styles( $bundle, $dry_run );
	}
	if ( $all || 'templates' === $only ) {
		$lines[] = coeus_import_templates( $bundle, $dry_run );
	}
	if ( $all || 'seed' === $only ) {
		$lines[] = coeus_import_seed( $bundle, $dry_run );
	}

	// Bricks caches generated CSS files; clear so new classes are written out.
	if ( ! $dry_run && class_exists( '\Bricks\Assets' ) && method_exists( '\Bricks\Assets', 'clear_css_files' ) ) {
		\Bricks\Assets::clear_css_files();
		$lines[] = 'bricks CSS cache cleared';
	}

	return $lines;
}

/* -------------------------------------------------------------------------
 * WP-CLI
 * ---------------------------------------------------------------------- */
if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command(
		'coeus import',
		function ( $args, $assoc ) {
			$only    = $assoc['only'] ?? 'all';
			$dry_run = isset( $assoc['dry-run'] );

			$result = coeus_run_import( $only, $dry_run );

			if ( is_wp_error( $result ) ) {
				WP_CLI::error( $result->get_error_message() );
			}

			foreach ( $result as $line ) {
				WP_CLI::log( $line );
			}

			WP_CLI::success( $dry_run ? 'Dry run complete — nothing written.' : 'Import complete.' );
		},
		array(
			'shortdesc' => 'Import Coeus Bricks variables, classes, theme styles and templates.',
			'synopsis'  => array(
				array(
					'type'     => 'assoc',
					'name'     => 'only',
					'optional' => true,
					'options'  => array( 'all', 'variables', 'classes', 'styles', 'templates', 'seed' ),
				),
				array(
					'type'     => 'flag',
					'name'     => 'dry-run',
					'optional' => true,
				),
			),
		)
	);
}

/* -------------------------------------------------------------------------
 * wp-admin fallback, for installs without WP-CLI
 * ---------------------------------------------------------------------- */
add_action(
	'admin_menu',
	function () {
		add_theme_page(
			__( 'Coeus Import', 'coeus' ),
			__( 'Coeus Import', 'coeus' ),
			'manage_options',
			'coeus-import',
			'coeus_render_import_page'
		);
	}
);

/** Render the import screen. */
function coeus_render_import_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Insufficient permissions.', 'coeus' ) );
	}

	$output = array();

	if ( isset( $_POST['coeus_import'] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
		&& check_admin_referer( 'coeus_import' ) ) {

		$dry_run = isset( $_POST['coeus_dry_run'] );
		$result  = coeus_run_import( 'all', $dry_run );

		$output = is_wp_error( $result )
			? array( 'Error: ' . $result->get_error_message() )
			: $result;
	}

	echo '<div class="wrap"><h1>' . esc_html__( 'Coeus Import', 'coeus' ) . '</h1>';
	echo '<p>' . esc_html__( 'Installs the generated Bricks global variables, BEM global classes, theme styles and page templates. Safe to re-run — records are matched by id and updated in place.', 'coeus' ) . '</p>';

	if ( $output ) {
		echo '<div class="notice notice-info"><pre style="white-space:pre-wrap">'
			. esc_html( implode( "\n", $output ) ) . '</pre></div>';
	}

	echo '<form method="post">';
	wp_nonce_field( 'coeus_import' );
	echo '<p><label><input type="checkbox" name="coeus_dry_run" value="1"> '
		. esc_html__( 'Dry run (report only, write nothing)', 'coeus' ) . '</label></p>';
	submit_button( __( 'Run import', 'coeus' ), 'primary', 'coeus_import' );
	echo '</form></div>';
}

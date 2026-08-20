<?php
/**
 * Custom fields.
 *
 * Registered with `show_in_rest` so Bricks exposes each one in its dynamic
 * data picker as {cf_field_name}. Kept to native post meta deliberately —
 * no ACF dependency, so the templates import and render on a bare install.
 *
 * @package coeus
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Field definitions, keyed by post type.
 *
 * @return array<string, array<string, array{type:string,label:string}>>
 */
function coeus_meta_fields() {
	return array(
		'case_study' => array(
			'coeus_client'    => array( 'type' => 'string', 'label' => __( 'Client', 'coeus' ) ),
			'coeus_location'  => array( 'type' => 'string', 'label' => __( 'Location', 'coeus' ) ),
			'coeus_value'     => array( 'type' => 'string', 'label' => __( 'Project value', 'coeus' ) ),
			'coeus_challenge' => array( 'type' => 'string', 'label' => __( 'The challenge', 'coeus' ) ),
			'coeus_approach'  => array( 'type' => 'string', 'label' => __( 'Our approach', 'coeus' ) ),
			'coeus_outcome'   => array( 'type' => 'string', 'label' => __( 'The outcome', 'coeus' ) ),
		),
		'insight'    => array(
			'coeus_reading_time' => array( 'type' => 'string', 'label' => __( 'Reading time', 'coeus' ) ),
			'coeus_standfirst'   => array( 'type' => 'string', 'label' => __( 'Standfirst', 'coeus' ) ),
		),
		'person'     => array(
			'coeus_role'        => array( 'type' => 'string', 'label' => __( 'Role', 'coeus' ) ),
			'coeus_credentials' => array( 'type' => 'string', 'label' => __( 'Post-nominals', 'coeus' ) ),
			'coeus_email'       => array( 'type' => 'string', 'label' => __( 'Email', 'coeus' ) ),
			'coeus_linkedin'    => array( 'type' => 'string', 'label' => __( 'LinkedIn URL', 'coeus' ) ),
		),
	);
}

add_action(
	'init',
	function () {
		foreach ( coeus_meta_fields() as $post_type => $fields ) {
			foreach ( $fields as $key => $field ) {
				register_post_meta(
					$post_type,
					$key,
					array(
						'type'              => $field['type'],
						'description'       => $field['label'],
						'single'            => true,
						'show_in_rest'      => true,
						'sanitize_callback' => 'wp_kses_post',
						'auth_callback'     => function () {
							return current_user_can( 'edit_posts' );
						},
					)
				);
			}
		}
	}
);

/**
 * A plain meta box, so the fields are editable without ACF. If the client
 * later installs ACF Pro, delete this file's meta box and point ACF at the
 * same meta keys — the Bricks templates keep working untouched.
 */
add_action(
	'add_meta_boxes',
	function () {
		foreach ( array_keys( coeus_meta_fields() ) as $post_type ) {
			add_meta_box(
				'coeus-details',
				__( 'Coeus details', 'coeus' ),
				'coeus_render_meta_box',
				$post_type,
				'normal',
				'high'
			);
		}
	}
);

/**
 * Render the meta box.
 *
 * @param WP_Post $post Current post.
 */
function coeus_render_meta_box( $post ) {
	$fields = coeus_meta_fields()[ $post->post_type ] ?? array();
	wp_nonce_field( 'coeus_save_meta', 'coeus_meta_nonce' );

	echo '<div style="display:grid;gap:14px;padding:6px 0">';
	foreach ( $fields as $key => $field ) {
		$value = get_post_meta( $post->ID, $key, true );
		$long  = in_array( $key, array( 'coeus_challenge', 'coeus_approach', 'coeus_outcome', 'coeus_standfirst' ), true );

		printf( '<label for="%1$s"><strong>%2$s</strong><br><code style="font-size:11px;opacity:.6">{cf_%1$s}</code></label>', esc_attr( $key ), esc_html( $field['label'] ) );

		if ( $long ) {
			printf(
				'<textarea id="%1$s" name="%1$s" rows="3" style="width:100%%">%2$s</textarea>',
				esc_attr( $key ),
				esc_textarea( $value )
			);
		} else {
			printf(
				'<input type="text" id="%1$s" name="%1$s" value="%2$s" style="width:100%%">',
				esc_attr( $key ),
				esc_attr( $value )
			);
		}
	}
	echo '</div>';
}

add_action(
	'save_post',
	function ( $post_id ) {
		if ( ! isset( $_POST['coeus_meta_nonce'] )
			|| ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['coeus_meta_nonce'] ) ), 'coeus_save_meta' ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$post_type = get_post_type( $post_id );
		$fields    = coeus_meta_fields()[ $post_type ] ?? array();

		foreach ( array_keys( $fields ) as $key ) {
			if ( isset( $_POST[ $key ] ) ) {
				update_post_meta( $post_id, $key, wp_kses_post( wp_unslash( $_POST[ $key ] ) ) );
			}
		}
	}
);

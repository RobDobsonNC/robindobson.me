<?php
/**
 * Coeus Technical — Bricks child theme.
 *
 * @package coeus
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'COEUS_VERSION', '1.0.0' );
define( 'COEUS_DIR', get_stylesheet_directory() );
define( 'COEUS_URI', get_stylesheet_directory_uri() );

require_once COEUS_DIR . '/inc/assets.php';
require_once COEUS_DIR . '/inc/cpt.php';
require_once COEUS_DIR . '/inc/meta.php';
require_once COEUS_DIR . '/inc/importer.php';

/**
 * Register the element classes Bricks should treat as "in use" so its CSS
 * loading method (external files) never tree-shakes a global class that is
 * only applied conditionally — e.g. the mobile nav or dropdown panels.
 */
add_filter(
	'bricks/frontend/render_data',
	function ( $content ) {
		return $content;
	}
);

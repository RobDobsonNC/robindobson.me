<?php
/**
 * Content model.
 *
 * Case studies, insights and people are the three repeating content types in
 * the design. Registering them as CPTs means the client adds an entry and the
 * listing pages update themselves via Bricks query loops — no layout editing.
 *
 * @package coeus
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'init',
	function () {
		/* ---------------------------------------------------------------
		 * Case studies
		 * ------------------------------------------------------------- */
		register_post_type(
			'case_study',
			array(
				'labels'              => array(
					'name'               => __( 'Case Studies', 'coeus' ),
					'singular_name'      => __( 'Case Study', 'coeus' ),
					'add_new_item'       => __( 'Add New Case Study', 'coeus' ),
					'edit_item'          => __( 'Edit Case Study', 'coeus' ),
					'search_items'       => __( 'Search Case Studies', 'coeus' ),
					'not_found'          => __( 'No case studies found.', 'coeus' ),
				),
				'public'              => true,
				'has_archive'         => false, // Archive is a Bricks page with a query loop.
				'menu_icon'           => 'dashicons-portfolio',
				'menu_position'       => 21,
				'rewrite'             => array( 'slug' => 'case-studies', 'with_front' => false ),
				'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes', 'custom-fields' ),
				'show_in_rest'        => true,
				'exclude_from_search' => false,
			)
		);

		register_taxonomy(
			'sector',
			array( 'case_study' ),
			array(
				'labels'            => array(
					'name'          => __( 'Sectors', 'coeus' ),
					'singular_name' => __( 'Sector', 'coeus' ),
				),
				'public'            => true,
				'hierarchical'      => true,
				'show_admin_column' => true,
				'show_in_rest'      => true,
				'rewrite'           => array( 'slug' => 'sector', 'with_front' => false ),
			)
		);

		register_taxonomy(
			'service',
			array( 'case_study' ),
			array(
				'labels'            => array(
					'name'          => __( 'Services', 'coeus' ),
					'singular_name' => __( 'Service', 'coeus' ),
				),
				'public'            => true,
				'hierarchical'      => true,
				'show_admin_column' => true,
				'show_in_rest'      => true,
				'rewrite'           => array( 'slug' => 'service', 'with_front' => false ),
			)
		);

		/* ---------------------------------------------------------------
		 * Insights
		 * ------------------------------------------------------------- */
		register_post_type(
			'insight',
			array(
				'labels'       => array(
					'name'          => __( 'Insights', 'coeus' ),
					'singular_name' => __( 'Insight', 'coeus' ),
					'add_new_item'  => __( 'Add New Insight', 'coeus' ),
					'edit_item'     => __( 'Edit Insight', 'coeus' ),
				),
				'public'       => true,
				'has_archive'  => false,
				'menu_icon'    => 'dashicons-media-document',
				'menu_position' => 22,
				'rewrite'      => array( 'slug' => 'insights', 'with_front' => false ),
				'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'author', 'custom-fields' ),
				'show_in_rest' => true,
			)
		);

		register_taxonomy(
			'insight_topic',
			array( 'insight' ),
			array(
				'labels'            => array(
					'name'          => __( 'Topics', 'coeus' ),
					'singular_name' => __( 'Topic', 'coeus' ),
				),
				'public'            => true,
				'hierarchical'      => true,
				'show_admin_column' => true,
				'show_in_rest'      => true,
				'rewrite'           => array( 'slug' => 'topic', 'with_front' => false ),
			)
		);

		/* ---------------------------------------------------------------
		 * People
		 * ------------------------------------------------------------- */
		register_post_type(
			'person',
			array(
				'labels'        => array(
					'name'          => __( 'People', 'coeus' ),
					'singular_name' => __( 'Person', 'coeus' ),
					'add_new_item'  => __( 'Add New Person', 'coeus' ),
					'edit_item'     => __( 'Edit Person', 'coeus' ),
				),
				'public'        => true,
				'has_archive'   => false,
				'menu_icon'     => 'dashicons-groups',
				'menu_position' => 23,
				'rewrite'       => array( 'slug' => 'our-people', 'with_front' => false ),
				'supports'      => array( 'title', 'editor', 'thumbnail', 'revisions', 'page-attributes', 'custom-fields' ),
				'show_in_rest'  => true,
			)
		);
	}
);

/**
 * Flush rewrites once after activation so the new permalink structures take
 * effect without the client having to re-save permalinks.
 */
add_action(
	'after_switch_theme',
	function () {
		flush_rewrite_rules();
	}
);

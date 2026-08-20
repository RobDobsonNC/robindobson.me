<?php
/**
 * Front-end assets.
 *
 * @package coeus
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Inter is the sole typeface in the design. Served locally rather than from
 * Google so the site stays self-hosted; drop the woff2 files into
 * assets/fonts/ and Bricks will pick the family up via the --font-sans
 * variable.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style(
			'coeus-parent',
			get_template_directory_uri() . '/style.css',
			array(),
			COEUS_VERSION
		);

		wp_enqueue_style(
			'coeus-child',
			COEUS_URI . '/style.css',
			array( 'coeus-parent' ),
			COEUS_VERSION
		);

		wp_enqueue_style(
			'coeus-base',
			COEUS_URI . '/assets/css/coeus.css',
			array( 'coeus-child' ),
			COEUS_VERSION
		);
	},
	20
);

/**
 * The header needs a tiny amount of behaviour Bricks has no native control
 * for: the scrolled-state shadow and the mobile menu toggle. Everything
 * visual is still driven by the BEM classes — this only toggles them.
 */
add_action(
	'wp_footer',
	function () {
		if ( is_admin() || ( function_exists( 'bricks_is_builder' ) && bricks_is_builder() ) ) {
			return;
		}
		?>
		<script>
		(function () {
			var header = document.querySelector('.c-header');
			if (!header) { return; }

			// Scrolled state.
			var onScroll = function () {
				header.classList.toggle('c-header--scrolled', window.scrollY > 40);
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();

			// Mobile menu.
			var toggle = header.querySelector('.c-header__toggle');
			var panel  = header.querySelector('.c-header__mobile');
			if (toggle && panel) {
				toggle.setAttribute('aria-expanded', 'false');
				toggle.addEventListener('click', function () {
					var open = panel.classList.toggle('is-open');
					toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
				});
			}

			// Dropdowns: hover on pointer devices, click for keyboard/touch.
			header.querySelectorAll('.c-header__item').forEach(function (item) {
				var trigger = item.querySelector('.c-header__link');
				var menu    = item.querySelector('.c-header__dropdown');
				if (!trigger || !menu) { return; }

				trigger.setAttribute('aria-expanded', 'false');
				var open = function (state) {
					item.classList.toggle('is-open', state);
					trigger.setAttribute('aria-expanded', state ? 'true' : 'false');
				};

				item.addEventListener('mouseenter', function () { open(true); });
				item.addEventListener('mouseleave', function () { open(false); });
				trigger.addEventListener('click', function (e) {
					e.preventDefault();
					open(!item.classList.contains('is-open'));
				});
				item.addEventListener('keydown', function (e) {
					if (e.key === 'Escape') { open(false); trigger.focus(); }
				});
			});
		})();
		</script>
		<?php
	}
);

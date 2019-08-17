<?php declare( strict_types=1 );

/**
 * Gutenberg <=> Firebase Integration Example.
 *
 * @package   BN\Fireberg
 * @author    Alain Schlesser <alain.schlesser@gmail.com>
 * @license   MIT
 * @link      https://www.alainschlesser.com
 * @copyright 2019 Alain Schlesser
 */

namespace BN\Fireberg\Blocks;

use BN\Fireberg\Infrastructure\{
	Conditional,
	Registerable,
	Service
};

final class StatusUpdates implements Service, Registerable, Conditional {

	private const JS_PATH          = 'assets/js/fireberg.js';
	private const JS_FRONTEND_PATH = 'assets/js/fireberg-frontend.js';
	private const CSS_PATH         = 'assets/css/fireberg.css';

	/**
	 * Check whether the conditional object is currently needed.
	 *
	 * @return bool Whether the conditional object is needed.
	 */
	public static function is_needed(): bool {
		// Only instantiate this service if Gutenberg is available.
		return function_exists( 'register_block_type' );
	}

	/**
	 * Register the service.
	 *
	 * @return void
	 */
	public function register(): void {
		$root_folder = dirname( __DIR__, 2 );
		$root_file   = "{$root_folder}/fireberg.php";

		wp_register_script(
			'fireberg',
			plugins_url( self::JS_PATH, $root_file ),
			[
				'wp-blocks',
				'wp-i18n',
				'wp-element',
			],
			filemtime( "$root_folder/" . self::JS_PATH )
		);

		wp_register_script(
			'fireberg-frontend',
			plugins_url( self::JS_FRONTEND_PATH, $root_file ),
			[
				'wp-blocks',
				'wp-i18n',
				'wp-element',
			],
			filemtime( "$root_folder/" . self::JS_FRONTEND_PATH )
		);

		wp_register_style(
			'fireberg',
			plugins_url( self::CSS_PATH, $root_file ),
			[],
			filemtime( "$root_folder/" . self::CSS_PATH )
		);

		register_block_type(
			'gutenberg-firebase-integration/status-updates',
			[
				'editor_script' => 'fireberg',
				'editor_style'  => 'fireberg',
				'script'        => 'fireberg-frontend',
				'style'         => 'fireberg',
			]
		);

		add_action( 'wp_enqueue_scripts', function () {
			wp_enqueue_script( 'fireberg-frontend' );
		} );
	}

}

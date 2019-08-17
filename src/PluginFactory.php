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

namespace BN\Fireberg;

use BN\Fireberg\Infrastructure\Plugin;
use BN\Fireberg\Plugin as FirebergPlugin;

/**
 * The plugin factory is responsible for instantiating the plugin and returning
 * that instance.
 *
 * It can decide whether to return a shared or a fresh instance as needed.
 *
 * To read more about why this is preferable to a Singleton,
 *
 * @see https://www.alainschlesser.com/singletons-shared-instances/
 */
final class PluginFactory {

	/**
	 * Create and return an instance of the plugin.
	 *
	 * This always returns a shared instance. This way, outside code can always
	 * get access to the object instance of the plugin.
	 *
	 * @return Plugin Plugin instance.
	 */
	public static function create(): Plugin {
		static $plugin = null;

		if ( null === $plugin ) {
			$plugin = new FirebergPlugin();
		}

		return $plugin;
	}
}

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

namespace BN\Fireberg\Exception;

use InvalidArgumentException;

class InvalidContextProperty
	extends InvalidArgumentException
	implements FirebergException {

	/**
	 * Create a new instance of the exception for a context property that is
	 * not recognized.
	 *
	 * @param string $property Name of the context property that was not
	 *                         recognized.
	 *
	 * @return static
	 */
	public static function from_property( string $property ) {
		$message = \sprintf(
			'The property "%s" could not be found within the context of the currently rendered view.',
			$property
		);

		return new static( $message );
	}
}

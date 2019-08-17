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

class InvalidPath
	extends InvalidArgumentException
	implements FirebergException {

	/**
	 * Create a new instance of the exception for a file that is not accessible
	 * or not readable.
	 *
	 * @param string $path Path of the file that is not accessible or not
	 *                     readable.
	 *
	 * @return static
	 */
	public static function from_path( $path ) {
		$message = \sprintf(
			'The view path "%s" is not accessible or readable.',
			$path
		);

		return new static( $message );
	}
}

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

use Throwable;

/**
 * This is a "marker interface" to mark all the exception that come with this
 * plugin with this one interface.
 *
 * This allows you to not only catch individual exceptions, but also catch "all
 * exceptions from plugin XY".
 */
interface FirebergException extends Throwable {

}

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

namespace BN\Fireberg\Infrastructure\View;

use BN\Fireberg\Infrastructure\Service;
use BN\Fireberg\Infrastructure\View;
use BN\Fireberg\Infrastructure\ViewFactory;

/**
 * Factory to create the simplified view objects.
 */
final class SimpleViewFactory implements Service, ViewFactory {

	/**
	 * Create a new view object for a given relative path.
	 *
	 * @param string $relative_path Relative path to create the view for.
	 * @return View Instantiated view object.
	 */
	public function create( string $relative_path ): View {
		return new SimpleView( $relative_path, $this );
	}
}

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

namespace BN\Fireberg\Infrastructure\ServiceContainer;

use BN\Fireberg\Exception\InvalidService;
use BN\Fireberg\Infrastructure\Service;

/**
 * A service that only gets properly instantiated when it is actually being
 * retrieved from the container.
 */
final class LazilyInstantiatedService implements Service {

	/** @var callable */
	private $instantiation;

	/**
	 * Instantiate a LazilyInstantiatedService object.
	 *
	 * @param callable $instantiation Instantiation callable to use.
	 */
	public function __construct( callable $instantiation ) {
		$this->instantiation = $instantiation;
	}

	/**
	 * Do the actual service instantiation and return the real service.
	 *
	 * @throws InvalidService If the service could not be properly instantiated.
	 *
	 * @return Service Properly instantiated service.
	 */
	public function instantiate(): Service {
		$service = ( $this->instantiation )();

		if ( ! $service instanceof Service ) {
			throw InvalidService::from_service( $service );
		}

		return $service;
	}
}

<?php

namespace BN\Fireberg\Tests\Integration;

use BN\Fireberg\Infrastructure\View\SimpleView;
use BN\Fireberg\Infrastructure\View\SimpleViewFactory;
use BN\Fireberg\Tests\ViewHelper;

final class SimpleViewTest extends TestCase {

	public function test_it_loads_partials_across_overrides(): void {
		$view = new SimpleView(
			ViewHelper::VIEWS_FOLDER . 'static-view',
			new SimpleViewFactory()
		);

		$this->assertStringStartsWith(
			'<p>Rendering works.</p>',
			$view->render()
		);
	}
}

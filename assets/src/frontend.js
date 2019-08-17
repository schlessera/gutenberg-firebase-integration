import StatusUpdates from './components/StatusUpdates';

console.log( 'TEsting...' );

document.addEventListener( 'DOMContentLoaded', ( event ) => {
	wp.element.render(
		wp.element.createElement( StatusUpdates ),
		document.querySelector( '.wp-block-fireberg-status-updates' )
	);
} );

import { registerBlockType } from '@wordpress/blocks';

const blocks = require.context( './blocks', true, /\/index\.js$/ );

blocks.keys().forEach( ( modulePath ) => {
	const { name, settings } = blocks( modulePath );
	registerBlockType( name, settings );
} );

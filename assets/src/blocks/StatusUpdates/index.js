/**
 * WordPress dependencies
 */
import {__} from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import css from './style.css';

const schema = {};

export const name = 'gutenberg-firebase-integration/status-updates';

export const settings = {
	title: __( 'Status Updates', 'fireberg' ),

	description: __( 'Demonstrate how to integrate Google Firebase into a Gutenberg block.', 'fireberg' ),

	icon: 'warning',

	category: 'widgets',

	keywords: [
		__( 'status', 'fireberg' ),
		__( 'updates', 'fireberg' ),
	],

	attributes: schema,

	supports: {
		html: false,
	},

	edit,

	save,
};

module.exports = {
	plugins: [
		require( 'postcss-preset-env' )( {
			stage: 0,
			preserve: false, // Omit pre-polyfilled CSS.
			features: {
				'nesting-rules': false, // Uses postcss-nesting which doesn't behave like Sass.
			},
			autoprefixer: {
				grid: true,
			},
		} ),
	],
};

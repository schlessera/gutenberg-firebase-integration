/**
 * External dependencies
 */
const path                    = require( 'path' );
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserPlugin            = require( 'terser-webpack-plugin' );

/**
 * WordPress dependencies
 */
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const isProduction = process.env.NODE_ENV === 'production';
const mode         = isProduction ? 'production' : 'development';

const sharedConfig = {
	mode,
	output: {
		path: path.resolve( process.cwd(), 'assets', 'js' ),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	optimization: {
		minimizer: [
			new TerserPlugin( {
				parallel: true,
				sourceMap: false,
				cache: true,
				terserOptions: {
					output: {
						comments: /translators:/i,
					},
				},
				extractComments: false,
			} ),
			new OptimizeCSSAssetsPlugin( {} ),
		],
	},
};

const config = {
	...sharedConfig,
	entry: {
		'./fireberg': './assets/src/index.js',
		'./fireberg-frontend': './assets/src/frontend.js',
	},
	output: {
		path: path.resolve( process.cwd(), 'assets', 'js' ),
		filename: '[name].js',
	},
	resolve: {
		alias: {
			'lodash-es': 'lodash',
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					require.resolve( 'thread-loader' ),
					{
						loader: require.resolve( 'babel-loader' ),
						options: {
							// Babel uses a directory within local node_modules
							// by default. Use the environment variable option
							// to enable more persistent caching.
							cacheDirectory: process.env.BABEL_CACHE_DIRECTORY || true,
							...({
								babelrc: false,
								configFile: false,
								presets: [ require.resolve( '@wordpress/babel-preset-default' ) ],
								plugins: [
									[ "@babel/plugin-proposal-class-properties" ]
								]
							})
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: '../css/[name].css',
		} ),
		new DependencyExtractionWebpackPlugin( { injectPolyfill: true } ),
	],
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	},
};

if ( !isProduction ) {
	// WP_DEVTOOL global variable controls how source maps are generated.
	// See: https://webpack.js.org/configuration/devtool/#devtool.
	config.devtool = process.env.WP_DEVTOOL || 'source-map';
	config.module.rules.unshift( {
		test: /\.js$/,
		use: require.resolve( 'source-map-loader' ),
		enforce: 'pre',
	} );
}

module.exports = config;

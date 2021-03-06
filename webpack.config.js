var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
	?	[
			'./src/index.js'
		]
	:	[
			'./src/index.js',
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080'
		];

const plugins = PRODUCTION
	? 	[
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.IgnorePlugin(/\/iconv-loader$/),
			new ExtractTextPlugin('style-[contenthash:10].css'),
			new HTMLWebpackPlugin({
				template: './src/template/index.html'
			}),
			new CopyWebpackPlugin([{ from: './app/curler.php'}]),
			new BundleAnalyzerPlugin(),
		]
	: 	[
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.IgnorePlugin(/\/iconv-loader$/),
			new HTMLWebpackPlugin({
				template: './src/template/index.html'
			})
		];

plugins.push(
	new webpack.DefinePlugin({
		DEVELOPMENT: JSON.stringify(DEVELOPMENT),
		PRODUCTION: JSON.stringify(PRODUCTION)
	})
);

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
	?	ExtractTextPlugin.extract({
			use: ['css-loader?minimize&localIdentName=' + cssIdentifier, 'sass-loader']
		})
	: 	['style-loader', 'css-loader?localIdentName=' + cssIdentifier, 'sass-loader?sourceMap'];

module.exports = {
	devtool: PRODUCTION ? 'nosources-source-map' : 'cheap-module-eval-source-map',
	entry: entry,
	plugins: plugins,
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif)$/,
			loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
			exclude: /node_modules/
		}, {
			test: /\.(css|scss)$/,
			loaders: cssLoader,
			exclude: /node_modules/
		}, { 
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
			loader: "url-loader?limit=10000&mimetype=application/font-woff" 
		}, { 
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
			loader: "file-loader" 
		}]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js'
	}
};

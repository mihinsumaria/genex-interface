var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: './react-app/App.jsx',
	output: {
		path: path.resolve(__dirname, 'app/static'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react', 'stage-3'],
					plugins: ['transform-class-properties']
				}
			}
		},
		{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devtool: 'source-map'
}

var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: './react-app/Index.jsx',
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
					presets: ['env', 'react']
				}
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}

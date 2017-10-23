module.exports = {
	entry: './browser/react/index.js',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders:[
			{ test: /\.js$/,
			  exclude: /node_modules/,
			  loader: 'babel-loader',
			  query: { presets: ['es2015', 'react'] }
			}
		]
	}

}

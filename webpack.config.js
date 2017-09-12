module.exports = {
	entry: './src/react/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	devtool: 'sourcemap',
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

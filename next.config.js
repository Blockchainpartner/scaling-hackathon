const Dotenv = require('dotenv-webpack');

module.exports = ({
	plugins: [
		new Dotenv()
	],
	env: {
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
	},
  	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: 25,
			minSize: 20000
		}
	},
	webpack: (config, {webpack}) => {
		// Note: we provide webpack above so you should not `require` it
		// Perform customizations to webpack config
		// Important: return the modified config
		config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
		return config
	},
	webpackDevMiddleware: (config) => {
		// Perform customizations to webpack dev middleware config
		// Important: return the modified config
		return config
	},
})

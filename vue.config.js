const webpack = require("webpack");

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'static': '@/static',
				'api': '@/api',
				'components': '@/components',
				'utils': '@/utils'
			}
		},
	},
}

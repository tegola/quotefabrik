const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: process.env.VUE_APP_NAME
    }
  },
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src')
			}
		}
	}
}

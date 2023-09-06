const path = require('path')

const buildEslintCommand = filenames => 'yarn lint:fix'

module.exports = {
	'*.*': [buildEslintCommand, 'git add .'],
}

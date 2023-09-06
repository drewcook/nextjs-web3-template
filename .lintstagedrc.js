const path = require('path')

const buildEslintCommand = filenames => 'npm run lint:fix'

module.exports = {
	'*.*': [buildEslintCommand, 'git add .'],
}

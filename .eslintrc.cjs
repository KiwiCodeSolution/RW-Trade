module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: { jsx: true }
	},
	plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended'
	],
	settings: {
		react: { version: 'detect' }
	},
	rules: {
		'no-console': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-unused-vars': ['warn']
	},
	ignorePatterns: ['node_modules', '.next', 'dist']
}

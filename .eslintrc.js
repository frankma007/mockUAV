module.exports = {
	root: true,
	parserOptions: {
		sourceType: '2020'
	},
	parser: 'vue-eslint-parser',
	extends: [
		'plugin:vue/vue3-essential',
		 'plugin:vue/vue3-strongly-recommended', 
		 'plugin:vue/vue3-recommended',
		
		 '@vue/standard',
		 '@vue/typescript/recommended'
		
		],
	env: {
		browser: true,
		node: true,
		es6: true,		
		'vue/setup-compiler-macros': true
	},
	
	rules: {
		// 'no-console': 'off',
		'comma-dangle': [2, 'never'], //禁止使用拖尾逗号
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-explicit-any': ['off'],
        'vue/multi-word-component-names': 'off',
		
	
	}
}

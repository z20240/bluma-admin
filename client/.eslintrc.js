module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: ['eslint:recommended', 'plugin:vue/essential'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        // 'quotes': [
        //     'error',
        //     'single'
        // ],
        semi: ['error', 'always']
    }
};

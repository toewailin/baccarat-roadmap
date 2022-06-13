module.exports = {
  root: true,

  env: {
    node: true,
    browser: true
  },

  globals: {
    define: true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:vue/recommended'
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'array-callback-return': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    camelcase: 'off',
    'comma-dangle': 'error',
    'default-case': 'error',
    'vue/custom-event-name-casing': 'off',
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
        SwitchCase: 1
      }
    ],
    'vue/comma-spacing': ['error', { before: false, after: true }],
    'no-alert': 'off',
    eqeqeq: 'off',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-loop-func': 'error',
    'no-new': 'off',
    'no-prototype-builtins': 'off',
    'no-return-await': 'error',
    'no-shadow': 'error',
    'no-useless-catch': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'require-await': 'error',
    'template-curly-spacing': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always'
      }
    ],
    'vue/no-unused-properties': ['error', {
      groups: ['props', 'data', 'computed', 'methods']
    }],
    'vue/match-component-file-name': ['error', {
      extensions: ['vue'],
      shouldMatchCase: false
    }],
    'vue/html-end-tags': 'error',
    'vue/require-default-prop': 'off',
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1
      }
    ],
    'vue/no-v-html': 'off',
    'vue/this-in-template': ['error', 'never'],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/v-on-style': ['error', 'shorthand'],
    'no-labels': 'off'
  }
}

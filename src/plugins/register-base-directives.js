import kebabCase from 'lodash/kebabCase'

const lowerKebab = str => kebabCase(str).toLowerCase()

export default {
  install: (Vue, options) => {
    const requireDirective = require.context('../directives', false, (/base-*.+\.js$/))

    requireDirective.keys().forEach(fileName => {
      // Get component config
      const directiveConfig = requireDirective(fileName)

      // Get PascalCase name of component
      const directiveName = lowerKebab(fileName.split('/').pop().replace(/\.\w+$/, ''))

      Vue.directive(directiveName, directiveConfig.default || directiveConfig)
    })
  }
}

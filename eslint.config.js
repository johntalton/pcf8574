import pluginJs from '@eslint/js'
import sec from 'eslint-plugin-security'

export default [
  {
    ...pluginJs.configs.all,
    ...sec.configs.all,
    rules: {
    }
  }
]

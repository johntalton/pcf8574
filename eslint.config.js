import pluginJs from '@eslint/js'

export default [
  pluginJs.configs.all,
  {
    rules: {
      "no-bitwise": "off",
      "no-magic-numbers": "warn",
      "no-ternary": "off",
      "no-unneeded-ternary": "error",
      "one-var": ["error", "never"],
      "require-await": ["off"]
    }
  }
]

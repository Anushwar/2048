/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'all',
  proseWrap: 'always',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
};

module.exports = config;

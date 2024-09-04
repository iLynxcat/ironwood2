/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	experimentalTernaries: true,
	useTabs: true,
	quoteProps: "consistent",
	proseWrap: "always",
	semi: true,
	singleQuote: false,
	jsxSingleQuote: false,
	trailingComma: "all",
	arrowParens: "always",
	endOfLine: "lf",
	plugins: ['prettier-plugin-tailwindcss'],
};

export default config;

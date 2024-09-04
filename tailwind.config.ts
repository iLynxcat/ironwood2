import typographyPlugin from "@tailwindcss/typography";
import touchPlugin from "tailwindcss-touch";
import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "media",
	theme: {
		colors: {
			white: "rgb(255, 255, 255)",
			black: "rgb(0, 0, 0)",
			gray: {
				50: "hsl(0, 0%, 96.5%)",
				100: "hsl(0, 0%, 93%)",
				200: "hsl(0, 0%, 87%)",
			},
			red: {
				50: "hsl(0, 100%, 97%)",
				full: "rgb(255, 0, 0)",
			},
			blue: {
				full: "rgb(0, 0, 255)",
				50: "hsl(209, 100%, 79%)",
				100: "hsl(209, 100%, 74%)",
				200: "hsl(208, 100%, 63%)",
			},
		},
		fontFamily: {
			sans: ["Arial", "sans-serif"],
			serif: ['"Times New Roman"', "serif"],
		},
		extend: {
			borderColor: {
				input: "hsla(0, 0%, 50%, 50%)",
			},
			spacing: {
				"4.5": "1.125rem",
			},
			borderWidth: {
				1: "1px",
			},
			boxShadow: {
				input: "inset 0 -0.0625rem 0.125rem hsl(0, 0%, 0% / 30%)",
			},
		},
	},
	plugins: [typographyPlugin(), touchPlugin()],
};

export default config;

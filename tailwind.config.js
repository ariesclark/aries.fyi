/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				worksans: "var(--font-worksans)"
			},
			colors: {
				purple: {
					400: "#8547C2",
					500: "#663399"
				},
				black: {
					800: "#141414",
					900: "#070707"
				}
			}
		}
	},
	plugins: []
};

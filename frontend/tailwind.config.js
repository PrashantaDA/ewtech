/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "220px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
			xxl: "2200px",
		},
		extend: {},
	},
	plugins: [flowbitePlugin],
};

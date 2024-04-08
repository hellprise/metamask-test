import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			keyframes: {
				fade: {
					from: { opacity: "0" },
					to: { opacity: "1" }
				},
				scaleIn: {
					"0%": {
						opacity: "0",
						transform: "scale(0)"
					},
					"50%": {
						opacity: "0.3"
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)"
					}
				},
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" }
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				fade: "fade 0.5s ease-in-out",
				scaleIn: "scaleIn 0.35s ease-in-out"
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
} satisfies Config

export default config

const withMT = require("@material-tailwind/react/utils/withMT")

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                gradient: {
                    '0%': { 'background-position': '0% 50%'},
                    '100%': { 'background-position': '100% 50%'},
                },
            },
            animation: {
                gradient: 'gradient 6s linear infinite',
            },
        },
    },
    variants: {},
    plugins: [],
    safelist: [
        {
            pattern: /bg-\[#[0-9a-fA-F]{3,6}\]/,
        },
    ],
});
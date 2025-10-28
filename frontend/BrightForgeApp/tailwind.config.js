const withMT = require("@material-tailwind/react/utils/withMT")

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
    safelist: [
        {
            pattern: /bg-\[#[0-9a-fA-F]{3,6}\]/,
        },
    ],
});
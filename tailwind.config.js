module.exports = {
  content: ["./src/**/*.{js,jsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      // adding background to the login
      backgroundImage: {
        "login-background": "url(../src/assets/images/loginBackground.png)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

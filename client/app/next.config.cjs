/** @type {import('next').NextConfig} */
const withTM = import('next-transpile-modules')(['@uiw/react-markdown-preview'], debug=true);

module.exports = ({
  // reactStrictMode: true,
  // experimental: { esmExternals: true }
})

// module.exports = ({
//   reactStrictMode: true,
// })

// const withCSS = require("@zeit/next-css");
// module.exports = withCSS({
//   /* config options here */
// });

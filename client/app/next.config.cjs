/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-markdown', "remark-gfm"]);

module.exports = ({
  // reactStrictMode: true,
  experimental: { esmExternals: true }
})

// module.exports = ({
//   reactStrictMode: true,
// })

// const withCSS = require("@zeit/next-css");
// module.exports = withCSS({
//   /* config options here */
// });

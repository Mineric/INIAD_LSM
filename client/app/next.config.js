/** @type {import('next').NextConfig} */
const withImages = require('next-images')
module.exports = withImages({
    reactStrictMode: true,
    images: {
        domains: ['127.0.0.1'],
        disableStaticImages: true
    },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'res.cloudinary.com',
          },
        ],
    },
    env:{
      CLOUDINARY_CLOUD_NAME : 'dxgnycko6',
      CLOUDINARY_API_KEY : '841874148753599',
      CLOUDINARY_API_SECRET : 'gxFjVcGXaR9i52NZ7GDdNA9QmEo'
    }
}

module.exports = nextConfig

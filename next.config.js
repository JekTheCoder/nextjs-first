/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
			protocol: 'https',
			hostname: 'raw.githubusercontent.com',
			pathname: '/PokeAPI/sprites/master/sprites/pokemon/**'
		}],
  },
}

// 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'

module.exports = nextConfig

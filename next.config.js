/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
		runtime: "edge"
	}
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;

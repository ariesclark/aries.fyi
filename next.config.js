/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
		runtime: "experimental-edge"
	},
	rewrites: async () => ({
		fallback: [
			{
				source: "/:path*",
				destination: "/api/:path*/click"
			}
		]
	})
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;

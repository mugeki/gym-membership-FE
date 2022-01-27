const withPWA = require("next-pwa");

module.exports = withPWA({
	reactStrictMode: true,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
	images: {
		domains: [
			"images.unsplash.com",
			"firebasestorage.googleapis.com",
			"lh3.googleusercontent.com",
			"img.youtube.com",
		],
	},
	env: {
		YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
		GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		BE_API_URL: process.env.NEXT_PUBLIC_BE_API_URL,
		BE_API_URL_LOCAL: process.env.NEXT_PUBLIC_BE_API_URL_LOCAL,
		DEFAULT_PROFILE: process.env.NEXT_PUBLIC_DEFAULT_PROFILE,
	},
	swcMinify: false,
});

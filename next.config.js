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
		YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		BE_API_URL: process.env.BE_API_URL,
		BE_API_URL_LOCAL: process.env.BE_API_URL_LOCAL,
		DEFAULT_PROFILE: process.env.DEFAULT_PROFILE,
	},
	swcMinify: false,
});

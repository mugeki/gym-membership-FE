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
			"ec2-3-142-219-49.us-east-2.compute.amazonaws.com",
			"lh3.googleusercontent.com",
		],
	},
	env: {
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		BE_API_URL: process.env.BE_API_URL,
		BE_API_URL_LOCAL: process.env.BE_API_URL_LOCAL,
		JWT_SECRET: process.env.JWT_SECRET,
	},
});

module.exports = {
	images: {
		domains: ["links.papareact.com", "fakestoreapi.com"],
	},
	// we're feeding in our environment variable into our app
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
	},
};

// this is our backend endpoint for the checkout
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// this is going to be called once we hit this endpoint
export default async (req, res) => {
	// we need to pass all the items from our frontenc to here
	const { items, email } = req.body;

	// console.log(items);
	// console.log(email);

	// this will turn the array of items that are passed into stripe and turn it into a format that stripe accepts
	// this is doing something called an implicit return
	const transformedItems = items.map((item) => ({
		description: item.description,
		// take into account the size of your array if you implement adding multiple instances of the same item
		quantity: 1,
		price_data: {
			currency: "usd",
			// we need to do this, because strip takes the currency in
			unit_amount: item.price * 100,
			product_data: {
				name: item.title,
				images: [item.image],
			},
		},
	}));

	// now I need to communicate with stripe and say here's the items, now create the checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_rates: ["shr_1JG9zABlwrTJZrLd9TWgpZY6"],
		shipping_address_collection: {
			allowed_countries: ["GB", "US", "CA"],
		},
		// this is all the items that are on the order
		line_items: transformedItems,
		mode: "payment",
		// this will redirect the user to the success page if the payment went through
		success_url: `${process.env.HOST}/success`,
		// this will redirect them if the payment either failed or they cancelled the order
		cancel_url: `${process.env.HOST}/checkout`,
		// this is additional data that we want to pass along
		metadata: {
			// this will allow us to push information from the stripe page to firebase
			email,
			images: JSON.stringify(items.map((item) => item.image)),
		},
	});

	res.status(200).json({ id: session.id });
};

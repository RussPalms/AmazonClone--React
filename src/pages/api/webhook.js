import { buffer } from "micro";
import * as admin from "firebase-admin";

// secure our connection to FIREBASE from the backend
// this is how we authenticate our admin
const serviceAccount = require("../../../permissions.json");

// this is how we initialize our app on the backend
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: admin.app();

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// get the endpoint secret when we setup our listener
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
	console.log("Fulfilling order", session);

	return app
		.firestore()
		.collection("users")
		.doc(session.metadata.email)
		.collection("orders")
		.doc(session.id)
		.set({
			// this is so that we get back to the original dollar amount
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			// this is to have a synchronous value for times globally
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log(
				`SUCCESS: Order ${session.id} has been added to the DB`
			);
		});
};

export default async (req, res) => {
	// this is how we check for POST requests in next js
	if (req.method === "POST") {
		// whenever the webook is firing off, we need to verify if the event is from stripe
		const requestBuffer = await buffer(req);
		// we generate a certificate
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"];

		let event;

		// Verify that the EVENT posted came from stripe
		try {
			event = stripe.webhooks.constructEvent(
				payload,
				sig,
				endpointSecret
			);
		} catch (err) {
			console.log("ERROR", err.message);
			return res.status(400).send(`Webhook error: ${err.message}`);
		}

		// if it gets past this phase, then the event is legit
		// handle the checkout.session.completed event
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			// Fulfill the order...
			return fulfillOrder(session)
				.then(() => res.status(200))
				.catch((err) =>
					res.status(400).send(`Webhook Error: ${err.message}`)
				);
		}
	}
};

// we're changing the next api settings here
export const config = {
	api: {
		// when we're handling a webhook we don't want a bodyParser
		// we want a stream instead of a parsed object
		bodyParser: false,
		// when we get an event and respond to it, this is going to be externally resolved
		// in this case, by stripe
		externalResolver: true,
	},
};

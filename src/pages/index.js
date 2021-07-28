import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
	return (
		<div className="bg-gray-100">
			<Head>
				<title>Amazon Clone</title>
			</Head>
			<Header />

			<main className="max-w-screen-2xl mx-auto">
				<Banner />

				<ProductFeed products={products} />
			</main>
		</div>
	);
}

// serverside rendering
export async function getServerSideProps(context) {
	const session = await getSession(context);
	const products = await fetch("https://fakestoreapi.com/products").then(
		(res) => res.json()
	);

	// passing data from the server to the browser
	return {
		props: {
			products,
			session,
		},
	};
}

//  GET >>> https://fakestoreapi.com/products

import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

// assigning the maximum and minimum values for a rating
const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
	// a piece of state is like a short-term memory for a component
	const [rating] = useState(
		// creating random values for the rating
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
	);

	const [hasPrime] = useState(Math.random() < 0.5);

	return (
		<div className="relative flex flex-col m-5 bg-white z-30 p-10">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">
				{category}
			</p>

			<Image src={image} height={200} width={200} objectFit="contain" />

			<h4 className="my-3">{title}</h4>

			<div className="flex">
				{/* creating an empty array and filling it with default values
                we don't care about the initial value, we only care about the index*/}
				{Array(rating)
					.fill()
					.map((_, i) => (
						<StarIcon className="h-5 text-yellow-500" />
					))}
			</div>

			{/* line-clamp truncates the text if it goes over two lines */}
			<p className="text-xs my-2 line-clamp-2">{description}</p>

			<div className="mb-5">
				{/* this takes a quantity and a currency, the default is USD */}
				<Currency quantity={price} />
			</div>

			{hasPrime && (
				<div className="flex items-center space-x-2 -mt-5">
					<img
						className="w-12"
						src="https://links.papareact.com/fdw"
						alt=""
					/>
					<p className="text-xs text-gray-500">
						FREE Next-Day Delivery
					</p>
				</div>
			)}

			<button className="mt-auto button">Add to Basket</button>
		</div>
	);
}

export default Product;

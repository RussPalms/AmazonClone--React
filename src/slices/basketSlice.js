import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

export const basketSlice = createSlice({
	name: "basket",
	// this gives each slice it's initial set of variables
	initialState,
	// we need to dispatch an action in order to pull data from a slice
	reducers: {
		// Actions
		// the action has a payload in it, so when you want to push an item inside, it will be in action.payload
		addToBasket: (state, action) => {
			// this is how we manipulate items in the globas store (is using something called
			// "immutable js" under the hood)
			// spread whatever the current items are this is to ensure that we don't lose whatever is passed
			// into the store
			// the payload contains the product that we passed in
			state.items = [...state.items, action.payload];
		},
		removeFromBasket: (state, action) => {
			// find the index of the item and see if it's in the list
			const index = state.items.findIndex(
				(basketItem) => basketItem.id === action.payload.id
			);

			// we need to create a copy of the current basket
			let newBasket = [...state.items];

			if (index >= 0) {
				// The item exists in the basket... remove it...
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`Can't remove the product (id: ${action.payload.id}) as it's not in the basket.`
				);
			}

			state.items = newBasket;
		},
	},
});

// we export these actions so that we can use them anywhere in our application
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
// using reduce to go through the items in the global store and calculate the total and make it available as a selector
export const selectTotal = (state) =>
	state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;

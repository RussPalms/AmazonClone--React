import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// GLOBAL STORE SETUP (this is what we do when using redux [Redux allows us to pull data
// from anywhere in our app to anywhere else within the app. Without redux, we would have to
// pass data around through props which is called "prop drilling" and we don't want to do that,
// because it isn't efficient. Instead we introduce a "data layer" that we can pull from using either
// react's build-in "context api" or in this case "redux", which is an industry standard])
// each of the "slices" that we build contain relavent information
export const store = configureStore({
	reducer: {
		basket: basketReducer,
	},
});

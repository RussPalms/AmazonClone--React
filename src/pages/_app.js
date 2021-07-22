import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
// this will allow us to access authentication states accross the entire application
import { Provider as AuthProvider } from "next-auth/client";

const MyApp = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</AuthProvider>
	);
};

export default MyApp;

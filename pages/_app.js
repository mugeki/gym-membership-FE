import "../styles/Globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Custom.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { parseCookies } from "nookies";
import axios from "axios";
import { Base64 } from "js-base64";
import { redirect } from "../utils/helper";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { token } = parseCookies(ctx);

	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const isProtectedRoute =
		ctx.pathname !== "/login" && ctx.pathname !== "/register";

	if (!token && isProtectedRoute) {
		redirect(ctx, "/login");
	}

	if (token && !isProtectedRoute) {
		redirect(ctx, "/");
	}

	// if (token) {
	// 	const parsedToken = Base64.decode(token);
	// 	const API_URL = process.env.BE_API_URL_LOCAL;
	// 	const res = await axios
	// 		.post(`${API_URL}/auth/verify-jwt/${parsedToken}`)
	// 		.catch((error) => {
	// 			console.log(error.response);
	// 		});

	// 	if (isProtectedRoute && res?.status !== 200) {
	// 		destroyCookie(ctx, "token");
	// 		destroyCookie(ctx, "user_id");
	// 		redirect(ctx, "/login");
	// 	}

	// 	if (!isProtectedRoute && res?.status === 200) {
	// 		redirect(ctx, "/");
	// 	}
	// }

	return { pageProps };
};

export default MyApp;

import "../styles/Globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Custom.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, wrapper } from "../store/store";
import { parseCookies } from "nookies";
import Router from "next/router";
let jwt = require("jsonwebtoken");

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

	const redirect = (ctx, location) => {
		if (ctx.req) {
			ctx.res.writeHead(302, { Location: location });
			ctx.res.end();
		} else {
			Router.push(location);
		}
	};

	const isProtectedRoute =
		ctx.pathname !== "/login" && ctx.pathname !== "/register";

	if (!token && isProtectedRoute) {
		redirect(ctx, "/login");
	}
	if (token && !isProtectedRoute) {
		redirect(ctx, "/");
	}
	// } else if (isProtectedRoute) {
	// 	try {
	// 		console.log(token);
	// 		const verified = jwt.verify(token, process.env.JWT_SECRET, {
	// 			algorithm: "HS256",
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 		if (ctx.req) {
	// 			ctx.res.writeHead(302, { Location: "/login" });
	// 			ctx.res.end();
	// 		} else {
	// 			Router.push("/login");
	// 		}
	// 	}
	// }

	return { pageProps };
};

export default MyApp;

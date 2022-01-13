import Router from "next/router";
import { destroyCookie } from "nookies";
import Cookies from "universal-cookie";

function redirect(ctx, location) {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location);
	}
}

function handleUnauthorized(res) {
	if ([401, 403].includes(res.status)) {
		const cookies = new Cookies();
		cookies.remove("token");
		Router.push("/login");
	}
}

export { handleUnauthorized, redirect };

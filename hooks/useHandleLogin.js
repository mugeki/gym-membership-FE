import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/userSlice";
import Cookies from "universal-cookie";
import axios from "axios";
import { Base64 } from "js-base64";

export default function useHandleLogin() {
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogin = async (res) => {
		const BE_API_URL_LOCAL = process.env.BE_API_URL_LOCAL;
		let userData = {
			...res,
		};
		delete userData.token;
		await axios
			.get(`${BE_API_URL_LOCAL}/members/${res.id}`)
			.then((resp) => {
				userData.is_member = resp.data.data.is_member;
				userData.expire_date = resp.data.data.expire_date;
			})
			.catch((error) => {
				console.log(error);
				userData.is_member = false;
				userData.expire_date = "";
			});

		const hash = Base64.encode(res.token);
		cookies.set("token", hash);
		dispatch(storeUser(userData));
		router.push("/");
	};
	return handleLogin;
}

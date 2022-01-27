import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/userSlice";
import Cookies from "universal-cookie";
import axios from "axios";
import { Base64 } from "js-base64";
import { generateAxiosConfig } from "../utils/helper";

export default function useHandleLogin() {
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogin = async (res) => {
		const API_URL = process.env.BE_API_URL;
		let userData = {
			...res,
		};
		const config = {
			headers: {
				Authorization: "Bearer " + userData.token,
			},
		};
		delete userData.token;
		await axios
			.get(`${API_URL}/members/${res.id}`, config)
			.then((resp) => {
				userData.is_member = resp.data.data.is_member;
				userData.expire_date = resp.data.data.expire_date;
			})
			.catch(() => {
				userData.is_member = false;
				userData.expire_date = "";
			});

		const hash = Base64.encode(res.token);
		cookies.set("token", hash, { path: "/", domain: window.location.hostname });
		dispatch(storeUser(userData));
		router.push("/");
	};
	return handleLogin;
}

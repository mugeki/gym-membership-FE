import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { storeUser } from "../store/userSlice";
import Cookies from "universal-cookie";

export default function useHandleLogin() {
	const cookies = new Cookies();
	const dispatch = useDispatch();
	const router = useRouter();
	const handleLogin = (res) => {
		const userData = {
			...res,
		};
		delete userData.token;

		cookies.set("token", res.token);
		dispatch(storeUser(userData));
		router.push("/");
	};
	return handleLogin;
}

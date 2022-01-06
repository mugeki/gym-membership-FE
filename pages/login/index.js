import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { GoogleLogin } from "react-google-login";
import useValidateForm from "../../hooks/useValidateForm";
import styles from "../../styles/UserAuth.module.css";
import useHandleLogin from "../../hooks/useHandleLogin";

export default function Login() {
	const handleLogin = useHandleLogin();
	const { validateForm } = useValidateForm();
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const [errorMsg, setErrorMsg] = useState({});
	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm({ ...form, [name]: value });
	};
	const onBlur = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const messages = validateForm(name, value);
		setErrorMsg({ ...errorMsg, ...messages });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm(undefined, undefined, form);
		if (Object.keys(newErrors).length > 0) {
			setErrorMsg(newErrors);
		} else {
			// const API_URL = process.env.BE_API_URL;
			const API_URL = process.env.BE_API_URL_LOCAL;
			axios
				.post(`${API_URL}/users/login`, {
					...form,
				})
				.then((res) => {
					handleLogin(res.data.data);
				})
				.catch((error) => {
					setErrorMsg({
						...errorMsg,
						auth: error.response.data.meta.messages[0],
					});
				});
		}
	};
	// const onSuccess = (res) => {
	// 	// const API_URL = process.env.BE_API_URL;
	// 	const API_URL = "http://localhost:8000";
	// 	axios
	// 		.get("https://www.googleapis.com/admin/directory/v1/users/userKey", {
	// 			headers: {
	// 				Authorization: "Bearer " + cookies.get("access_token"),
	// 			},
	// 		})
	// 		.then((resGetUser) => {
	// 			console.log(resGetUser);
	// 			// form.password = "aaaaaaaaaaaaaaa";
	// 		})
	// 		.catch((error) => console.log(error));
	// 	axios
	// 		.post(`${API_URL}/users/login`, {
	// 			...form,
	// 		})
	// 		.then((resLogin) => {
	// 			cookies.set("token", resLogin.data.data.token);
	// 			cookies.set("access_token", res.tokenObj.access_token);

	// 			const userData = {
	// 				user_id: resLogin.data.data.id,
	// 				email: res.profileObj.email,
	// 				username: res.profileObj.email,
	// 				fullname: res.profileObj.name,
	// 				img_url: res.profileObj.imageUrl,
	// 			};
	// 			dispatch(storeUser(userData));
	// 			router.push("/");
	// 		})
	// 		.catch((error) => {
	// 			setErrorMsg({
	// 				...errorMsg,
	// 				auth: error.response.data.meta.messages[0],
	// 			});
	// 		});
	// };
	// const onFailure = (res) => {
	// 	console.log("Login Failed, ", res);
	// };
	return (
		<div
			className={`${styles.container} d-flex flex-column justify-content-between p-4`}
		>
			<div className="flex-grow text-white mb-5">
				<h1 className="fw-bolder">JOIN A GYM</h1>
				<h1 className="fw-bolder">THATS FIT FOR U.</h1>
				<h1 className="fw-bolder">WHOEVER U ARE!</h1>
			</div>
			<Form
				className="container flex-grow d-flex flex-column mb-5"
				noValidate
				onSubmit={onSubmit}
			>
				<p className="text-danger text-center">{errorMsg.auth}</p>
				<FloatingLabel className="text-light mb-4" label="Username / Email">
					<Form.Control
						className={`${styles.input} rounded-0 border-0 border-bottom border-secondary shadow-none text-white bg-transparent`}
						type="text"
						placeholder=" "
						name="username"
						value={form.username}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.username || !!errorMsg.auth}
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.username}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel className="text-light mb-4" label="Password">
					<Form.Control
						className={`${styles.input} rounded-0 border-0 border-bottom border-secondary shadow-none text-white bg-transparent`}
						type="password"
						placeholder=" "
						name="password"
						value={form.password}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.password || !!errorMsg.auth}
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.password}
					</Form.Control.Feedback>
				</FloatingLabel>
				<button className="btn btn-secondary text-white mb-4" type="submit">
					Login
				</button>
				{/* <GoogleLogin
					clientId={process.env.GOOGLE_CLIENT_ID}
					render={(props) => (
						<Button
							variant="mb-5 d-flex justify-content-center shadow-none"
							onClick={props.onClick}
							disabled={props.disabled}
						>
							<Icon icon="flat-color-icons:google" width={25} />
							<p className="d-inline m-0 ms-2 text-white">
								Continue with Google
							</p>
						</Button>
					)}
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={"single_host_origin"}
				/> */}
			</Form>
			<div className="flex-grow d-flex pb-3 px-4">
				<Link href="/register">
					<a className="text-secondary m-0 text-decoration-none">Sign Up</a>
				</Link>
			</div>
		</div>
	);
}

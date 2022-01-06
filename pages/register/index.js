import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import useValidateForm from "../../hooks/useValidateForm";
import styles from "../../styles/UserAuth.module.css";
import useHandleLogin from "../../hooks/useHandleLogin";
import axios from "axios";

export default function Register() {
	const handleLogin = useHandleLogin();
	const { validateForm } = useValidateForm();
	const [form, setForm] = useState({
		username: "",
		email: "",
		fullname: "",
		password: "",
		telephone: "",
		gender: "male",
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
		console.log("newErrors", newErrors);
		if (Object.keys(newErrors).length > 0) {
			setErrorMsg(newErrors);
		} else {
			console.log("masuk");
			const API_URL = process.env.BE_API_URL_LOCAL;
			axios
				.post(`${API_URL}/users`, {
					...form,
				})
				.then(() => {
					axios
						.post(`${API_URL}/users/login`, {
							username: form.username,
							password: form.password,
						})
						.then((resLogin) => {
							handleLogin(resLogin.data.data);
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					setErrorMsg({
						...errorMsg,
						auth: error.response.data.meta.messages[0],
					});
				});
		}
	};
	// const responseGoogle = (response) => {
	// 	console.log(response);
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
				<FloatingLabel className="text-light mb-4" label="Username">
					<Form.Control
						className={`${styles.input} rounded-0 border-0 border-bottom border-secondary shadow-none text-white bg-transparent`}
						type="text"
						placeholder=" "
						name="username"
						value={form.username}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.username}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.username}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel className="text-light mb-4" label="Email">
					<Form.Control
						className={`${styles.input} rounded-0 border-0 border-bottom border-secondary shadow-none text-white bg-transparent`}
						type="email"
						placeholder=" "
						name="email"
						value={form.email}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.email}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.email}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel className="text-light mb-4" label="Full Name">
					<Form.Control
						className={`${styles.input} rounded-0 border-0 border-bottom border-secondary shadow-none text-white bg-transparent`}
						type="text"
						placeholder=" "
						name="fullname"
						value={form.fullname}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.fullname}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.fullname}
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
						isInvalid={!!errorMsg.password}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.password}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel className="text-light mb-4" label="Phone Number">
					<Form.Control
						className={`${styles.input} rounded-0 border-0 border-bottom border-secondary shadow-none text-white bg-transparent`}
						type="tel"
						placeholder=" "
						name="telephone"
						value={form.telephone}
						onChange={onChange}
						onBlur={onBlur}
						isInvalid={!!errorMsg.telephone}
						required
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.telephone}
					</Form.Control.Feedback>
				</FloatingLabel>
				<FloatingLabel className="text-light mb-4" label="Gender">
					<Form.Select
						className={`${styles.input} rounded-0 border-0 border-bottom border-secondary shadow-none text-white bg-transparent`}
						name="gender"
						value={form.gender}
						onChange={onChange}
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</Form.Select>
				</FloatingLabel>
				<button className="btn btn-secondary text-white mb-4" type="submit">
					Register
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
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={"single_host_origin"}
				/> */}
			</Form>
			<div className="flex-grow d-flex justify-content-between pb-3 px-4">
				<Link href="/login">
					<a className="text-secondary m-0 text-decoration-none">Login</a>
				</Link>
			</div>
		</div>
	);
}

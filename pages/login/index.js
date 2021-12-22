import Link from "next/link";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import useValidateForm from "../../hooks/useValidateForm";
import styles from "../../styles/UserAuth.module.css";

export default function Login() {
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
	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm(undefined, undefined, form);
		if (Object.keys(newErrors).length > 0) {
			setErrorMsg(newErrors);
		}
	};
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
						isInvalid={!!errorMsg.username}
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
						isInvalid={!!errorMsg.password}
					/>
					<Form.Control.Feedback type="invalid">
						{errorMsg.password}
					</Form.Control.Feedback>
				</FloatingLabel>
				<button className="btn btn-secondary text-white mb-5" type="submit">
					Login
				</button>
			</Form>
			<div className="flex-grow d-flex justify-content-between pb-3 px-4">
				<Link href="register">
					<a className="text-secondary m-0 text-decoration-none">Sign Up</a>
				</Link>
				<Link href="login">
					<a className="text-secondary m-0 text-decoration-none">
						Forgot Password?
					</a>
				</Link>
			</div>
		</div>
	);
}

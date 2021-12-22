import Link from "next/link";
import { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "../../styles/UserAuth.module.css";

export default function Login() {
	const [form, setForm] = useState({
		username: "",
		password: "",
	});
	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setForm({ ...form, [name]: value });
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
			<form className="container flex-grow d-flex flex-column mb-5">
				<FloatingLabel
					className="text-white mb-4 border-bottom border-secondary"
					label="Username"
				>
					<Form.Control
						className={`${styles.input} rounded-0 border-0 shadow-none text-white bg-transparent`}
						type="text"
						placeholder=" "
						name="username"
						value={form.username}
						onChange={onChange}
					/>
				</FloatingLabel>
				<FloatingLabel
					className="text-white mb-4 border-bottom border-secondary"
					label="Password"
				>
					<Form.Control
						className={`${styles.input} rounded-0 border-0 shadow-none text-white bg-transparent`}
						type="password"
						placeholder=" "
						name="password"
						value={form.password}
						onChange={onChange}
					/>
				</FloatingLabel>
				<button className="btn btn-secondary text-white mb-5">Login</button>
			</form>
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

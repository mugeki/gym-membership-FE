import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useValidateForm from "../../../hooks/useValidateForm";
import { storeUser } from "../../../store/userSlice";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";

export default function EditPassword() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [form, setForm] = useState("");
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const { validateForm } = useValidateForm();

	const updateProfile = (data) => {
		const API_URL = process.env.BE_API_URL;
		axios
			.put(
				`${API_URL}/users`,
				{
					...data,
				},
				generateAxiosConfig()
			)
			.then(() => {
				delete data.password;
				dispatch(storeUser(data));
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				handleUnauthorized(error.response);
				console.log(error);
			});
	};

	const onChange = (e) => {
		const value = e.target.value;
		setForm(value);
	};

	const onBlur = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const messages = validateForm(name, value);
		setError(messages.password);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm("password", form);
		newErrors.password === "" && delete newErrors.password;
		if (Object.keys(newErrors).length > 0) {
			setError(newErrors.password);
		} else {
			const newData = { ...user, password: form };
			setLoading(true);
			updateProfile(newData);
		}
	};

	return (
		<Layout>
			<Head>
				<title>Edit Password | Gymbro</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={"Edit Password"} />
			<Form className="container p-4" noValidate onSubmit={onSubmit}>
				<Form.Label>Enter new Password</Form.Label>
				<Form.Control
					className="border-light border-0 border-bottom shadow-none rounded-0"
					type="password"
					name="password"
					value={form}
					onChange={onChange}
					onBlur={onBlur}
					isInvalid={!!error}
				/>
				<Form.Text>Password length must be atleast 6 characters long</Form.Text>
				<Button variant="primary w-100 mt-4" type="submit">
					{loading ? (
						<Spinner animation="border" variant="white" size="sm" />
					) : (
						"Confirm"
					)}
				</Button>
			</Form>
		</Layout>
	);
}

import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useValidateForm from "../../../hooks/useValidateForm";
import { storeUser } from "../../../store/userSlice";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";

export default function EditPhone() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [form, setForm] = useState(user.telephone || "");
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
		setError(messages.telephone);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const newErrors = validateForm("telephone", form);
		if (Object.keys(newErrors).length > 0) {
			setError(newErrors.telephone);
		} else {
			const newData = { ...user, telephone: form };
			setLoading(true);
			updateProfile(newData);
		}
	};

	return (
		<Layout>
			<Head>
				<title>Edit Phone Number | Gymbro</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={"Edit Phone Number"} />
			<Form className="container p-4" noValidate onSubmit={onSubmit}>
				<Form.Label>Enter new Phone Number</Form.Label>
				<Form.Control
					className="border-light border-0 border-bottom shadow-none rounded-0"
					type="tel"
					name="telephone"
					value={form}
					onChange={onChange}
					onBlur={onBlur}
					isInvalid={!!error}
				/>
				<Form.Text>Phone number must be 10 - 15 digits long</Form.Text>
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

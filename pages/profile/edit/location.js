import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import { storeUser } from "../../../store/userSlice";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";

export default function EditLocation() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [form, setForm] = useState(user.address || "");
	const [loading, setLoading] = useState(false);

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

	const onSubmit = (e) => {
		e.preventDefault();
		const newData = { ...user, address: form };
		setLoading(true);
		updateProfile(newData);
	};

	return (
		<Layout>
			<NavbarTop title={"Edit Location"} />
			<Form className="container p-4" onSubmit={onSubmit}>
				<Form.Label>Enter new Location</Form.Label>
				<Form.Control
					className="border-light border-0 border-bottom shadow-none rounded-0"
					type="text"
					value={form}
					onChange={onChange}
				/>
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

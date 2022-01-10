import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";

export default function EditLocation() {
	const user = useSelector((state) => state.user);
	const [form, setForm] = useState(user.address);
	const onChange = (e) => {
		const value = e.target.value;
		setForm(value);
	};
	return (
		<Layout>
			<NavbarTop title={"Edit Location"} />
			<Form className="container p-4">
				<Form.Label>Enter new Location</Form.Label>
				<Form.Control
					className="border-light border-0 border-bottom shadow-none rounded-0"
					type="text"
					value={form}
					onChange={onChange}
				/>
				<Button variant="primary w-100 mt-4" type="submit">
					Confirm
				</Button>
			</Form>
		</Layout>
	);
}

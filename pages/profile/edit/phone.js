import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useValidateForm from "../../../hooks/useValidateForm";

export default function EditPhone() {
	const user = useSelector((state) => state.user);
	const [form, setForm] = useState({ telephone: user.telephone });
	const [errorMsg, setErrorMsg] = useState({});
	const { validateForm } = useValidateForm();
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
		}
	};
	return (
		<Layout>
			<NavbarTop title={"Edit Phone Number"} />
			<Form className="container p-4" noValidate onSubmit={onSubmit}>
				<Form.Label>Enter new Phone Number</Form.Label>
				<Form.Control
					className="border-light border-0 border-bottom shadow-none rounded-0"
					type="tel"
					name="telephone"
					value={form.telephone}
					onChange={onChange}
					onBlur={onBlur}
					isInvalid={!!errorMsg.telephone}
				/>
				<Form.Text>Phone number must be 10 - 15 digits long</Form.Text>
				<Button variant="primary w-100 mt-4" type="submit">
					Confirm
				</Button>
			</Form>
		</Layout>
	);
}

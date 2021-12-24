import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import useValidateForm from "../../../hooks/useValidateForm";

export default function EditPassword() {
	const [form, setForm] = useState({ password: "" });
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
			<NavbarTop title={"Edit Password"} />
			<Form className="container p-4" noValidate onSubmit={onSubmit}>
				<Form.Label>Enter new Password</Form.Label>
				<Form.Control
					className="border-light border-0 border-bottom shadow-none rounded-0"
					type="password"
					name="password"
					value={form.password}
					onChange={onChange}
					onBlur={onBlur}
					isInvalid={!!errorMsg.password}
				/>
				<Form.Text>Password length must be atleast 6 characters long</Form.Text>
				<Button variant="primary w-100 mt-4" type="submit">
					Confirm
				</Button>
			</Form>
		</Layout>
	);
}

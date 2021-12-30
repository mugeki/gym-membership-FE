import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";

export default function EditLocation() {
	return (
		<Layout>
			<NavbarTop title={"Edit Location"} />
			<Form className="container p-4">
				<Form.Label>Enter new Location</Form.Label>
				<Form.Control
					className="border-light border-0 border-bottom shadow-none rounded-0"
					type="text"
				/>
				<Button variant="primary w-100 mt-4" type="submit">
					Confirm
				</Button>
			</Form>
		</Layout>
	);
}

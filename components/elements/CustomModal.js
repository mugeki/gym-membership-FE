import Link from "next/link";
import { Button, Modal } from "react-bootstrap";

export default function CustomModal(props) {
    const message=props.message
    const title=props.title
	const hrefTo=props.hrefTo
    const messageHref=props.messageHref
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body className="d-flex flex-column align-items-center py-4">
				<h4>{title}</h4>
				<p className="text-center">
                    {message}
				</p>
				<Link href={hrefTo} passHref>
					<Button variant="primary rounded-pill py-2 px-4">
						{messageHref}
					</Button>
				</Link>
			</Modal.Body>
		</Modal>
	);
}

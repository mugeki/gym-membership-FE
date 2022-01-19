import Link from "next/link";
import { Button, Modal } from "react-bootstrap";

export default function MemberOnlyModal(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body className="d-flex flex-column align-items-center py-4">
				<h4>Member Content</h4>
				<p className="text-center">
					You've discovered a member exclusive content
				</p>
				<Link href="/profile/membership" passHref>
					<Button variant="primary rounded-pill py-2 px-4">
						Get Membership
					</Button>
				</Link>
			</Modal.Body>
		</Modal>
	);
}

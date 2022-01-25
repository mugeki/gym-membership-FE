import { Icon } from "@iconify/react";
import styles from "../../styles/ModalAcc.module.css";
import CloseButton from "react-bootstrap/CloseButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "react-bootstrap";

export default function StatusDecline() {
	const router = useRouter();
	return (
		<>
			<div className="d-flex bg-body rounded justify-content-center">
				<div
					className={`p-3 shadow-lg rounded-3 d-flex flex-column col-10  align-items-start mt-6`}
				>
					<p className="text-primary fw-bold fs-4 m-0">Hi!</p>
					<p className="m-0 text-primary fw-bold mb-3">
						Sorry, your payment was declined.
					</p>
					<p className="m-0 p-0">There is possibility why : </p>
					<ol className="m-0 p-0">
						<li>your receipt photo blured</li>
						<li>your card/payment information is incorrect</li>
						<li>your payment detail unreadable</li>
						<li>wrong nominal transfer</li>
					</ol>
					<div>
						<p className="p-0 m-0">
							if you think you sure there is nothing wrong with your receipt,
							please contact us at :
						</p>
						<a
							className="link-primary p-0 m-0"
							href="mailto:alta2@gymmembership.com?subject=I Have Problen with my Receipt"
						>
							alta2@gymmembership.com
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

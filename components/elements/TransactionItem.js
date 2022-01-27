import Link from "next/link";
import { Button } from "react-bootstrap";
export default function TranasctionItem({ entries }) {
	const date = new Date(entries.created_at);
	const tempStatus = entries.status.replaceAll("-", " ");
	const status = tempStatus.charAt(0).toUpperCase() + tempStatus.slice(1);

	const transactionID = entries.ID;
	const href = () => {
		if (entries.membership_product_id != null) {
			console.log("route to member", entries.membership_product_id);
			return `/profile/transactions/member/${entries.id}`;
		} else if (entries.class_id != null) {
			console.log("route to class", entries.class_id);
			return `/profile/transactions/class/${entries.id}`;
		}
	};
	const as = () => {
		if (entries.membership_product_id != null) {
			return `/profile/transactions/member/${entries.id}`;
		} else if (entries.class_id != null) {
			return `/profile/transactions/class/${entries.id}`;
		}
	};

	return (
		<div className="d-flex justify-content-between align-items-center border-0 border-bottom p-4 py-3">
			<div className="d-flex flex-column">
				<p className="mb-2 fw-bolder text-primary text-capitalize">
					{entries.product_name}
				</p>
				<div
					className={
						"mb-1 px-2 py-1 rounded align-self-start shadow-sm " +
						(status === "Waiting for payment"
							? "bg-light"
							: status === "waiting for confirmation"
							? "bg-warning"
							: status === "accepted"
							? "bg-success"
							: "bg-danger")
					}
					style={{ fontSize: "14px" }}
				>
					<p className="m-0 text-white">{status}</p>
				</div>

				<p className="mb-0">
					Rp{entries.nominal.toLocaleString().replace(/,/g, ".")}
				</p>
				<p className="mb-0">Made at {date.toLocaleString("en-GB")}</p>
			</div>
			<Link
				href={{
					pathname: href(),
					query: {
						ID: transactionID,
					},
				}}
				as={as()}
				passHref
				params
			>
				<Button variant="primary">
					{entries.status === "accepted"
						? "View receipt"
						: entries.status === "waiting for confirmation"
						? " View status"
						: entries.status === "waiting for payment"
						? "Pay now"
						: entries.status === "decline"
						? "Repay now"
						: entries.status === "failed"
						? "Timed Out"
						: ""}
				</Button>
			</Link>
		</div>
	);
}

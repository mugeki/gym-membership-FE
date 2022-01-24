import styles from "../../styles/Transaction.module.css";
import Link from "next/link";
export default function TranasctionItem({ entries }) {
	const date = new Date(entries.created_at);
	const tempStatus = entries.status.replaceAll("-", " ");
	const status = tempStatus.charAt(0).toUpperCase() + tempStatus.slice(1);

	const transactionID = entries.ID;
	const transactionData = entries;
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
	// const href =`/profile/transaction/${entries.id}`

	const linkStatus = () => {
		if (entries.status == "accepted") {
			return "View receipt";
		} else {
			if (entries.status == "waiting-for-confirmation") {
				return "View status";
			} else {
				return "Pay now";
			}
		}
	};
	return (
		<Link
			href={{
				pathname: href(),
				query: {
					ID: transactionID,
				},
			}}
			as={as()}
			// onClick={(<ClassById entries={entries} />)}
			passHref
			params
		>
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
								: status === "Waiting for confirmation"
								? "bg-warning"
								: status === "Accepted"
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
				<div>
					<button className={`btn ${styles.button} px-2 py-1 rounded-3`}>
						{linkStatus()}
					</button>
				</div>
			</div>
		</Link>
	);
}

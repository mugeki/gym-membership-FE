export default function TranasctionItem({ entries }) {
	const date = new Date(entries.created_at);
	const status =
		entries.status.charAt(0).toUpperCase() + entries.status.slice(1);
	return (
		<div className="d-flex justify-content-between align-items-center border-0 border-bottom p-4 py-3">
			<div className="d-flex flex-column">
				<p className="mb-2 fw-bolder text-primary">{entries.product_name}</p>
				<div
					className={
						"mb-1 p-1 px-2 rounded align-self-start shadow-sm " +
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
		</div>
	);
}

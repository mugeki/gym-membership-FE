export default function ScheduleItem({ entries }) {
	const date = new Date(entries.created_at);
	return (
		<div className="d-flex justify-content-between align-items-center border-0 border-bottom p-4 py-3">
			<div className="d-flex flex-column">
				<p className="mb-2 fw-bolder text-primary">{entries.product}</p>
				<p className="mb-0">{entries.status}</p>
				<p className="mb-0">
					Rp{entries.price.toLocaleString().replace(/,/g, ".")}
				</p>
				<p className="mb-0">Made at {date.toLocaleString("en-GB")}</p>
			</div>
		</div>
	);
}

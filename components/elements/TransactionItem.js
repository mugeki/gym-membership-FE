import Link from "next/link";
import styles from "../../styles/Transaction.module.css"

export default function ScheduleItem({ entries }) {
	const date = new Date(entries.created_at);
	const transactionData =JSON.stringify(entries);
	const transactionID = entries.id;
	const href = `/profile/transaction/${entries.id}`
	const linkStatus=()=>{
		if(entries.status=="accepted"){
			return "see receipt"
		}else{
			if(entries.status=="waiting-for-confirmation"){
				return "see status"
			}
			else{
				return "pay now"
			}
		}
	}
	

	return (
		<Link
			href={{
				pathname: href,
				query: {
					// transactionID: transactionID,
					// transactionData:transactionData
				},
			}}
			as={`/profile/transactions/${entries.id}`}
			// onClick={(<ClassById entries={entries} />)}
			passHref
			params
			>
		
			<div className="d-flex justify-content-between align-items-center border-0 border-bottom p-4 py-3 shadow my-3 bg-body rounded">
				<div className="d-flex flex-column">
					<p className="mb-2 fw-bolder text-primary">{entries.product}</p>
					<p className="mb-0">{entries.status}</p>
					<p className="mb-0">
						Rp {entries.price.toLocaleString().replace(/,/g, ".")}
					</p>
					<p className="mb-0">Made at {date.toLocaleString("en-GB")}</p>
				</div>
				<div>
					<button className={`btn ${styles.button} p-1 rounded-3`} >{linkStatus()}</button>
				</div>
			</div>
		</Link>
	);
}

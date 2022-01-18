import Link from "next/link";
import styles from "../../styles/Transaction.module.css"
import React, { useState } from 'react';

export default function ScheduleItem({ entries }) {
	const date = new Date(entries.created_at);
	const transactionData =JSON.stringify(entries);
	const href = `/profile/transaction/${entries.id}`
	const transactionID = entries.id
	const transactionID = entries.status
	const linkStatus=()=>{
		if(entries.status=="accepted"){
			return "see receipt"
		}else{
			if(entries.status=="waiting-for-confirmation"){
				// setStatusColor("red")
				return "see status"
			}
			else{
				// setStatusColor("red")
				return "pay now"
			}
		}
	}
	const statusButton=()=>{
		if(entries.status=="accepted"){
			return ` bg-light ${styles.containerGreen} rounded-3 px-2 m-0`
		}else{
			if(entries.status=="waiting-for-confirmation"){
				return ` bg-light ${styles.containerRed} rounded-3 px-2 m-0`
			}
			else{
				return ` bg-light ${styles.containerRed} rounded-3 px-2 m-0`
			}
		}
	}
	

	return (
		<Link
			href={{
				pathname: href,
				query: {
					ID: transactionID,
					transactionData:transactionData
				},
			}}
			as={`/profile/transactions/${entries.id}`}
			// onClick={(<ClassById entries={entries} />)}
			passHref
			params
			>
		
			<div className={` d-flex justify-content-between align-items-center border-0 border-bottom p-4 py-3 shadow my-3 bg-body rounded`}>
				<div className="d-flex flex-column">
					<p className="mb-2 fw-bolder text-primary text-capitalize m-0 p-0">{entries.class_name}</p>
					<div className={statusButton()}>
						<p className="mb-0">{entries.status}</p>
					</div>
					
					<p className="mb-0">
						Rp {entries.nominal.toLocaleString().replace(/,/g, ".")}
					</p>
					<p className="mb-0">Made at {date.toLocaleString("en-GB")}</p>
				</div>
				<div>
					<button 
						className={`btn ${styles.button} p-1 rounded-3`} >
						{linkStatus()}
					</button>
				</div>
			</div>
		</Link>
	);
}

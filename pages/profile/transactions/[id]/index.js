import NavbarTop from "../../../../components/elements/NavbarTop";
import Payment from "../../../../components/elements/Payment";
import Receipt from "../../../../components/elements/Receipt";
import StatusWaiting from "../../../../components/elements/SeeStatus";
import React, { useState } from 'react';

export default function TransactionByID({ID, status,transactionData}){
    const entries={
        "id": "12235-jsh-8sub",
        "name": "1 Month Membership",
        "price": 200000,
        "status": "waiting-for-confirmation",
        "created_at": "2021-12-30T00:00:00.000Z"
    }
    const [title,setTitle]=useState("Transaction Detail")
    const productType="membership"
    const transactionDetailHandle=()=>{
		if(entries.status=="accepted"){
            // setTitle("Order Receipt")
			return <Receipt entries={entries}/>
		}else{
			if(entries.status=="waiting-for-confirmation"){
                // setTitle("Order Status")
				return <StatusWaiting/>
			}
			else{
                // setTitle("Order Payment")
				return <Payment/>
			}
		}
	}
    // const statusNav=()=>
    return(
        <>
            <NavbarTop title={title}/>
            {/* <Receipt entries={entries} productType={productType}/> */}
            <div className="p-4">
                {transactionDetailHandle()}
            </div>
        </>
    );
    
}
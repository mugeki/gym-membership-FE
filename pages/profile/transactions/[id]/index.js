import NavbarTop from "../../../../components/elements/NavbarTop";
import Payment from "../../../../components/elements/Payment";
import Receipt from "../../../../components/elements/Receipt";

export default function TransactionByID({id, status}){
    const entries={
        "id": "12235-jsh-8sub",
        "name": "1 Month Membership",
        "price": 200000,
        "status": "waiting-for-payment",
        "created_at": "2021-12-30T00:00:00.000Z"
    }
    const productType="membership"
    const transactionDetailHandle=()=>{
		if(entries.status=="accepted"){
			return <Receipt entries={entries}/>
		}else{
			if(entries.status=="waiting-for-confirmation"){
				return "see status"
			}
			else{
				return <Payment/>
			}
		}
	}
    // const statusNav=()=>
    return(
        <>
            <NavbarTop title={"Order Receipt"}/>
            {/* <Receipt entries={entries} productType={productType}/> */}
            <div className="p-4">
                {transactionDetailHandle()}
            </div>
        </>
    );
    
}
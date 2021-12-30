import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import dataTransactions from "../../../mock_data/transactions.json";
import TransactionItem from "../../../components/elements/TransactionItem";

export default function MySchedule() {
	return (
		<Layout>
			<NavbarTop title={"Transactions"} />
			<div className="d-flex flex-column pb-5 mb-5">
				{dataTransactions.data.map((item) => (
					<TransactionItem key={item.id} entries={item} />
				))}
			</div>
		</Layout>
	);
}

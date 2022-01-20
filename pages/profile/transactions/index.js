import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import TransactionItem from "../../../components/elements/TransactionItem";
import { Button, Fade } from "react-bootstrap";
import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "universal-cookie";
// import { useSelector } from "react-redux";
// import { handleUnauthorized } from "../../../utils/helper";
// import { Base64 } from "js-base64";
import dataTransactions from "../../../mock_data/transactions.json";

export default function MySchedule() {
	// const user = useSelector((state) => state.user);
	// const [memberTx, setMemberTx] = useState();
	// const [classTx, setClassTx] = useState();
	const [errorMember, setErrorMember] = useState();
	const [errorClass, setErrorClass] = useState();
	const classTx=dataTransactions
	const memberTx=dataTransactions

	const [openMember, setOpenMember] = useState(true);
	const [openClass, setOpenClass] = useState(false);
	const handleMemberTab = () => {
		setOpenMember(true);
		setOpenClass(false);
	};
	const handleClassTab = () => {
		setOpenMember(false);
		setOpenClass(true);
	};
	return (
		<Layout>
			<NavbarTop title={"Transactions"} />
			{/* <div className="d-flex flex-column pb-5 mb-5">
				{dataTransactions.data.map((item) => (
					<TransactionItem key={item.id} entries={item} />
				))}
			</div> */}
			<div className="d-flex flex-column pb-5 mb-5">
				<div className="px-4 mt-4">
					<Button
						onClick={handleMemberTab}
						aria-controls="membership"
						aria-expanded={openMember}
						variant={openMember ? "primary" : "outline-primary"}
						className="me-3"
						// disabled={openMember}
					>
						Memberships
					</Button>
					<Button
						onClick={handleClassTab}
						aria-controls="class"
						aria-expanded={openClass}
						variant={openClass ? "primary" : "outline-primary"}
						// disabled={openClass}
					>
						Classes
					</Button>
				</div>
				<Fade in={openMember} hidden={!openMember}>
					<div id="membership">
						{errorMember && (
							<p className="text-center text-light mt-5">{errorMember}</p>
						)}
						{memberTx?.data.map((item) => (
							<TransactionItem key={item.id} entries={item} />
						))}
					</div>
				</Fade>
				<Fade in={openClass} hidden={!openClass}>
					<div id="class">
						{errorClass && (
							<p className="text-center text-light mt-5">{errorClass}</p>
						)}
						{classTx?.data.map((item) => (
							<TransactionItem key={item.id} entries={item} />
						))}
					</div>
				</Fade>
			</div>
		</Layout>
	);
}

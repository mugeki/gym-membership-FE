import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import TransactionItem from "../../../components/elements/TransactionItem";
import { Button, Fade } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";
import Head from "next/head";
import { storeUser } from "../../../store/userSlice";

export default function MySchedule() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [memberTx, setMemberTx] = useState();
	const [classTx, setClassTx] = useState();
	const [errorMember, setErrorMember] = useState();
	const [errorClass, setErrorClass] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		const userData = { ...user };
		axios
			.get(`${API_URL}/members/${user.id}`, generateAxiosConfig())
			.then((resp) => {
				userData.is_member = resp.data.data.is_member;
				userData.expire_date = resp.data.data.expire_date;
			})
			.catch(() => {
				userData.is_member = false;
				userData.expire_date = "";
			});
		dispatch(storeUser(userData));
	}, [dispatch, user]);

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/transaction-membership/user`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setError("No transaction has been made");
				}
				setMemberTx({ data: res.data.data, page: res.data.page });
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorMember(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setMemberTx, user.id]);

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/transaction-class/user`, generateAxiosConfig())
			.then((res) => {
				if (res.status === 204) {
					setErrorClass("No transaction has been made");
				}

				setClassTx({ data: res.data.data, page: res.data.page });
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					setErrorClass(error.response.data.meta.messages[0]);
					console.log(error);
				}
			});
	}, [setClassTx, user.id]);

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
			<Head>
				<title>Transactions | Gymbro</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={"Transactions"} />
			<div className="d-flex flex-column pb-5 mb-5">
				<div className="px-4 mt-4">
					<Button
						onClick={handleMemberTab}
						aria-controls="membership"
						aria-expanded={openMember}
						variant={openMember ? "primary" : "outline-primary"}
						className="me-3"
					>
						Memberships
					</Button>
					<Button
						onClick={handleClassTab}
						aria-controls="class"
						aria-expanded={openClass}
						variant={openClass ? "primary" : "outline-primary"}
					>
						Classes
					</Button>
				</div>
				<Fade in={openMember} hidden={!openMember}>
					<div id="membership">
						{errorMember && (
							<p className="text-center text-light mt-5">{errorMember}</p>
						)}
						{memberTx?.data?.map((item) => (
							<TransactionItem key={item.id} entries={item} />
						))}
					</div>
				</Fade>
				<Fade in={openClass} hidden={!openClass}>
					<div id="class">
						{errorClass && (
							<p className="text-center text-light mt-5">{errorClass}</p>
						)}
						{classTx?.data?.map((item) => (
							<TransactionItem key={item.id} entries={item} />
						))}
					</div>
				</Fade>
			</div>
		</Layout>
	);
}

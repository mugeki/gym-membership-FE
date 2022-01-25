import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import MembershipProduct from "../../../components/elements/MembershipProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { generateAxiosConfig } from "../../../utils/helper";
import Head from "next/head";

export default function Membership() {
	const user = useSelector((state) => state.user);
	const [products, setProducts] = useState();

	useEffect(() => {
		const API_URL = process.env.BE_API_URL;
		axios
			.get(`${API_URL}/membership-products`, generateAxiosConfig())
			.then((res) => {
				setProducts(res.data.data);
			})
			.catch((error) => console.log(error));
	}, [setProducts]);

	const expireDate =
		user.expire_date || new Date(user?.expire_date).toLocaleDateString("en-GB");
	return (
		<Layout>
			<Head>
				<title>Membership | Alta2Gym</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={"Membership"} />
			<div className="d-flex flex-column pb-5 mb-4">
				<div className="d-flex flex-column border-0 border-bottom p-4 pb-3">
					<p className="mb-1 fw-bolder">Membership Status</p>
					<p className="mb-0" style={{ fontSize: "14px" }}>
						{user.is_member ? "Member, " : "Non-Member "}
						<span className="fw-normal text-light" hidden={!user.is_member}>
							Valid until: {expireDate}
						</span>
					</p>
				</div>
				<div className="d-flex flex-column border-0 border-bottom p-4 pb-3">
					<p className="mb-1 fw-bolder">Get Membership</p>
					<p className="mb-0" style={{ fontSize: "14px" }}>
						Available Plans:
					</p>
					<div className="d-flex flex-wrap justify-content-between py-2">
						{products?.map((item) => (
							<MembershipProduct key={item.id} entries={item} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}

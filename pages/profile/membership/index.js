import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import dataUser from "../../../mock_data/user.json";
import dataMembers from "../../../mock_data/members.json";
import dataMemberships from "../../../mock_data/membership_products.json";
import MembershipProduct from "../../../components/elements/MembershipProduct";

export default function Membership() {
	const router = useRouter();
	const isMember = dataMembers.data.filter(
		(item) => item.user_id === dataUser.data.id
	);
	const expireDate = new Date(isMember[0]?.expired_date).toLocaleDateString(
		"en-GB"
	);
	return (
		<Layout>
			<NavbarTop title={"Membership"} />
			<div className="d-flex flex-column">
				<div className="d-flex flex-column border-0 border-bottom p-4 pb-3">
					<p className="mb-1 fw-bolder">Membership Status</p>
					<p className="mb-0" style={{ fontSize: "14px" }}>
						{isMember[0] ? "Member, " : "Non-Member "}
						<span className="fw-normal text-light" hidden={!isMember[0]}>
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
						{dataMemberships.data.map((item) => (
							<MembershipProduct key={item.id} entries={item} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}

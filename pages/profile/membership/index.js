import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import dataMember from "../../../mock_data/member_by_userid.json";
import dataMemberships from "../../../mock_data/membership_products.json";
import MembershipProduct from "../../../components/elements/MembershipProduct";

export default function Membership() {
	const expireDate = new Date(dataMember?.data.expired_date).toLocaleDateString(
		"en-GB"
	);
	return (
		<Layout>
			<NavbarTop title={"Membership"} />
			<div className="d-flex flex-column pb-5 mb-4">
				<div className="d-flex flex-column border-0 border-bottom p-4 pb-3">
					<p className="mb-1 fw-bolder">Membership Status</p>
					<p className="mb-0" style={{ fontSize: "14px" }}>
						{dataMember ? "Member, " : "Non-Member "}
						<span className="fw-normal text-light" hidden={!dataMember}>
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

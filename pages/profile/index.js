import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import dataUser from "../../mock_data/user.json";
import dataMembers from "../../mock_data/members.json";
import { useRouter } from "next/router";

export default function Profile() {
	const router = useRouter();
	const isMember = dataMembers.data.filter(
		(item) => item.user_id === dataUser.data.id
	);
	return (
		<Layout>
			<div className="container d-flex flex-column p-4">
				<div className="d-flex align-items-center">
					<Image
						src={dataUser.data.url_image}
						width={80}
						height={80}
						alt="profile"
						className="rounded-circle"
					/>
					<span className="mx-3 fs-5">{dataUser.data.full_name}</span>
					<span
						className="border border-secondary text-secondary rounded px-2"
						hidden={!isMember[0]}
					>
						Member
					</span>
				</div>
				<div className="d-flex flex-column py-5">
					<Link href={router.pathname + "/edit"} passHref>
						<div className="d-flex mb-4" style={{ cursor: "pointer" }}>
							<Icon
								icon="ant-design:setting-filled"
								color="#5965ce"
								width="20"
							/>
							<span className="ms-2">Edit Profile</span>
						</div>
					</Link>
					<Link href={router.pathname + "/schedule"} passHref>
						<div className="d-flex mb-4" style={{ cursor: "pointer" }}>
							<Icon
								icon="ant-design:schedule-filled"
								color="#5965ce"
								width="20"
							/>
							<span className="ms-2">My Schedule</span>
						</div>
					</Link>
					<Link href={router.pathname + "/membership"} passHref>
						<div className="d-flex mb-4" style={{ cursor: "pointer" }}>
							<Icon
								icon="ic:baseline-card-membership"
								color="#5965ce"
								width="20"
							/>
							<span className="ms-2">Membership</span>
						</div>
					</Link>
					<Link href={router.pathname + "/transactions"} passHref>
						<div className="d-flex mb-4" style={{ cursor: "pointer" }}>
							<Icon icon="fa-solid:receipt" color="#5965ce" width="20" />
							<span className="ms-2">Transactions</span>
						</div>
					</Link>
				</div>
			</div>
		</Layout>
	);
}

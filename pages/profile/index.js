import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/userSlice";
import { useSelector } from "react-redux";

export default function Profile() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const cookies = new Cookies();
	const router = useRouter();
	const onClick = () => {
		router.push("/login");
		cookies.remove("token");
		cookies.remove("user_id");
		dispatch(clearUser());
	};
	return (
		<Layout>
			<div className="container d-flex flex-column p-4">
				<div className="d-flex align-items-center flex-nowrap">
					<Image
						src={user.url_image}
						width={55}
						height={55}
						alt="profile"
						objectFit="cover"
						className="rounded-circle align-self-center"
					/>
					<span className="mx-3 text-truncate">{user.fullname}</span>
					<span
						className="border border-secondary text-secondary rounded px-2"
						hidden={!user.is_member}
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
					<div
						className="d-flex mb-4"
						style={{ cursor: "pointer" }}
						onClick={onClick}
					>
						<Icon icon="cil:account-logout" color="#5965ce" width="20" />
						<span className="ms-2">Logout</span>
					</div>
				</div>
			</div>
		</Layout>
	);
}

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import dataUser from "../../../mock_data/user.json";

export default function EditProfile() {
	const router = useRouter();
	return (
		<Layout>
			<NavbarTop title={"Edit Profile"} />
			<div className="container d-flex flex-column align-items-center px-4">
				<div className="d-flex flex-column align-items-center py-4">
					<Image
						src={dataUser.data.url_image}
						width={80}
						height={80}
						alt="profile"
						className="rounded-circle"
					/>
					<p className="mt-2 fs-5">{dataUser.data.full_name}</p>
				</div>
				<Link href={router.pathname + "/password"} passHref>
					<div
						className="d-flex justify-content-between border-0 border-bottom border-light mb-5 w-100"
						style={{ cursor: "pointer" }}
					>
						<p className="mb-2">Password</p>
						<p className="mb-2">{">"}</p>
					</div>
				</Link>
				<Link href={router.pathname + "/phone"} passHref>
					<div
						className="d-flex justify-content-between border-0 border-bottom border-light mb-5 w-100"
						style={{ cursor: "pointer" }}
					>
						<p className="mb-2">Phone Number</p>
						<p className="mb-2">{">"}</p>
					</div>
				</Link>
				<Link href={router.pathname + "/location"} passHref>
					<div
						className="d-flex justify-content-between border-0 border-bottom border-light mb-5 w-100"
						style={{ cursor: "pointer" }}
					>
						<p className="mb-2">Location</p>
						<p className="mb-2">{">"}</p>
					</div>
				</Link>
			</div>
		</Layout>
	);
}

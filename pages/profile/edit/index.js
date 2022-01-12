import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { app } from "../../../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import { Spinner } from "react-bootstrap";
import { useState } from "react";

export default function EditProfile() {
	const user = useSelector((state) => state.user);
	const router = useRouter();
	const [loadingUpload, setLoadingUpload] = useState(false);
	const onChange = (e) => {
		if (app) {
			const file = e.target.files[0];
			const storageRef = getStorage();
			const fileRef = ref(storageRef, file.name);
			setLoadingUpload(true);
			imageCompression(file, compressionOption).then((compressedFile) => {
				uploadBytes(fileRef, compressedFile).then(() => {
					getDownloadURL(fileRef)
						.then((url) => {
							// setForm({ ...form, img_link: url });
						})
						.then(() => {
							setLoadingUpload(false);
						});
				});
			});
		}
	};
	return (
		<Layout>
			<NavbarTop title={"Edit Profile"} />
			<div className="container d-flex flex-column align-items-center px-4">
				<div className="d-flex flex-column align-items-center py-4">
					<Image
						src={user.url_image}
						width={80}
						height={80}
						alt="profile"
						className="rounded-circle"
					/>
					{loadingUpload ? (
						<Spinner animation="border" variant="primary" />
					) : (
						<label
							htmlFor="img"
							className="position-absolute"
							style={{
								marginTop: "3.6rem",
								marginLeft: "4.3rem",
								cursor: "pointer",
							}}
						>
							<Icon
								icon="ic:baseline-add-a-photo"
								width="25px"
								color="#5965ce"
								hFlip={true}
							/>
							<input hidden={true} type="file" id="img" onChange={onChange} />
						</label>
					)}

					<p className="mt-3">{user.fullname}</p>
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

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { generateAxiosConfig, handleUnauthorized } from "../../../utils/helper";
import { storeUser } from "../../../store/userSlice";
import axios from "axios";
import Head from "next/head";

export default function EditProfile() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const updateProfile = (data) => {
		const API_URL = process.env.BE_API_URL;
		const formData = { ...data };
		delete formData.id;
		delete formData.is_member;
		delete formData.expire_date;
		axios
			.put(
				`${API_URL}/users`,
				{
					...formData,
				},
				generateAxiosConfig()
			)
			.then(() => {
				dispatch(storeUser(data));
			})
			.catch((error) => {
				handleUnauthorized(error.response);
				console.log(error);
			});
	};
	const onChange = (e) => {
		if (app) {
			const file = e.target.files[0];
			const storageRef = getStorage();
			const fileRef = ref(storageRef, file.name);
			const compressionOption = {
				maxWidthOrHeight: 528,
				useWebWorker: true,
			};
			setLoading(true);
			imageCompression(file, compressionOption).then((compressedFile) => {
				uploadBytes(fileRef, compressedFile).then(() => {
					getDownloadURL(fileRef)
						.then((url) => {
							const newData = { ...user, url_image: url };
							updateProfile(newData);
						})
						.then(() => {
							setLoading(false);
						});
				});
			});
		}
	};
	return (
		<Layout>
			<Head>
				<title>Edit Profile | Gymbro</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavbarTop title={"Edit Profile"} />
			<div className="container d-flex flex-column align-items-center px-4">
				<div className="d-flex flex-column align-items-center py-4">
					<Image
						src={user.url_image}
						width={80}
						height={80}
						alt="profile"
						className="img-fluid rounded-circle"
					/>
					{loading ? (
						<Spinner
							animation="border"
							variant="light position-absolute"
							style={{
								width: "25px",
								height: "25px",
								marginTop: "3.6rem",
								marginLeft: "4.3rem",
							}}
						/>
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

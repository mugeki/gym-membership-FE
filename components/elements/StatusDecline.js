import CustomModal from "./CustomModal";
import styles from "../../styles/ModalAcc.module.css";
import stylesReceipt from "../../styles/Payment.module.css";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { app } from "../../firebase/firebase";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import axios from "axios";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";

export default function StatusDecline({ entries, type }) {
	const router = useRouter();
	const id = router.query.id;
	const hiddenFileInput = useRef(null);
	const [urlReceipt, setUrlReceipt] = useState();
	const [modalSuccess, setModalSuccess] = useState(false);
	const handleChange = (event) => {
		if (event.target.files && event.target.files[0] && app) {
			const i = event.target.files[0];
			const storageRef = getStorage();
			const fileRef = ref(storageRef, i.name);
			const compressionOption = {
				maxWidthOrHeight: 528,
				useWebWorker: true,
			};
			imageCompression(i, compressionOption).then((compressedFile) => {
				uploadBytes(fileRef, compressedFile).then(() => {
					getDownloadURL(fileRef).then((url) => {
						setUrlReceipt(url);
						console.log("url=====", url);
					});
				});
			});
		}
	};
	const handleClick = (event) => {
		hiddenFileInput.current.click();
	};
	const handleSubmit = () => {
		const API_URL = process.env.BE_API_URL_LOCAL;
		const endpointSubmit = () => {
			if (type == "class") {
				return `transaction-class/update-receipt/${id}`;
			} else if (type == "membership") {
				return `transaction-membership/update-receipt/${id}`;
			}
		};
		console.log(`endpoint : ${API_URL}/${endpointSubmit()}`);
		axios
			.put(
				`${API_URL}/${endpointSubmit()}`,
				{
					url_image_of_receipt: urlReceipt,
				},
				generateAxiosConfig()
			)
			.then((res) => {
				setModalSuccess(true);
				console.log(res, "response insert transaction");
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					console.log(error);
				}
			});
	};

	return (
		<>
			<div className="d-flex flex-column bg-body rounded align-items-center mb-4">
				<div
					className={`p-3 shadow-lg rounded-3 d-flex flex-column col-10  align-items-start mt-6 mb-3`}
				>
					<p className="text-primary fw-bold fs-4 m-0">Hi!</p>
					<p className="m-0 text-primary fw-bold mb-3">
						Sorry, your payment was declined.
					</p>
					<p className="m-0 p-0">There is possibility why : </p>
					<ol className="m-0 p-0">
						<li>your receipt photo blured</li>
						<li>your card/payment information is incorrect</li>
						<li>your payment detail unreadable</li>
						<li>wrong nominal transfer</li>
					</ol>
					<div>
						<p>
							If you think you sure there is nothing wrong with your receipt,
							please
							<a
								className="text-link"
								href="mailto:alta2@gymmembership.com?subject=I Have Problen with my Receipt"
							>
								{" "}
								contact us at email{" "}
							</a>
							Or re-upload your receipt in this following steps :
						</p>
						<p className="fw-bold m-0 mt-4">Reupload Receipt</p>
						<p>please upload an image of receipt</p>
						<div
							className={`card shadow p-4 d-flex flex-column align-items-center container-fluid p-1 ${styles.containerUpload}`}
						>
							{urlReceipt ? (
								<div className="d-flex justify-self-end me-auto">
									<Image
										src={urlReceipt}
										layout="fill"
										objectFit="cover"
										alt="class"
										class={`${stylesReceipt.receipt}`}
									/>
									<button
										onClick={handleClick}
										className={`${styles.icon} p-1 m-0 btn align-self-end d-flex flex-column align-items-center`}
									>
										<input
											type="file"
											ref={hiddenFileInput}
											onChange={handleChange}
											accept="image/*"
											style={{ display: "none" }}
										/>
										<Icon
											icon="fluent:folder-swap-16-filled"
											color="rgba(255,255,255)"
											width="30"
											height="30"
										/>
									</button>
								</div>
							) : (
								<div className="d-flex flex-column m-5 align-items-center">
									<Icon
										onClick={handleClick}
										icon="bi:upload"
										color="#a5acb8"
										width="100"
										height="100"
										className="btn"
									/>
									<input
										type="file"
										ref={hiddenFileInput}
										onChange={handleChange}
										accept="image/*"
										style={{ display: "none" }}
									/>
									<p className={` text-primary`}>Upload here</p>
								</div>
							)}
						</div>
						<Button className={`col-12 btn mt-3 mb-3`} onClick={handleSubmit}>
							Submit reupload
						</Button>
						<CustomModal
							show={modalSuccess}
							onHide={() => setModalSuccess(false)}
							title="Success to Upload Receipt"
							message="Your payment will be check and confirmed in very soon."
							hrefTo="/profile/transactions"
							messageHref="back to"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

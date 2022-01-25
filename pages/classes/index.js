import axios from "axios";
import ClassItem from "../../components/elements/ClassItemOnline";
import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/ClassItem.module.css";
import { useEffect } from "react";

export default function Classes({ data, error }) {

	return (
		<Layout>
			<div className={"container p-4 mb-5"}>
				<div className="d-flex flex-column justify-content-center ">
					<h4 className="text-start fw-bolder">Classes</h4>
					<div className="d-flex flex-row justify-content-between mt-4">
						<p className="fw-bolder">Online Categories</p>
						<a  
						className= {`${styles.link}`}
						href="/classes/online"
						>See All</a>
					</div>
					<a href="/classes/online">
						<div className={`${styles.item} bg-dark position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
							<Image
								src="https://images.unsplash.com/photo-1592967547619-491e36f79e7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
								layout="fill"
								objectFit="cover"
								alt="class"
								className="rounded-3"
							/>
							<p className= {`${styles.overlay}  ms-3 text-start fs-6 text-capitalize`}>
								Yoga Class for Beginner : Training Yoga from Your Own Room
							</p>
						</div>
					</a>
					
					<div className="d-flex flex-row justify-content-between mt-4">
						<p className="fw-bolder">Offline Categories</p>
						<a  
						className= {`${styles.link}`}
						href="/classes/offline"
						>See All</a>
					</div>
					<a href="/classes/offline">
						<div className={`${styles.item} position-relative d-flex align-items-end text-white text-center rounded-3 mb-3`}>
							<Image
								src="https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
								layout="fill"
								objectFit="cover"
								alt="class"
								className="rounded-3"
							/>
							<p className= {`${styles.overlay}  ms-3 text-start fs-6 text-capitalize`}>
								Power Lifting : Power Lifting with personal trainer for Beginner 
							</p>
						</div>
					</a>
				</div>
			</div>
		</Layout>
	);
}
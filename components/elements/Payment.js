import styles from "../../styles/Payment.module.css";
import TimeoutModal from "./TimeoutModal"
import CustomModal from "./CustomModal"
import PaymentItem from "./PaymentItem";
import {useState, useRef,useEffect} from 'react'
import { Icon } from '@iconify/react';
import Image from "next/image";
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import { useSelector } from "react-redux";
import axios from "axios";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";
import { app } from "../../firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import ModalTimeout from "./ModalTimeout";

export default function Payment({ id,entries, type }){
    const hiddenFileInput = useRef(null);
    const [urlImage, setUrlImage]=useState()
    const handleChange = event => {
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
                getDownloadURL(fileRef)
                    .then((url) => {
                        setUrlImage(url)
                        console.log("url image=====", url)
                    })
            });
        });

        }
    };  
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
	const handleSubmit=()=>{
		const API_URL = process.env.BE_API_URL_LOCAL;
        const endpointSubmit =()=>{
            if (type=="class"){
                return `transaction-class/update-receipt/${id}`
            }else if (type=="membership"){
                return `transaction-membership/update-receipt/${id}`
            }
        }
        console.log(`endpoint : ${API_URL}/${endpointSubmit()}`)
		axios
			.put(
				`${API_URL}/${endpointSubmit()}`,
				{
					"url_image_of_receipt" :urlImage,
				},
				generateAxiosConfig()
			)
			.then((res)=>{
				setModalSuccess(true)
				console.log(res, "response insert transaction")
			})
			.catch((error) => {
				if (error.response) {
					handleUnauthorized(error.response);
					console.log(error);
				}
			});
	}

	const handleTimeout=()=>{
        console.log("cekkkk===")
            setUpdateFailed(updateFailed+1)
            const API_URL = process.env.BE_API_URL_LOCAL;
            const endpointSubmit =()=>{
                if (type=="class"){
                    return `transaction-class/status-to-failed/${id}`
                }else if (type=="membership"){
                    return `transaction-membership/status-to-failed/${id}`
                }
            }
            axios
                .put(
                    `${API_URL}/${endpointSubmit()}`,
                    {
                        "status" :"failed",
                    },
                    generateAxiosConfig()
                )
                .then((res)=>{
                    console.log(res, "response update status transaction")
                })
                .catch((error) => {
                    if (error.response) {
                        handleUnauthorized(error.response);
                        console.log(error);
                    }
                });

	}
    const [modalTimeout, setModalTimeout]=useState(true)
    const [modalSuccess, setModalSuccess]=useState(false)
    const [updateFailed, setUpdateFailed]=useState(0)
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if (updateFailed==0){
                handleTimeout()
            }
            // return <TimeoutModal  show={modalTimeout} onHide={() => setModalTimeout(false)} />
            return <ModalTimeout/>
        } else {
            return (
            <div className={`align-self-center mt-3 ${styles.countdown} rounded-3 `}>
                <p className="fs-6 fw-bold m-0 p-1 rounded-3 bg-danger" >{hours} hours : {minutes} minutes : {seconds}</p>
            </div>
            )
        }
    };
    const date=()=>{
        const dateUpdated = new Date(Date.parse(entries?.updated_at))
        dateUpdated.setHours(dateUpdated.getHours() + 24)
        const parseTimezone=dateUpdated.toISOString()
        const newDate = new Date(parseTimezone)
        return newDate
    }
    return (
        <>  
            <div className="mb-4 d-flex flex-column">
                <table>
                    <tr>
                        <td>ID Transaksi</td>
                        <td>{`: ${entries?.id}`}</td>
                    </tr>
                    <tr>
                        <td>Product</td>
                        <td>{`: ${entries?.product_name}`}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{`: Rp ${entries?.nominal?.toLocaleString().replace(/,/g, ".")}`}</td>
                    </tr>
                </table>
                <Countdown
                date={date()}
                renderer={renderer}
                />
            </div>
            {/* <PaymentAccount/> */}
            <div className="d-flex flex-row justify-content-between ">
                <PaymentItem entries={entries?.payment} idActive={entries?.payment?.id} />
            </div>
            <div className={`card p-3 rounded-3 ${styles.bgGrey}`}>
                <p className="fw-bold mb-0">Transfer to</p>
                <p className="mb-0">{entries?.payment?.owner_name}</p>
                <p className="">{`${entries?.payment?.no_card} (a/n ${entries?.payment?.owner_name})`}</p>
                <p className="fw-bold mb-0">Description</p>
                <p className="">{entries?.payment?.desc}</p>
            </div>
            <p className="fw-bold m-0 mt-4">Upload Receipt</p>
            <p>please upload an image of receipt</p>
            <div className={`card shadow p-4 d-flex flex-column align-items-center container-fluid p-1 ${styles.containerUpload}`}>
                {urlImage?
                // <p>{urlImage}</p>
                <div className="d-flex justify-self-end me-auto">
                <Image
                    src= {urlImage}
                    layout="fill"
                    objectFit="cover"
                    alt="class"
                    class={`${styles.receipt}`}
                />
                <button onClick={handleClick}  className={`${styles.icon} p-1 m-0 btn align-self-end d-flex flex-column align-items-center`}>
                    <input type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: 'none' }} />
                    <Icon 
                    icon="fluent:folder-swap-16-filled" color="rgba(255,255,255)" 
                    width="30" height="30" 
                    />
                </button>
                </div>
                :
                <div className="d-flex flex-column m-5 align-items-center">
                    <Icon onClick={handleClick} icon="bi:upload" color="#a5acb8" width="100" height="100" className="btn" />
                    <input type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        accept="image/*"
                        style={{ display: 'none' }} />
                    <p className={` text-primary`} >upload here</p>
                </div>
                }
            </div>
            <button className={`col-12 btn ${styles.button} mt-3`} onClick={handleSubmit}>submit</button>
            {/* {modalShow ?<TimeoutModal hide/>:null} */}
            <CustomModal 
                show={modalSuccess} onHide={() => setModalSuccess(false)} 
                title="Success to Upload Receipt"
                message="Your payment will be check and confirmed in very soon." 
                hrefTo="/profile/transactions"
                messageHref="back to"
            />
            
        </>
    );
}
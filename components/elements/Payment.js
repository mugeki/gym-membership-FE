import styles from "../../styles/Payment.module.css";
import TimeoutModal from "./TimeoutModal"
import PaymentItem from "./PaymentItem";
import {useState, useRef,useEffect} from 'react'
import { Icon } from '@iconify/react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import { useSelector } from "react-redux";
import axios from "axios";
import { generateAxiosConfig, handleUnauthorized } from "../../utils/helper";

export default function Payment({ entries }){
    console.log(entries, "entriess at class")
    const hiddenFileInput = useRef(null);
    const handleChange = event => {
        if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        const body = new FormData();
        body.append("image", i);
        }
    };  
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const [modalShow, setModalShow]=useState(false)

    const Completionist = () => setModalShow(true);
    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return (
        <div className={`align-self-center mt-3 ${styles.countdown} rounded-3 `}>
            <p className="fs-6 fw-bold m-0 p-1 rounded-3 bg-danger" >{hours} hours : {minutes} minutes : {seconds}</p>
        </div>
        )
    }
    };
    const date=()=>{
        const dateUpdated = (new Date(entries?.updated_at))
        const newDate = new Date(dateUpdated.getTime() + 86400000)
        return dateUpdated.setDate(newDate.getDate() + 1);
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
                date={date}
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
            <div className="card shadow p-4 d-flex flex-column align-items-center">
                <Icon onClick={handleClick} icon="bi:upload" color="#a5acb8" width="100" height="100" className="btn" />
                <input type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}

                  accept="image/*"
                  style={{ display: 'none' }} />
                <a className={` col-4 btn text-primary`} >upload here</a>
            </div>
            <button className={`col-12 btn ${styles.button} mt-3`}>submit</button>
            {modalShow ?
            <TimeoutModal/>:
            null}
        </>
    );
}
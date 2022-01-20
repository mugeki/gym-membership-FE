import styles from "../../styles/Payment.module.css";
import PaymentAccount from "./PaymentAccount";
import {useState, useRef} from 'react'
import { Icon } from '@iconify/react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

export default function Payment({paymentData}){
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

    const Completionist = () => <span>Sorry, Time Out Payment! please re-order</span>;
    const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        return <Completionist />;
    } else {
        return (
        <div className={`align-self-center mt-3 ${styles.countdown} p-1 rounded-3`}>
            <p className="fs-6 fw-bold m-0 p-0" >{hours} hours : {minutes} minutes : {seconds}</p>
        </div>
        )
    }
    };
    var date = new Date("2022-01-14 13:52:59.413");
    date.setDate(date.getDate() + 1);
    return(
        <>  
            <div className="mb-4 d-flex flex-column">
                <table>
                    <tr>
                        <td>ID Transaksi</td>
                        <td>#24442-jddfjs-6</td>
                    </tr>
                    <tr>
                        <td>Product</td>
                        <td>: 1 week workout program</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>: Rp 250.000</td>
                    </tr>
                </table>
                <Countdown
                date={date}
                renderer={renderer}
                />
            </div>
            <PaymentAccount/>
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
        </>
    )

}
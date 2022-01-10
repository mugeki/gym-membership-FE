import { Icon } from "@iconify/react";
import styles from "../../styles/ClassItem.module.css";
import React, { useState } from 'react';

export default function PaymentItem({ entries, setIdActive}) {
    const changeDetail=()=>{
        setIdActive(entries.id);
    }
	return (
        <div>
            <div className={`${styles.paymentItem} btn  border shadow p-2 mb-5 bg-body rounded`} onClick={changeDetail}>
                <Icon  icon="fluent:payment-16-filled" color="#727f96" width="25" />
                <p className="fw-bold fs-6">{entries.name}</p>
            </div>
        </div>

        
	);
}
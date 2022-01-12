import { Icon } from "@iconify/react";
import styles from "../../styles/ClassItem.module.css";
import React, { useState } from 'react';

export default function PaymentItem({ entries,idActive, setIdActive}) {
    const changeDetail=()=>{
        setIdActive(entries.id);
    }
    const active=`${styles.paymentItem} ${styles.bgGrey}  btn  border shadow p-2 mb-2 bg-body rounded`
    const nonActive=`${styles.paymentItem} btn  border shadow p-2 mb-2 bg-body rounded`
	return (
        <div className={entries.id==idActive?active:nonActive} onClick={changeDetail}>
            <Icon  icon="fluent:payment-16-filled" color="#727f96" width="25" />
            <p className="fw-bold fs-6">{entries.name}</p>
        </div>
	);
}
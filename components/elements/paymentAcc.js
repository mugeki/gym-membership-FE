import { Icon } from "@iconify/react";
import styles from "../../styles/ClassItem.module.css";

export default function PaymentAccepted({message}) {
	return (
        <div>
            <div className={``} onClick={changeDetail}>
                <Icon icon="la:check-circle" color="#69ba5b" width="32" height="32" />
                <p className="fw-bold fs-6">{message}</p>
            </div>
        </div>

        
	);
}
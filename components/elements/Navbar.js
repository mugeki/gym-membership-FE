import { Icon } from '@iconify/react';
import styles from '../../styles/Navbar.module.css'
import Link from 'next/link'




export default function Navbar () {
    return (
    <div className={styles.container}>
        <Link href="/"className={styles.navLink}>
            <div>
            <Icon  icon="ant-design:home-filled" width="20" height="20" />
            <p >Home</p>
            </div>
        </Link>

        <div className={styles.navLink}>
        <Icon icon="eva:clock-fill" width="20" height="20" />
        <p >Classes</p>
        </div>

     <Link href="/newsletter"className={styles.navLink}>
         <div>
        <Icon icon="ant-design:play-circle-filled" width="20" height="20" />
        <p >Videos</p>
        </div>
        </Link>

        <div className={styles.navLink}>
        <Icon icon="bx:bxs-news" width="20" height="20" />
        <p >Newsletter</p>
        </div>

        <div className={styles.navLink}>
        <Icon icon="vs:profile" width="20" height="20" />
        <p>Profile</p>
        </div>
    </div>
    )
    
} 
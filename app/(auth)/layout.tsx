import React from 'react'
import styles from './auth.module.css'
import Image from 'next/image';
import { appImages } from '../assets/images/images';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.content}>
                    <h3>InciDial</h3>
                    <p>Manage reported incidents </p>
                </div>
            </div>
            <div className={styles.childrenContainer}>
                <Image src={appImages.logoImage} alt='logo' className={styles.logoImg} />
                {children}
            </div>
        </div>
    )
}

export default Layout;
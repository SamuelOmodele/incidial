import React from 'react'
import styles from './auth.module.css'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.content}>
                    <h3>InciDial</h3>
                    <p>Manage all incident reports </p>
                </div>
            </div>
            <div className={styles.childrenContainer}>
                {children}
            </div>
        </div>
    )
}

export default Layout;
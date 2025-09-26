import React from 'react'
import Sidebar from '../components/sidebar/sidebar';
import styles from './admin.module.css'
import Navbar from '../components/navbar/navbar';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebarContainer}>
                <Sidebar />
            </div>
            <div className={styles.childrenContainer}>
                <Navbar />
                <div className={styles.childrenContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
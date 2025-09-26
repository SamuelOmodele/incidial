import React from 'react'
import styles from './navbar.module.css'
import { appIcons } from '@/app/assets/icons/icons'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.inputBox}>
                <input type="search" placeholder='Search here . . .' />
                <appIcons.searchIcon size={22} className={styles.icon} />
            </div>

            <button>Export</button>
        </div>
    )
}

export default Navbar
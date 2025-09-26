'use client'
import React from 'react'
import styles from './sidebar.module.css'
import { appIcons } from '@/app/assets/icons/icons'

import { usePathname, useRouter } from 'next/navigation'

const Sidebar = () => {

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        InciDial
      </div>

      <div className={styles.profileContainer}>
        <appIcons.userIcon size={78} style={{ color: '#777' }} />
        <h3>John Doe</h3>
        <p>johndoe123@gmail.com</p>
      </div>

      <ul>
        <li className={(pathname === '/admin' || pathname === '/admin/') ? styles.active : ''} onClick={() => router.push('/admin')}><appIcons.dashboardIcon size={22} /> Dashboard</li>
        <li className={(pathname === '/admin/reports' || pathname === '/admin/reports/') ? styles.active : ''} onClick={() => router.push('/admin/reports')}><appIcons.documentIcon size={22} /> Reports</li>
        <hr color='#cac9d9' />
        <li className={styles.logout}><appIcons.logoutIcon size={22} /> Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar
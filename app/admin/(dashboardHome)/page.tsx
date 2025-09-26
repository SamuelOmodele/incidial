'use client'
import React from 'react';
import styles from './home.module.css';
import { appIcons } from '@/app/assets/icons/icons';
import { useRouter } from 'next/navigation';


const reportHistory = [
  { id: 1, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 2, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 3, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 4, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 5, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 6, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 7, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 8, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
]

const Home = () => {

  const router = useRouter();

  return (

    <div className={styles.page}>
      <h3>Welcome, Admin</h3>

      {/* --- CARD GRID SECTION ---  */}
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h4>Total Reports</h4>
          <h2>100</h2>
          <p>view report</p>
          <appIcons.documentIcon className={styles.cardIcon} />
        </div>
        <div className={styles.card}>
          <h4>This month</h4>
          <h2>50</h2>
          <p>view report</p>
          <appIcons.monthIcon className={styles.cardIcon} />
        </div>
        <div className={styles.card}>
          <h4>Today</h4>
          <h2>50</h2>
          <p>view report</p>
          <appIcons.todayIcon className={styles.cardIcon} />
        </div>
      </div>

      {/* --- REPORT HISTORY SECTION --- */}
      <div className={styles.reportHistory}>
        <div className={styles.header}>
          <h3>Report History</h3>
          <span onClick={() => router.push('/admin/reports')}>view all</span>
        </div>
        <table>
          <thead>
            <tr className={styles.head}>
              <th>Id</th>
              <th>Category</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {reportHistory.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.category}</td>
                <td>{report.description}</td>
                <td>{report.severity}</td>
                <td>{report.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
'use client';
import React, { useState, useContext } from 'react';
import styles from './home.module.css';
import { appIcons } from '@/app/assets/icons/icons';
import { useRouter } from 'next/navigation';
import IncidentModal from '@/app/components/incidentModal/incidentModal';
import { UserContext } from '@/app/components/protectedRoute/protectedRoute'; // 👈 import context

const reportHistory = [
  { id: 1, category: 'Theft', description: 'Thieves broke into a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 2, category: 'Burglary', description: 'A store was broken into overnight', severity: 'Medium', location: 'Ojoo' },
  { id: 3, category: 'Vandalism', description: 'Property damage reported', severity: 'Low', location: 'Bodija' },
  { id: 4, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 5, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 6, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 7, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
  { id: 8, category: 'Theft', description: 'Theves broke in a house and stole valuables', severity: 'High', location: 'Agbowo' },
];

const Home = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  // 👇 Access user context
  const user = useContext(UserContext);

  const handleOpen = (incident: any) => {
    setOpen(true);
    setSelectedIncident(incident);

  };
  const handleClose = () => {
    setOpen(false);
    setSelectedIncident(null);
  };

  return (
    <div className={styles.page}>
      <h3>
        Welcome, Admin
      </h3>

      {/* --- CARD GRID SECTION --- */}
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <h4>Total Reports</h4>
          <h2>{user?.stats?.total_reports_count}</h2>
          <p>view report</p>
          <appIcons.documentIcon className={styles.cardIcon} />
        </div>
        <div className={styles.card}>
          <h4>This Month</h4>
          <h2>{user?.stats?.this_month_count}</h2>
          <p>view report</p>
          <appIcons.monthIcon className={styles.cardIcon} />
        </div>
        <div className={styles.card}>
          <h4>Today</h4>
          <h2>{user?.stats?.today_count}</h2>
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
            {(user?.report_history ?? reportHistory).map((report: any) => (
              <tr key={report.id} onClick={() => handleOpen(report)}>
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

      {/* --- INCIDENT MODAL --- */}
      <IncidentModal selectedIncident={selectedIncident} open={open} handleClose={handleClose} />
    </div>
  );
};

export default Home;

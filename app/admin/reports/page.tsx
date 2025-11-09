'use client';
import React, { useState, useEffect } from 'react';
import styles from './reports.module.css';
import { appIcons } from '@/app/assets/icons/icons';
import IncidentModal from '@/app/components/incidentModal/incidentModal';

type reportType = {
  id: number,
  category: string,
  description: string,
  severity: string,
  location: string,
  date: string,
} | null

const ReportsPage = () => {
  const [reports, setReports] = useState<reportType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<reportType>(null);

  const handleOpen = (report: reportType) => {
    setSelectedReport(report);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReport(null);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const token = localStorage.getItem('accessToken');

        if (!token) throw new Error('No access token found');

        const res = await fetch(`${baseUrl}/api/reports`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch reports: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setReports(data.report_history || []); // Adjust if your API returns differently
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Something went wrong while fetching reports');
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: '#4B5563',
        }}
      >
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#EF4444', marginBottom: '1rem' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.reportHistory}>
      <div className={styles.header}>
        <h3>Report History</h3>

        <div className={styles.selectContainer}>
          <div>
            <appIcons.dropdownIcon className={styles.icon} size={24} />
            <select name="severity" id="severity">
              <option value="all">All severity</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
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
          {reports.length > 0 ? (
            reports.map((report: reportType) => (
              <tr key={report?.id} onClick={() => handleOpen(report)}>
                <td>{report?.id}</td>
                <td>{report?.category}</td>
                <td>{report?.description}</td>
                <td>{report?.severity}</td>
                <td>{report?.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>
                No reports found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <IncidentModal open={open} handleClose={handleClose} selectedIncident={selectedReport} />
    </div>
  );
};

export default ReportsPage;

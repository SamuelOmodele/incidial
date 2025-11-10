'use client';
import React, { useState, useEffect } from 'react';
import styles from './reports.module.css';
import { appIcons } from '@/app/assets/icons/icons';
import IncidentModal from '@/app/components/incidentModal/incidentModal';
import Spinner from '@/app/components/spinner/spinner';

type reportType = {
  id: number;
  category: string;
  description: string;
  severity: string;
  location: string;
  date: string;
} | null;

const ReportsPage = () => {
  const [reports, setReports] = useState<reportType[]>([]);
  const [filteredReports, setFilteredReports] = useState<reportType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === 'all') {
      setFilteredReports(reports);
    } else {
      const filtered = reports.filter(
        (r) => r?.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredReports(filtered);
    }
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
        console.log('Fetched reports:', data);

        const fetchedReports = data.report_history || [];
        setReports(fetchedReports);
        setFilteredReports(fetchedReports);
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

      <div style={{ display: 'flex', height: '70dvh', width: '100%', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
        <Spinner color='#208971' size='24px' />
        Loading reports . . .
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

  // ✅ Extract unique categories for dropdown
  const uniqueCategories = Array.from(
    new Set(reports.map((r) => r?.category))
  ).filter(Boolean);

  return (
    <div className={styles.reportHistory}>
      <div className={styles.header}>
        <h3>Report History</h3>

        <div className={styles.selectContainer}>
          <div>
            <appIcons.dropdownIcon className={styles.icon} size={24} />
            <select
              name="category"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All categories</option>
              {uniqueCategories.map((category, idx) => (
                <option key={idx} value={category || ''}>
                  {category}
                </option>
              ))}
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
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
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

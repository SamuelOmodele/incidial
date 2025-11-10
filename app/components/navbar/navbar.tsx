'use client';
import React, { useState } from 'react';
import styles from './navbar.module.css';
import { appIcons } from '@/app/assets/icons/icons';
import Spinner from '../spinner/spinner';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleExport = async () => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const token = localStorage.getItem('accessToken');

      if (!token) {
        throw new Error('No access token found. Please log in again.');
      }

      const res = await fetch(`${baseUrl}/api/export`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Export failed: ${res.status}`);
      }

      // Convert response to a Blob (binary data)
      const blob = await res.blob();

      // Create a temporary URL for the file
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.xlsx'; // You can change this filename
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log('Export successful — file downloaded.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error exporting:', err.message || err);
      } else {
        console.error('Error exporting:', err);
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={styles.navbar}>

      <div className={styles.inputBox} onClick={() => router.push('/admin/reports')}>
        <input type="search" placeholder="Search here . . ." disabled={pathname === '/admin/reports'} />
        <appIcons.searchIcon size={22} className={styles.icon} />
      </div>

      <button onClick={handleExport}>{loading ?
        <Spinner size='18px' />
        :
        'Export'}
      </button>
    </div>
  );
};

export default Navbar;

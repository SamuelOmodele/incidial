'use client';
import React from 'react';
import styles from './navbar.module.css';
import { appIcons } from '@/app/assets/icons/icons';

const Navbar = () => {

  const handleExport = async () => {
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
      
    }
  };


  return (
    <div className={styles.navbar}>
      <div className={styles.inputBox}>
        <input type="search" placeholder="Search here . . ." />
        <appIcons.searchIcon size={22} className={styles.icon} />
      </div>

      <button onClick={handleExport}>Export</button>
    </div>
  );
};

export default Navbar;

'use client';
import React, { useContext } from 'react';
import Sidebar from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import ProtectedRoute, { UserContext } from '../components/protectedRoute/protectedRoute';
import styles from './admin.module.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <ProtectedContent>{children}</ProtectedContent>
    </ProtectedRoute>
  );
};

const ProtectedContent = ({ children }: { children: React.ReactNode }) => {
  const user = useContext(UserContext);

  return (
    <div className={styles.container}>
      <p className={styles.notCompatible}>Device not compatible. Please use a desktop device to view dashboard</p>
      <div className={styles.sidebarContainer}>
        <Sidebar
          firstName={user?.admin?.first_name}
          lastName={user?.admin?.last_name}
          email={user?.admin?.email}
        />
      </div>
      <div className={styles.childrenContainer}>
        <Navbar />
        <div className={styles.childrenContent}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

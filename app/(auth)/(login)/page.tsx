'use client';
import React, { useState } from 'react';
import styles from './login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/spinner/spinner';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { msg } = await res.json();
        setError(msg || 'Login failed');
        console.log('error is here');
        return;
      }

      const data = await res.json();
      console.log(data);

      // You can store tokens or user info here if needed
      localStorage.setItem('accessToken', data.access_token);

      router.push('/admin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <p>Sign in to your account below</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email . . ."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password . . ."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <Spinner /> Logging in...
            </div>
            : 'Login'}
        </button>

        <p className={styles.accountText}>
          Don&apos;t have an account?{' '}
          <span>
            <Link href="/signup">click here</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;


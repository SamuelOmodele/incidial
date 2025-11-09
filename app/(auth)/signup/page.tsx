'use client';
import React, { useEffect, useState } from 'react';
import styles from './signup.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => router.push('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password,
        }),
      });

      if (!res.ok) {
        const { msg } = await res.json();
        throw new Error(msg || 'Signup failed');
      }

      const data = await res.json();

      // Example: if API returns token or user info
      // localStorage.setItem('token', data.token);

      // alert('Account created successfully!');
      setSuccess('Account created successfully! Please proceed to login');

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
      <h2>Create Account!</h2>
      <p>Fill in your information below.</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Your first name . . ."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Your last name . . ."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

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
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account . . .' : 'Create Account'}
        </button>

        <p className={styles.accountText}>
          Already have an account?{' '}
          <span>
            <Link href="/">login here</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;



// import React from 'react'
// import styles from './signup.module.css'
// import Link from 'next/link';

// const Signup = () => {

//     return (
//         <div className={styles.container}>
//             <h2>Create Account!</h2>
//             <p>Fill in your information below.</p>
//             <form action="">
//                 <div className={styles.formGroup}>
//                     <label htmlFor="firstName">First Name</label>
//                     <input type="text" id='firstName' name='firstName' placeholder='Your first name . . .' />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="lastName">Last Name</label>
//                     <input type="text" id='lastName' name='lastName' placeholder='Your last name . . .' />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="email">Email</label>
//                     <input type="email" id='email' name='email' placeholder='Your email . . .' />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="password">Password</label>
//                     <input type="password" id='password' name='password' placeholder='Your password . . .' />
//                 </div>
//                 <button>Create Account</button>
//                 <p className={styles.accountText}>
//                     Already have an account?
//                     <span>
//                         <Link href={'/'}>click here</Link>
//                     </span>
//                 </p>
//             </form>
//         </div>
//     )
// }

// export default Signup;
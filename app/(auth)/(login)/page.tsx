'use client'
import React from 'react'
import styles from './login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/admin');
    }

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <p>Sign in to your account below</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='Your email . . .' />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Your password . . .' />
                </div>
                <button>Login</button>
                <p className={styles.accountText}>
                    Don&apos;t have an account?
                    <span>
                        <Link href={'/signup'}>click here</Link>
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login
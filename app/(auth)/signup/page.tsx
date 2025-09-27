import React from 'react'
import styles from './signup.module.css'
import Link from 'next/link';

const Signup = () => {

    return (
        <div className={styles.container}>
            <h2>Create Account!</h2>
            <form action="">
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id='firstName' name='firstName' placeholder='Your first name . . .' />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id='lastName' name='lastName' placeholder='Your last name . . .' />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' placeholder='Your email . . .' />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Your password . . .' />
                </div>
                <button>Create Account</button>
                <p className={styles.accountText}>
                    Already have an account?
                    <span>
                        <Link href={'/'}>click here</Link>
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Signup;
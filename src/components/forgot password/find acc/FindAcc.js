import React from 'react'
import styles from './FindAcc.module.css'
import { Link } from 'react-router-dom'
function FindAcc() {
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>Forgot Password?</h1>
                <p>input your email or phone no to reset password</p>
                <div className={styles.ifield}>
                    <input type="text" placeholder='Email' />
                    <p>or</p>
                    <input type="text" placeholder='Phone number' />
                    <Link to={'/otp'} className={styles.resetBtn}>Reset</Link>
                </div>
            </div>
        </div>
    )
}

export default FindAcc

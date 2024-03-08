import React, { useEffect, useRef, useState } from 'react'
import styles from './SetPassword.module.css'

function SetPassword() {
    const [inputData, setInputData] = useState({})
    function handleInputData(e) {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }
    function validatePass() {
        if (inputData.pass == '' || inputData.confirmPass == '') {
            alert("Please enter your new password")
        } else if (inputData.confirmPass == inputData.pass) {
            alert("Password Changed succesfully")
        } else {
            alert("passwrod do not match")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>Reset Password</h1>
                <p>Please enter and confirm your new password</p>
                <div className={styles.ifield}>
                    <input name='pass' type="password" placeholder='Set New password' onChange={handleInputData} />
                    <input name='confirmPass' type="password" placeholder='Confirm password' onChange={handleInputData} />
                    <div className={styles.resetBtn} onClick={validatePass}>Reset Password</div>
                </div>
            </div>
        </div>
    )
}

export default SetPassword

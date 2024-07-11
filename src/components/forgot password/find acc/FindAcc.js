import React, { useState } from 'react'
import styles from './FindAcc.module.css'
import { Link ,useNavigate} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function FindAcc() {

    const [email,setemail]=useState("");
    const navigate = useNavigate();
    const handleResetPassword = () => {
        if (!email) {
          notifyWarning('Please provide your email address');
        }
        else
        {
            navigate('/otp', { state: { email: email } });
        }
      };


    const notifyWarning = (msg) => {
        toast.warning(` ${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Warning'
        });
    }
      
    return (
        <div className='d'>
                <div className={styles.container}>
                    <div className={styles.contentContainer}>
                        <h1>Forgot Password</h1>
                        <p>Provide your registered email address</p>
                        <div className={styles.ifield}>
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        
                        /> 
                        <div className={styles.resetBtn} onClick={handleResetPassword}>
                        Reset Password
                        </div>
                            
                    
                        </div>
                    </div>
                    
                    <ToastContainer containerId="Warning" />
                    </div>
        </div>
        
    )
}

export default FindAcc

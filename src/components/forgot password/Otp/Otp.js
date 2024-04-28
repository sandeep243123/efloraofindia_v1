import React, { useEffect, useRef,useState } from 'react'
import styles from './Otp.module.css'
import { ToastContainer, toast } from 'react-toastify';

import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import 'react-toastify/dist/ReactToastify.css';
import { Link,useLocation, useNavigate } from 'react-router-dom';

function Otp() {
    const inputRef = useRef()
    const location = useLocation();
    const {email} = location.state|| {};
    console.log(email)
    const navigate = useNavigate();

    
    const notifyWarning = (msg) => {
        toast.warning(` ${msg}!`, {
            position: "bottom-right",
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


    useQuery(gql`
    query Query($details: sendOTPDetail!) {
        sendOTP(details: $details)
      }
`, {
        onCompleted: (data) => {
            console.log("otp sucessfully send")
        },
        variables: {details: {
            "emailID": email,
            "isNew": false
          }},

        onError: (error) => {
            console.error('Error:', error.message);

        }
    });


    
    const resetpasswordmutation = gql`
    mutation ForgetPassword($details: forgetPasswordDetail!) {
        forgetPassword(details: $details)
      }
`
const [resetpasswordfunction] =
    useMutation(resetpasswordmutation, {
        onCompleted: (data) => {
            alert(data.forgetPassword);

            navigate('/login');
        },
        onError: (error) => {
            console.error('Error:', error.message);

        }
    })

    
        const [inputData, setInputData] = useState({})
        function handleInputData(e) {
            setInputData({
                ...inputData,
                [e.target.name]: e.target.value
            })
        }
    
        function validatePass() {
            if (inputData.pass == '' || inputData.confirmPass == '') {
                toast("Please enter your new password")
            } else if (inputData.confirmPass == inputData.pass) {
                
                resetpasswordfunction({variables: {details: {
                    "emailID": email,
                    "newPassword": inputData.pass,
                    "otp": parseInt(otp)
                }}})
            } else {
                toast("passwrod do not match")
            }
        }
    
        const [otp, setOTP] = useState('');

          
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>Reset Password</h1>
                <p>Enter the OTP and reset your password</p>
                <div className={styles.ifield}>
                <input type="text" id="otp" placeholder="otp" value={otp}
                   onChange={(e) => {
                        const input = e.target.value;
                        if (/^\d{0,4}$/.test(input)) {
                            setOTP(input);
                        }
                        }}
                        maxLength={4} // Limit the input to 4 characters
                        pattern="\d*" // Only allow numeric input
                        required/>
                        
                        <input name='pass' type="password" placeholder='Set New password' onChange={handleInputData} />
                                
                        <input name='confirmPass' type="password" placeholder='Confirm password' onChange={handleInputData} />
                        
                    <div className={styles.resetBtn} onClick={validatePass}>Reset Password</div>
                </div>
                
            </div>
            <ToastContainer containerId="Error" />
        </div>
    )}

export default Otp;

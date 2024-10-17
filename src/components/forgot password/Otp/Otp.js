import React, { useRef, useState, useEffect } from 'react';
import styles from './Otp.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useQuery, gql, useMutation } from "@apollo/client";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Otp() {
    const inputRef = useRef();
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [otp, setOTP] = useState('');
    const [inputData, setInputData] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false); // State for "Set New Password"
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for "Confirm Password"

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
    };

    const SEND_OTP_QUERY = gql`
        query Query($details: sendOTPDetail!) {
            sendOTP(details: $details)
        }
    `;

    const RESET_PASSWORD_MUTATION = gql`
        mutation ForgetPassword($details: forgetPasswordDetail!) {
            forgetPassword(details: $details)
        }
    `;

    const [resetPasswordFunction] = useMutation(RESET_PASSWORD_MUTATION, {
        onCompleted: (data) => {
            navigate('/login');
        },
        onError: (error) => {
            notifyWarning(error.message);
        }
    });

    const handleInputData = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };

    const validatePass = () => {
        if (inputData.pass === '' || inputData.confirmPass === '') {
            notifyWarning("Please enter your new password");
        } else if (inputData.confirmPass === inputData.pass) {
            resetPasswordFunction({
                variables: {
                    details: {
                        "emailID": email,
                        "newPassword": inputData.pass,
                        "otp": parseInt(otp)
                    }
                }
            });
        } else {
            notifyWarning("Passwords do not match");
        }
    };

    const resendOtp = () => {
        setOtpSent(false);
        setResendTimer(60);

        refetch(); // Resend the OTP by re-triggering the query
        refetch(); // Resend the OTP by re-triggering the query
    };

    useEffect(() => {
        if (otpSent && resendTimer > 0) {
            const timer = setTimeout(() => {
                setResendTimer(resendTimer - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [resendTimer, otpSent]);

    const { refetch } = useQuery(SEND_OTP_QUERY, {
        variables: {
            details: {
                "emailID": email,
                "isNew": false
            }
        },
        onCompleted: () => {
            console.log("OTP successfully sent");
            setOtpSent(true);
            setResendTimer(60); // Reset timer when OTP is sent
        },
        onError: (error) => {
            console.error('Error:', error.message);
            notifyWarning(error.message);
        },
        skip: !email // skip the query if email is not provided
    });

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>Reset Password</h1>
                <p>Enter the OTP and reset your password</p>
                <div className={styles.ifield}>
                    <input
                        type="text"
                        id="otp"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d{0,4}$/.test(input)) {
                                setOTP(input);
                            }
                        }}
                        maxLength={4}
                        pattern="\d*"
                        required
                    />

                    <div className={styles.passwordContainer}>
                        <input
                            name='pass'
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='Set New Password'
                            onChange={handleInputData}
                        />
                        <span onClick={() => setPasswordVisible(!passwordVisible)} className={styles.eyeIcon}>
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <div className={styles.passwordContainer}>
                        <input
                            name='confirmPass'
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            placeholder='Confirm Password'
                            onChange={handleInputData}
                        />
                        <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className={styles.eyeIcon}>
                            {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <div className={styles.resetBtn} onClick={validatePass}>Reset Password</div>

                    {otpSent && resendTimer === 0 && (
                        <div className={styles.resendBtn} onClick={resendOtp}>Resend OTP</div>
                    )}

                    {otpSent && resendTimer > 0 && (
                        <div className={styles.resendTimer}>
                            Resend OTP in {resendTimer}s
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning" />
        </div>
    );
}

export default Otp;




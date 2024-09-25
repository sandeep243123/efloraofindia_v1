import React, { useRef, useState, useEffect } from 'react';
import styles from './Otp.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useQuery, gql, useMutation } from "@apollo/client";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Otp() {
    const inputRef = useRef();
    const location = useLocation();
    const { email } = location.state || {};
    const navigate = useNavigate();
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [otp, setOTP] = useState('');
    const [inputData, setInputData] = useState({});

    const notifyWarning = (msg) => {
        toast.warning(`${msg}!`, {
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

    const notifyInfo = (msg) => {
        toast.info(`${msg}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Info'
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

    const validatePasswordStrength = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        let errors = [];

        if (password.length < minLength) {
            errors.push('at least 8 characters long');
        }
        if (!hasUpperCase) {
            errors.push('at least one uppercase letter');
        }
        if (!hasNumber) {
            errors.push('at least one number');
        }
        if (!hasSpecialChar) {
            errors.push('at least one special character');
        }

        return errors;
    };

    const validatePass = () => {
        if (!inputData.pass || !inputData.confirmPass) {
            notifyWarning("Please enter your new password");
        } else if (inputData.pass !== inputData.confirmPass) {
            notifyWarning("Passwords do not match");
        } else {
            const passwordErrors = validatePasswordStrength(inputData.pass);
            if (passwordErrors.length > 0) {
                notifyWarning(`Password must contain: ${passwordErrors.join(', ')}`);
            } else {
                resetPasswordFunction({
                    variables: {
                        details: {
                            "emailID": email,
                            "newPassword": inputData.pass,
                            "otp": parseInt(otp)
                        }
                    }
                });
            }
        }
    };

    const resendOtp = () => {
        setOtpSent(false);
        setResendTimer(60);

        // Resend the OTP by re-triggering the query
        refetch();
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
                    <input type="text" id="otp" placeholder="OTP" value={otp}
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

                    <input name='pass' type="password" placeholder='Set New password' onChange={handleInputData} />

                    <input name='confirmPass' type="password" placeholder='Confirm password' onChange={handleInputData} />

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
            <ToastContainer containerId="Info" />
            <ToastContainer containerId="Warning" />
        </div>
    );
}

export default Otp;

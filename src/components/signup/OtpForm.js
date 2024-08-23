import React, { useEffect, useRef, useState, useContext } from 'react';
import styles from './otpForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from 'react-router-dom';
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from '../../services/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';

function Otp() {
    const inputRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state || {};
    console.log(location.state);

    const notifyError = (msg) => {
        toast.error(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            containerId: 'Error'
        });
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
    };
    const notifySuccess = (msg) => {
        toast.success(` ${msg}!`, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Success'
        });
    };

    const [loggedIn, setLoggedIn] = useState(false);
    const { isLoggedIn, login, setUser } = useContext(AuthContext);
    const [Otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // Timer state for countdown
    const [canResend, setCanResend] = useState(false); // State to control resend button visibility

    const signupMutation = gql`
        mutation Signup($details: signupDetails!) {
            signup(details: $details) {
                token
                currentRating
                name
                email
                accountType
            }
        }
    `;

    const [signupfunc] = useMutation(signupMutation, {
        onCompleted: (data) => {
            if (data.signup && data.signup.token) {
                const { token, ...userData } = data.signup;
                localStorage.setItem('authToken', token);
                setUser(userData);
                setLoggedIn(true);
                login();
            } else {
                console.error('Error signing up: No token received.');
            }
        },
        onError: (error) => {
            console.error('Error:', error.message);
            notifyError(error.message);
        }
    });

    useEffect(() => {
        if (loggedIn) {
            notifySuccess("You are successfully registered");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        notifySuccess('OTP sent Successfully');
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 1) {
                    clearInterval(countdown);
                    setCanResend(true);
                    return 0;
                } else {
                    return prevTimer - 1;
                }
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    const handleResendOtp = () => {
        setCanResend(false);
        setTimer(60);
        notifySuccess('OTP resent successfully');
        // Logic to resend OTP can be added here
    };

    const getotp = () => {
        const otp = parseInt(Otp);

        console.log(otp);
        signupfunc({ variables: { details: { "email": props.email, "name": props.name, "password": props.password, "otp": otp } } });
    };

    const otpRef = useRef(null);

    useEffect(() => {
        // Autofocus on the first input when the component mounts
        if (otpRef.current) {
            otpRef.current.focus();
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>OTP Verification</h1>
                <p>OTP sent to {props.email}</p>

                <div className={styles.ifield}>
                    <div ref={inputRef} id="inputs" className={styles.inputs}>
                        <OtpInput
                            value={Otp}
                            onChange={setOtp}
                            numInputs={4}
                            ref={otpRef}
                            inputStyle={{
                                color: 'black',
                                width: "30px",
                                marginBottom: "10px",
                                height: "30px",
                                borderTop: "none",
                                borderLeft: "none",
                                borderRight: "none",
                            }}
                            renderSeparator={<span
                                style={{
                                    fontSize: "7px",
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                }}
                            >
                                {" "}
                            </span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>

                    {/* here connect to landing page */}
                    <p className={styles.verifyBtn} onClick={getotp}>Verify</p>

                    {/* Resend OTP Button */}
                    {canResend ? (
                        <p className={styles.resendBtn} onClick={handleResendOtp}>Resend OTP</p>
                    ) : (
                        <p>Resend OTP in {timer}s</p>
                    )}
                </div>
            </div>
            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning" />
            <ToastContainer containerId="Success" />
        </div>
    );
}

export default Otp;

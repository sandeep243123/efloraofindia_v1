import React, { useEffect, useRef, useState, useContext } from 'react'
import styles from './otpForm.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import { AuthContext } from '../../services/AuthContext.js';
import { useNavigate } from 'react-router-dom';

function Otp() {
    const inputRef = useRef()
    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state || {}
    console.log(location.state)
    console.log("email", props)

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
    }
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
    }

    const [loggedIn, setLoggedIn] = useState(false);
    const { isLoggedIn, login, setUser } = useContext(AuthContext);

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
    `

    const [signupfunc] =
        useMutation(signupMutation, {
            onCompleted: (data) => {
                if (data.signup && data.signup.token) {
                    notifySuccess("You are successfully registered")
                    setTimeout(() => {
                        navigate("/")
                    }, 1000)
                    const { token, ...userData } = data.signup;
                    localStorage.setItem('authToken', token);
                    setUser(userData);
                    setLoggedIn(true);
                    login();

                }
                else {
                    console.error('Error signing up: No token received.');
                }
            },
            onError: (error) => {
                console.error('Error:', error.message);
                notifyError(error.message);
            }
        })

    if (isLoggedIn) {
        navigate('/');
    }
    useEffect(() => {
        notifySuccess('OTP sent Successfully');
    }, [])
    useEffect(() => {
        const inputs = inputRef.current
        inputs.addEventListener("input", function (e) {
            const target = e.target;
            const val = target.value;
            if (isNaN(val)) {
                target.value = "";
                return;
            }

            if (val != "") {
                const next = target.nextElementSibling;
                if (next) {
                    next.focus();
                }
            }
        });
        inputs.addEventListener("keyup", function (e) {
            const target = e.target;
            const key = e.key.toLowerCase();

            if (key == "backspace" || key == "delete") {
                target.value = "";
                const prev = target.previousElementSibling;
                if (prev) {
                    prev.focus();
                }
                return;
            }
        });
    })

    const [inputotp, setotp] = useState(0);

    const getotp = () => {
        const inputValues = Array.from(inputRef.current.children)
            .map(input => input.value)
            .join('');

        const otp = parseInt(inputValues, 10);

        if (inputValues.length < 4) {
            console.log("** heii")
            notifyWarning("Please enter the complete OTP");
        } else {

            setotp(otp);
            signupfunc({ variables: { details: { "email": props.email, "name": props.name, "password": props.password, "otp": otp } } })
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>OTP Verification</h1>
                <p>OTP sent to {props.email}</p>

                <div className={styles.ifield}>
                    <div ref={inputRef} id="inputs" class={styles.inputs}>
                        <input class={styles.input} type="text"
                            inputmode="numeric" maxlength="1" />
                        <input class={styles.input} type="text"
                            inputmode="numeric" maxlength="1" />
                        <input class={styles.input} type="text"
                            inputmode="numeric" maxlength="1" />
                        <input class={styles.input} type="text"
                            inputmode="numeric" maxlength="1" />
                    </div>

                    {/* here connect to landing page */}
                    <p className={styles.verifyBtn} onClick={() => {
                        getotp();
                    }}>Verify</p>
                </div>
            </div>
            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning" />
            <ToastContainer containerId="Success" />
        </div>
    )
}

export default Otp
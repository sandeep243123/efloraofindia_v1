import React, { useState, useContext, useRef } from 'react'
import styles from '../signup/signup.module.css'
import { Link } from 'react-router-dom'
import { gql, useLazyQuery } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext.js';
import img from './t1.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'

export default function Signup() {
    const [inputname, setName] = useState("");
    const [inputpassword, setPassword] = useState("");
    const [inputemail, setEmail] = useState("");
    const navigate = useNavigate();
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);
    const [signup, setsignup] = useState(false)
    const [errorMessage, setErrorMessage] = useState('') 
    const [colorState, setColor] = useState('red');

    const notifyError = (msg) => {
        toast.error(`${msg}!`, {
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
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }
    const notifyLoading = (msg) => {
        toast.loading(` ${msg}!`, {
            pending: "pending",
            success: "success",
            error: "rejected",
            containerId: 'Loading'
        });
    }
    const validatesignup = () => {
        if (inputRef1.current.value === '') {
            inputRef1.current.focus();
            notifyWarning("Please enter your user name");
            return false;
        }
        else if (inputRef2.current.value === '') {
            inputRef2.current.focus();
            notifyWarning("Please enter your email");
            return false;
        } 
        else if (!validator.isEmail(inputRef2.current.value)) {
            inputRef2.current.focus();
            notifyWarning("Please enter a valid email address");
            return false;
        }
        else if (inputRef3.current.value === '') {
            inputRef3.current.focus();
            notifyWarning("Please enter your password");
            return false;
        } else if (!inputRef4.current.checked) {
            inputRef4.current.focus();
            notifyWarning("Please accept our terms and condition");
            return false;
        } 
        if (!isPasswordValid(inputRef3.current.value)) {
            notifyWarning("Please enter a strong password");
            return false;
        }
        return true;
    };
    

    const handleSignup = () => {
        if (validatesignup()) {
            sendOtpQuery({
                variables: {
                    details: {
                        "emailID": inputemail,
                        "isNew": true
                    }
                }
            })
        }
    };



    const isPasswordValid = (value) => {
        return validator.isStrongPassword(value, { 
            minLength: 8, minLowercase: 1, 
            minUppercase: 1, minNumbers: 1, minSymbols: 1 
        })
    }
    const validate = (value) => { 
  
        if (isPasswordValid(value)) { 
            setErrorMessage('Is Strong Password');
            setColor('green');
        } else { 
            setErrorMessage('Is Not Strong Password'); 
            setColor('red');
        } 
        return value;
    } 


    const [sendOtpQuery] = useLazyQuery(gql`
        query Query($details: sendOTPDetail!) {
            sendOTP(details: $details)
          }
        `, {
        errorPolicy: "all",
        onCompleted: (data) => {
            navigate('/otpsignup', { state: { email: inputemail, password: inputpassword, name: inputname } });
        },
        onError: (error) => {
            // console.error('Error:', error.message);
            notifyError(error.message);
        }

    })

    return (
        <div className={styles.d1}>
            <div className={styles.parent1}>
                <div className={styles.registrationFrom1}>

                    <h1 className={styles.title1}>Let's get you started!</h1>

                    <div className={styles.inputForm1}>
                        <div className={styles.ifield1}>
                            <p>Full name</p>
                            <input ref={inputRef1} type="text" placeholder='Your name' value={inputname}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }} />
                        </div>
                        <div className={styles.ifield1}>
                            <p>Email address</p>
                            <input ref={inputRef2} type="text" placeholder='xyz@gmail.com' value={inputemail}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                        </div>
                        <div className={styles.ifield1}>
                            <p>Create password</p>
                            <input ref={inputRef3} type="password" placeholder='Password' value={inputpassword}
                                onChange={(e) => {
                                    setPassword(validate(e.target.value));
                                }} />
                                <br></br>
                                {errorMessage === '' ? null : 
                                        <span style={{ 
                                            fontWeight: 'bold', 
                                            color: colorState,
                                            fontSize:'0.8rem',
                                            marginLeft: '20px'
                                        }}>{errorMessage}</span>
                                }
                        </div>
                        <div className={styles.passwordConstraints}>
                            <p>Password must contain a minimum 8 characters</p>
                            <p>Password must contain at least one symbol e.g @,!</p>
                            <p>Password must contain at least one numeric character</p>
                        </div>
                        <div className={styles.btn11} onClick={handleSignup}>
                            <p>
                                Sign Up
                            </p>
                        </div>
                        <div className={styles.tc1}>
                            <div>
                                <input ref={inputRef4} type="checkbox" id='accept' style={{ marginRight: '4px' }} />
                                <label htmlFor="accept" >I accept this</label>
                            </div>
                            <div>
                                <Link to={'/terms'}><p>Terms & Conditions</p></Link>
                            </div>
                        </div>
                        <div className={styles.start1}>
                            <p>Already a user?</p>
                            <Link to="/login" style={{ color: 'orange' }}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
            <img src={img} alt="" />
            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning" />
            <ToastContainer containerId="Loading" />
            <ToastContainer containerId="Success" />
        </div>
    )
}

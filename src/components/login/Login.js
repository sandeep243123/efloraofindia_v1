import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery, gql } from "@apollo/client";
import { AuthContext } from '../../services/AuthContext.js';
import '../login/login.css';
import img from '../assets/glogo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [inputpassword, setPassword] = useState("");
    const [inputemail, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { isLoggedIn, login } = useContext(AuthContext);
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const btnRef = useRef(null);


    const notifyError = () => {
        toast.error(' Invalid user!', {
            position: "bottom-right",
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
    const validateLogin = () => {
        if (inputRef1.current.value == '') {
            inputRef1.current.focus()
            notifyWarning("Please enter your email")
            return false
        }
        else if (inputRef2.current.value == '') {
            inputRef2.current.focus()
            notifyWarning("Please enter your password")
            return false
        }
        return true
    };

    const [Loginfunc] = useLazyQuery(gql`
        query Login($details: userLogin) {
            login(details: $details) {
                token
            }
        }`, {
        onCompleted: (data) => {
            if (data.login && data.login.token) {
                const token = data.login.token;
                localStorage.setItem('authToken', token);
                setLoggedIn(true);
                login();
            } else {
                console.error('Error signing up: No token received.');
            }
        },
        onError: (error) => {
            console.error('Error signing up:', error.message);
        }
    });

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    return (
        <div className='d'>
            <div className='parent'>
                <div className="content">
                    <div className='log'>
                        <h1>Login</h1>
                    </div>
                    <div className='ifield'>
                        <input ref={inputRef1} type="input" placeholder='Email' value={inputemail}
                            onChange={(e) => setEmail(e.target.value.toLowerCase())} required />
                        <input ref={inputRef2} id='input2' type="password" placeholder='password'
                            onChange={(e) => setPassword(e.target.value.toLowerCase())} required />
                    </div>
                    <div className='chk'>
                        <div>
                            <input type="checkbox" id='remeber' />
                            <label htmlFor="remeber" style={{ marginLeft: '3px' }}>Remember me</label>
                        </div>
                        <Link to={'/findacc'}>Forget password?</Link>
                    </div>
                    <div className='tc'>
                        <div>
                            <input type="checkbox" id='accept' style={{ marginRight: '4px' }} />
                            <label htmlFor="accept" required>I accept this</label>
                        </div>
                        <div style={{ marginRight: '5px', fontSize: '1em', paddingLeft: '3px', color: '#54AEFF' }}>
                            <Link to={'/terms'}><p>Terms & Conditions</p></Link>
                        </div>
                    </div>
                    <div ref={btnRef} className='btn1' onClick={() => {
                        if (validateLogin())
                            Loginfunc({ variables: { details: { "usermail": inputemail, "password": inputpassword } } }).then(() => {
                                if (!loggedIn)
                                    notifyError()
                            })
                    }}>
                        <p>Login</p>
                    </div>
                    <div className='btn2'>
                        <img src={img} alt="" />
                        <p>Continue with Login</p>
                    </div>
                    <div className='start'>
                        <p>Don't have an account?</p>
                        <Link to={'/signup'}><div>Get started</div></Link>
                    </div>
                </div>
            </div>

            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning" />
        </div>
    )
}

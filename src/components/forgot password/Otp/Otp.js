import React, { useEffect, useRef } from 'react'
import styles from './Otp.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Otp() {
    const inputRef = useRef()

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

    // when backend will connect then ..
    // const notifyError = () => {
    //     toast.error(' Incorrect OTP!', {
    //         position: "bottom-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         containerId: 'Error'
    //     });
    // }
    // useEffect(() => {
    //     notifyError()
    // }, [])

    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1>OTP Verification</h1>
                <p>Please enter the one time password
                    to verify your account</p>
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
                    <Link to={'/setPass'} className={styles.verifyBtn}>Verify</Link>
                </div>
            </div>
            <ToastContainer containerId="Error" />
        </div>
    )
}

export default Otp

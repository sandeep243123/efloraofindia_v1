import React, { useState, useRef, useEffect } from 'react'
import style from './Profile.module.css'
import pp from '../contribute/pp.png'
import { gql, useMutation } from "@apollo/client";

import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function Profile() {

    const mandatory={
        color:'red'
    }
    
    const navigate = useNavigate();

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
            containerId: 'Success'
        });
    }

    const notifyError = (msg) => {
        toast.error(` ${msg}!`, {
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

    const updateProfileMutation = gql`
        mutation UpdateInfo($details: updateDetails!) {
        updateInfo(details: $details)
      }`

    const [updateProfileFunction]=useMutation(updateProfileMutation, {
        onCompleted: (data) => {
            notifySuccess("Successfully updated");
            console.log("SetTimeout Implementd")
            setTimeout(() => {
                navigate("/")
            },3000)
            
        },
        onError: (error) => {
            console.error('Error:', error.message);
            notifyError(error.message)
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
            notifyWarning("Please enter correct passwords")
        } else if (inputData.confirmPass == inputData.pass) {
            if(inputData.name!='')
            {
            updateProfileFunction({variables:{details:{"name":inputData.username,"password":inputData.pass}}})
            }
            else
            {
                notifyWarning("please enter correct username")
            }
        } else {
            notifyWarning("passwords do not match")
        }
    }
    return (
        <div className={style.parent}>
            <div className={style.Profile}>
                <div className={style.imgSection} >
                    <h1 onClick={() => {validatePass()}}>SAVE</h1>
                    <img src={pp} alt="No image found" />
                </div>
                <div className={style.userInfo}>
                    <div className={style.field}>
                        <h1>Username<span style={mandatory}>*</span></h1>
                        <input name="username" type="text" placeholder='username' onChange={handleInputData} required/>
                    </div>
                    <div className={style.field}>
                        <h1>Email</h1>
                        <input type="text" placeholder='xyz@gmail.com' />
                    </div>
                    <div className={style.field}>
                        <h1>Phone</h1>
                        <input type="text" placeholder='+91 - 000 000 000 0' />
                    </div>
                    <div className={style.field}>
                        <h1>Gender</h1>
                        {/* <input type="text" placeholder='gender' /> */}
                        <select name="gender" id="gender" className={style.choice}>
                            <option value="male" className={style.opValue}>Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className={style.field}>
                        <h1>DOB</h1>
                        <input type="date" placeholder='DD/MM/YYYY' />
                    </div>
                    <div className={style.field}>
                        <h1>Change Password<span style={mandatory}>*</span></h1>
                        <input name='pass' type="password" placeholder='Set New password' onChange={handleInputData} required/>
                    </div>

                    <div className={style.field}>
                        <h1>Confirm Password<span style={mandatory}>*</span></h1>
                        <input name='confirmPass' type="password" placeholder='Confirm password' onChange={handleInputData} required/>
                    </div>
                </div>
            </div>
            
            <ToastContainer containerId="Success" />
            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning"/>
        </div>
    )
}

export default Profile

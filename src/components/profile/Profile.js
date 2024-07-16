import React, { useState, useRef, useEffect , useContext } from 'react'
import style from './Profile.module.css'
import pp from '../contribute/pp.png'
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from '../../services/AuthContext.js';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
function Profile() {

    const mandatory={
        color:'red'
    }
    
    const { user,logout} = useContext(AuthContext);
    const [password, setPassword1] = useState("");
    const [confirmpass, setPassword2] = useState("");
    const [inputname, setName] = useState("");
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
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
        
        errorPolicy: "all",
        
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
                if(error.graphQLErrors[0].code===601)
                    {
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
        }
    })


    function validatePass() {
            if (inputRef2.current.value === '' || inputRef3.current.value === '') 
            {
                notifyWarning("Please enter the passwords")
            }
            else if(inputRef2.current.value !== inputRef3.current.value)
            {
                
                notifyWarning("passwords do not match")
            }
            else 
            {
                if(inputRef1.current.value !== '')
                {
                    updateProfileFunction({variables:{details:{"name":inputRef1.current.value,"password":inputRef2.current.value}}})
                }
                else
                {
                    notifyWarning("please enter correct username")
                }
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
                        <input ref={inputRef1} name="username" type="text" placeholder='username' value={inputname}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }} required/>
                    </div>
                    <div className={style.field}>
                        <h1>Email</h1>
                        <input type="text" value={user.email} readOnly />
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
                        <input ref={inputRef2} name='pass' type="password" placeholder='Set New password' value={password} onChange={(e) => setPassword1(e.target.value)} required/>
                    </div>

                    <div className={style.field}>
                        <h1>Confirm Password<span style={mandatory}>*</span></h1>
                        <input ref={inputRef3} name='confirmPass' type="password" placeholder='Confirm password' value={confirmpass} onChange={(e) => setPassword2(e.target.value)} required/>
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

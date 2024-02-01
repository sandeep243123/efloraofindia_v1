import React from 'react';
import '../login/login.css';
import img from '../assets/glogo.png'
import { colors } from '@mui/material';
export default function Login() {
    return (
        <div className='d'>
            <div className='parent'>
                <div className="content">
                    <div className='log'>
                        <h1>Login</h1>
                    </div>
                    <div className='ifield'>
                        <input type="input" placeholder='Email' />
                        <input type="password" placeholder='password' />
                    </div>
                    <div className='chk'>
                        <div>
                            <input type="checkbox" id='remeber' />
                            <label htmlFor="remeber" style={{marginLeft:'3px'}}>Remeber me</label>
                        </div>
                        <p>Forget password?</p>
                    </div>
                    <div className='tc'>
                        <div style={{marginRight:'5px',fontSize:'0.7em',marginTop:'4px', color:'#54AEFF'}}>
                            <p>Terms & Conditions</p>
                        </div>
                        <div>
                            <input type="checkbox" id='accept' style={{marginRight:'4px'}}/>
                            <label htmlFor="accept" >I accept this</label>
                        </div>
                    </div>
                    <div className='btn1'>
                        <p>Login</p>
                    </div>
                    <div className='btn2'>
                        <img src={img} alt="" />
                        <p>Continue with Login</p>
                    </div>
                    <div className='start'>
                        <p>Don't have an account?</p>
                        <div>Get started</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

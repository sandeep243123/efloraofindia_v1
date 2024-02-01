import React from 'react';
import '../login/login.css';
export default function Login() {
    return (
        <div className='d'>
            <div className='parent'>
                <div className='title'>
                    <h1 style={{ color: 'white' }}>Welcome back to </h1>
                    <h1 style={{ color: '#06FF96' }}>eFloraOfIndia</h1>
                </div>
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
                            <label htmlFor="remeber">Remeber me</label>
                        </div>
                        <p>Forget password</p>
                    </div>
                    <div className='tc'>
                        <div>
                            <p>Terms & Conditions</p>

                        </div>
                        <div>
                            <input type="checkbox" id='accept' />
                            <label htmlFor="accept" >I accept this</label>
                        </div>
                    </div>
                    <div className='btn'>
                        <button>Login</button>
                        <button>Continue with google</button>
                    </div>
                    <div className='start'>
                        <p>Dont have an account? Get started</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

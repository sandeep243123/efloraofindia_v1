import React from 'react'
import '../signup/signup.css'
import { Link } from 'react-router-dom'
export default function Signup() {
  return (
    <div className='d1'>
        <div className='parent1'>
            <div className='registration-from1'>
                <div className='title1'>
                    <h1>Let's get you started!</h1>
                </div>
                <div className='input-form1'>
                    <div className='ifield1'>
                        <p>Full name</p>
                        <input type="text" placeholder='Your name' />
                    </div>
                    <div className='ifield1'>
                        <p>Email address</p>
                        <input type="text" placeholder='xyz@gmail.com' />
                    </div>
                    <div className='ifield1'>
                        <p>Phone number</p>
                        <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='+91 000 000 000 0'/>
                    </div>
                    <div className='ifield1'>
                        <p>Create password</p>
                        <input type="password1" placeholder='Pasword' />
                    </div>
                    <div className='password-constraints'>
                        <p>Password must contain a minimum 8 characters</p>
                        <p>Password must contain at least one symbol e.g @,!</p>
                    </div>
                    <div className='btn11'>
                        <p>Sign Up</p>
                    </div>
                    <div className='tc1'>
                        <div>
                            <input type="checkbox" id='accept' style={{marginRight:'4px'}}/>
                            <label htmlFor="accept" >I accept this</label>
                        </div>
                        <div>
                            <Link to={'/terms'}><p>Terms & Conditions</p></Link>
                        </div>
                    </div>
                    <div className='start1'>
                        <p>Already a user?</p>
                        <div>Login</div>
                    </div>
                </div>
            </div>
            <div className='quotes1'>
                <div className='title2'>
                    <p>eFloraOfIndia</p>
                </div>
                <div className='q'>
                    <p>&nbsp;It has the largest database on net on Indian Flora with more than 14,000 species (along with more than 4,00,000 pictures)&nbsp;</p>
                </div>
            </div>
        </div>
    </div>
  )
}

import React from 'react'
import style from './Profile.module.css'
import pp from '../contribute/pp.png'
function Profile() {
    return (
        <div className={style.parent}>
            <div className={style.Profile}>
                <div className={style.imgSection}>
                    <h1>SAVE</h1>
                    <img src={pp} alt="No image found" />
                </div>
                <div className={style.userInfo}>
                    <div className={style.field}>
                        <h1>Username</h1>
                        <input type="text" placeholder='username' />
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
                        <h1>Change Password</h1>
                        <input type="password" placeholder='Password' />
                    </div>

                    <div className={style.field}>
                        <h1>Confirm Password</h1>
                        <input type="password" placeholder='Password' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

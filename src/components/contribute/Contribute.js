// import { Navbar } from '@material-tailwind/react'
import React from 'react';
import style from './Contribute.module.css'
import img1 from '../a1.jpg';
export default function Contribute() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* profile picture and UserName */}
          <div className={style.user}>
            {/* image */}
            <div>
                 <img className={style.profile} src='data:image/jpeg;base64,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' alt='profile-img'></img>
            </div>
            
            {/*  username */}
            <p className={style.username}>Harry18</p>
          </div>

          <div className={style.top}>
              {/* Image-section */}
            <div className={style.imgSection}>
                <div className={style.leftImg}>
                  <img src={img1} alt='l1'></img>
                </div>
                <div className={style.rightImg}>
                  <div className={style.rightImg1}>
                    <img src={img1} alt='r1'></img>
                  </div>
                  <div className={style.rightImg2}>
                    <img src={img1} alt='r2'></img>
                  </div>
                </div>
              </div>

            {/* Description-section */}
              <div className={style.desc}>
              <textarea name="postContent" rows={17} cols={80} />
              </div>
          </div>


          {/*  Button- section */}
          <div className={style.btn}>
                <div className={style.viewContri}>
                      View Contribution
                </div>
                <div className={style.addContri}>
                    Add Contribution
                </div>
          </div>


      </div>
      
     
    </div>
  )
}

// import { Navbar } from '@material-tailwind/react'
import React from 'react';
import style from './Contribute.module.css'
import img1 from '../a1.jpg';
import { Link } from 'react-router-dom'
import AddContribution from '../popup components/add contribution/AddContribution';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import img from '../assets/user.png';
import ViewContribution from '../popup components/view contribution/ViewContribution';
export default function Contribute() {
  const [openAddContribution, setOpenAddContribution] = useState(false)
  const [openViewContribution, setOpenViewContribution] = useState(false)
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* profile picture and UserName */}
        <div className={style.user}>
          {/* image */}
          <div>
            <img className={style.profile} src={img}></img>
          </div>

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
          <div className={style.viewContri} onClick={() => setOpenViewContribution(true)}>
            <button>View Contribution</button>
          </div>
          <div className={style.addContri} >
            <button onClick={() => setOpenAddContribution(true)}>Add Contribution</button>
          </div>
        </div>
        {openAddContribution && <AddContribution closeAddContribution={setOpenAddContribution}></AddContribution>}
        {openViewContribution && <ViewContribution closeViewContribution={setOpenViewContribution}></ViewContribution>}


      </div>


    </div>
  )
}

import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import simg from './search.png';
import timg from './t2.png';
import sample1 from './l1.jpg'
import sample2 from './l2.jpg'
import sample3 from './l3.jpg'
import { Link } from 'react-router-dom';
function Home() {

  return (
    <div className={styles.t}>
      <div className={styles.container1} >
        <div className={styles.left}>
          <p>
            To plant a garden is to believe in Tommorrow
          </p>
          <div className={styles.search} type='text'>
            <input type="text" placeholder='Enter text to search' />
            <a>
              <img src={simg} alt="" />
            </a>
          </div>
        </div>
        <img className={styles.timg} src={timg} alt="" />
        <div className={styles.right}></div>
      </div>
      <div className={styles.container2} >
        <p className={styles.cardT}>Our core <p id='pp'>Services</p></p>
        <div className={styles.cardContainer}>
          <div className={styles.card1}>
            <img src={sample1} alt="No image found" />
            <div className={styles.infoSection}>
              <Link to={'/upload'}><h1>Contribute</h1></Link>
              <h2>If you wanna give your valuable contribution, then this is the right place</h2>
            </div>
          </div>
          <div className={styles.card2}>
            <img src={sample2} alt="No image found" />
            <div className={styles.infoSection}>
              <Link to={'/showposts'}><h1>Show Posts</h1></Link>
              <h2>If you wanna give your valuable contribution, then this is the right place</h2>
            </div>
          </div>
          <div className={styles.card3}>
            <img src={sample3} alt="No image found" />
            <div className={styles.infoSection}>
              <Link to={'/dashboard'}><h1>Dashboard</h1></Link>
              <h2>If you wanna give your valuable contribution, then this is the right place</h2>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.footer}>

      </div>
    </div>
  )
}
export default Home

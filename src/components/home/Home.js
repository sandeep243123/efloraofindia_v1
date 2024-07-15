import React, { useEffect, useState,useContext } from 'react'
import styles from './style.module.css';
import simg from './search.png';
import timg from './t2.png';
import sample1 from './l1.jpg'
import sample2 from './l2.jpg'
import sample3 from './l3.jpg'
import { Link , useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext.js';
function Home({ theme }) {

  const { isLoggedIn,logout} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={styles.t}>
      <div style={theme === "light" ? { backgroundColor: 'rgb(250, 239, 223)' } : { backgroundColor: "black" }} className={styles.container1} >
        <div style={theme === "light" ? { color: "rgb(0, 130, 130)" } : { color: 'white' }} className={styles.left}>
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
        <div className={styles.right}>
        </div>
      </div>
      <div className={styles.container2} >
        <p className={styles.cardT}>Our core <p id='pp'>Services</p></p>
        <div className={styles.cardContainer}>
          <div className={styles.card1}>
            <img src={sample1} alt="No image found" />
            <div className={styles.infoSection}>
              <h1 onClick={()=>{
                if(isLoggedIn){navigate('/upload')} 
                else {navigate('/login')}}}>Contribute</h1>
              <h2>If you want to give your valuable contribution, then this is the right place</h2>
            </div>
          </div>
          <div className={styles.card2}>
            <img src={sample2} alt="No image found" />
            <div className={styles.infoSection}>
              <h1 onClick={()=>{
                if(isLoggedIn){navigate('/showposts')} 
                else {navigate('/login')}}}>Show Posts</h1>
              <h2>Explore the world of greenery with our latest series, offering extensive plant identification</h2>
            </div>
          </div>
          <div className={styles.card3}>
            <img src={sample3} alt="No image found" />
            <div className={styles.infoSection}>
              <h1 onClick={()=>{
                if(isLoggedIn){navigate('/dashboard')} 
                else {navigate('/login')}}}>Dashboard</h1>
              <h2>Effortlessly monitor plant identification, contributors, and moderators with our streamlined dashboard</h2>
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

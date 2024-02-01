import React from 'react'
import '../home/style.css'
import { Link } from 'react-router-dom'
import img1 from '../home/leaf1-removebg-preview.png'
export default function Home() {
  return (
    <>
      <div className='wrapper'>
        <div className='container-1'>

          {/* left-section */}
          <div className='left-section'>
              {/* Quote */}
              <div>
                <p className='quote'>A plant is the most patient and forgiving teacher.</p>
              </div>

              {/* search Bar */}
              <div className='searchbar'>
              
                <input id='search-bar' type="text" placeholder='Have a question? Ask or enter search term...' />

                {/* search button */}
                <div className='search-btn'>Search</div>
              </div>

                  {/* explore-btn */}
              <div className='explore-btn'>Explore</div>
          </div>

          {/* right-section */}
          <div className='right-section' style={{right:'0'}}>
              <img src={img1} alt="main-leaf"></img>
          </div>
        </div>
      </div>
    </>
  )
}
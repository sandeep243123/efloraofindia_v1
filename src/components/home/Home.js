import React from 'react'
import '../home/style.css'
import { Link } from 'react-router-dom'
import img1 from '../home/leaf1-removebg-preview.png'
export default function Home() {
  return (
    <>
      <div className="rectangle-2">
        <div className='v1'>
          <div className="v11">
            <p>A plant is the most patient and forgiving teacher.</p>
          </div>
          <div className="v12">
            <div className="v121">
              <div class="relative" >
                <input type="text" class="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="Search anything..." style={{ width: '30vw', height: '6.5vh', borderRadius: '20px' }} />
                <div class="absolute top-1.5 right-20">
                  <button class="h-9 w-24 text-white rounded-2xl bg-green-500 hover:bg-green-600">Search</button>
                </div>
              </div>
            </div>
            <div className='v122'>
            <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 w-36">Explore</button>
            </div>
          </div>
        </div>
        <div className='v2'>
          <img src={img1} alt="" />
        </div>
      </div>
    </>
  )
}
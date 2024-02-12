import React from "react";
import { Link } from 'react-router-dom'
import './style.css';
import img1 from './logo-removebg-preview.png'

export default function Navbar() {
  return (
    <div>
      <div class="nav">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">
            <Link to='/'><img src={img1} alt="" /></Link>
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="nav-links">

          <Link to={'/explore'}>Explore</Link>
          <Link to={'/about'}>About us</Link>
          <Link to={'/contact'}>Contact us</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/signup'}>Signup</Link>
        </div>
      </div>
    </div>

  )
}

import React from "react";
import { Link } from 'react-router-dom'
import './style.css';

export default function Navbar() {
  return (
    <div>
      <div class="nav">
        <input type="checkbox" id="nav-check"/>
          <div class="nav-header">
            <div class="nav-title">
              JoGeek
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
            <a href='#' target="_blank">Explore</a>
            <a href='#' target="_blank">About us</a>
            <a href='#' target="_blank">Contact us</a>
            <a href='#' target="_blank">Login</a>
          </div>
      </div>
    </div>

  )
}

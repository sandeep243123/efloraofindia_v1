import React, { useState, useRef, useEffect } from 'react';
import style from './navbar.module.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
function Navbar() {
  const [toggle, setToggle] = useState(false)
  const sideNavRef = useRef(null);
  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      setToggle(false)
    }
  }

  return (
    <>
      <nav>
        {/* <a href="#">eFloraOfIndia</a> */}
        <Link to={' '}>eFloraOfIndia</Link>
        <div >
          <ul ref={sideNavRef} className={toggle ? style.navBar + " " + style.active : style.navBar}>

            <li><Link to={' '}>Home</Link></li>
            <li><Link to={'/about'}>About us</Link></li>
            <li><Link to={'/contact'}>Contact us</Link></li>

            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/signup'}>Sign up</Link></li>
            <li><Link to={'/showposts'}>Show posts</Link></li>
            <li><Link to={'/upload'}>Contribute</Link></li>
            <li><Link to={'/dashboard'}>Dashboard</Link></li>
          </ul>
        </div>
        <div className={style.mobile} onClick={() => setToggle(!toggle)}>
          {!toggle ? <GiHamburgerMenu></GiHamburgerMenu> : <GrClose></GrClose>}
        </div>
      </nav>
    </>
  )
}

export default Navbar

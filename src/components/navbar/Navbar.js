import React, { useState, useRef, useEffect, useContext } from 'react';
import style from './navbar.module.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext.js';
function Navbar({ setTheme, theme }) {
  const [toggle, setToggle] = useState(false)
  const sideNavRef = useRef(null);

  const { isLoggedIn, logout } = useContext(AuthContext);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      setToggle(false)
    }
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav>
        <Link to={' '}>eFloraOfIndia</Link>
        <div>
          <ul ref={sideNavRef} className={toggle ? style.navBar + " " + style.active : style.navBar}>
            <li onClick={() => theme == "dark" ? setTheme("light") : setTheme("dark")} style={{ marginTop: '20px', cursor: "pointer" }}>{theme === "light" ? "Dark" : "Light"}</li>
            <li><Link to={' '}>Home</Link></li>
            <li><Link to={'/about'}>About us</Link></li>
            <li><Link to={'/contact'}>Contact us</Link></li>

            {
              isLoggedIn ? (
                <>
                  <li><Link to={'/profile'}>Profile</Link></li>
                  <li><Link to={'/showposts'}>Show posts</Link></li>
                  <li><Link to={'/upload'}>Contribute</Link></li>
                  <li><Link to={'/dashboard'}>Dashboard</Link></li>
                  <li><Link to={'/'} onClick={handleLogout}>Sign out</Link></li>
                </>
              ) : (
                <>
                  <li><Link to={'/login'}>Login</Link></li>
                  <li><Link to={'/signup'}>Sign up</Link></li>
                </>
              )
            }
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

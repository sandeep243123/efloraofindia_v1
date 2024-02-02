import './App.css';
import Home from './components/home/Home.js';
import Navbar from './components/navbar/Navbar.js';
import Login from './components/login/Login.js';
import Signup from './components/signup/Signup.js';
import Contribute from './components/contribute/Contribute.js'
import {Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>h
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/contribute' element={<Contribute></Contribute>}></Route>
      </Routes>
    </div>
  );
}

export default App;

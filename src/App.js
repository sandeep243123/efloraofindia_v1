import './App.css';
import Home from './components/home/Home.js';
import Navbar from './components/navbar/Navbar.js';
import Login from './components/login/Login.js';
import Signup from './components/signup/Signup.js';
import Contribute from './components/contribute/Contribute.js'
import Terms from './components/terms & condition/term.js'
import About from './components/about us/about.js'
import Contact from './components/contact us/contact.js'
import Explore from './components/explore/Explore.js';
import ShowPost from './components/showPosts/ShowPosts.js';
import UploadImg from './components/upload img/UploadImg.js';
import { Routes, Route } from 'react-router-dom';
import Next from './components/uploadNext/Next.js';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/contribute' element={<Contribute></Contribute>}></Route>
        <Route path='/terms' element={<Terms></Terms>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/explore' element={<Explore></Explore>}></Route>
        <Route path='/showposts' element={<ShowPost></ShowPost>}></Route>
        <Route path='/upload' element={<UploadImg data={data} setData={setData}></UploadImg>}></Route>
        <Route path='/next' element={<Next data={data}></Next>}></Route>
      </Routes >

    </div >
  );
}

export default App;

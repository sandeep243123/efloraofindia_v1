import React from "react";
import style from "../contact us/Contact.module.css";
import { useState } from "react";
import contact from '../assets/contact-details-3381225_640.webp'
export default function Contact() {

    const [name, setName] = useState("");
    const  [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject,setSubject]=useState('');

    function sendMessage(){

    }

    return (
        <div className={style.wrapper}>
             {/* Heading Contact Us */}
            <div className={style.heading}>
                Contact Us
            </div>
            <div className={style.container}>
                
               


                    {/* Inner- container */}
                    <div className={style.innerContainer}>
                        {/* Left side of the page - Form  */}
                        <div className={style.leftSection}>
                                <form className="flex flex-col justify-evenly">
                                <div className="pt-0 m-4">
                                    {/* <label className="text-gray-100" for='name'>Enter Your Name:</label> */}
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="focus:outline-none focus:ring relative w-[70%] px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                                            required
                                        />
                                    
                                </div>
                                <div className="pt-0 m-4">
                                    {/* <label className="text-gray-100" for='email'>Enter Your Email:</label> */}
                                        <input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        className="focus:outline-none focus:ring relative w-[70%] px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                                        required
                                        />
                                    
                                </div>
                                <div className="pt-0 m-4">
                                    {/* <label className="text-gray-100" for='subject'>Subject:</label> */}
                                        <input
                                        type="text"
                                        id="subject"
                                        placeholder="Subject"
                                        name="subject"
                                        value={subject}
                                        onChange={(e)=>setSubject(e.target.value)}
                                        className="focus:outline-none focus:ring relative w-[70%] px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                                        // required
                                    />
                                    
                                </div>
                                <div className="pt-0 m-4">
                                   {/* <label className="text-gray-100" for='message'>Your Message:</label> */}
                                    <textarea
                                        placeholder="Your message"
                                        name="message"
                                        id="message"
                                        value={message}
                                        onChange={(e)=>setMessage(e.target.value)}
                                        className="focus:outline-none focus:ring relative w-[70%] px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                                        required
                                    />
                                   
                                </div>
                                <div className="pt-0 m-4">
                                    <button
                                    className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
                                    type="submit"
                                    id={style.btn}
                                    onClick={sendMessage}
                                    >
                                    Send a message
                                    </button>
                                </div>

                                </form>
                        </div>

                        {/* Right side of the page - Description Content */}

                        <div className={style.rightSection}>
                                <div className="text-4xl font-bold text-[#3cbaa0] m-4">
                                    Let's talk about your Query
                                </div>
                                <p className="text-white text-[1.2rem] font-mono italic">Drop us a line through the form and we'll get back to you soon</p>
                                <img className={style.image} src={contact}></img>
                        </div>


                    </div>
                    
            </div>
        </div>
    );
}

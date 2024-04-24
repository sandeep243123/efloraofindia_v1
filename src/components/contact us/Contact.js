import React from "react";
import style from "../contact us/Contact.module.css";
import { useState } from "react";
import img from './t1.png'
export default function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState('');

    function sendMessage() {

    }

    return (
        <div className={style.wrapper}>
            <img src={img} alt="" />
            <div className={style.container}>
                <div className={style.name}>
                    <div className={style.n1}>
                        <p>First name</p>
                        <input className={style.it} type="text" placeholder="first" />
                    </div>
                    <div className={style.n1}>
                        <p>Last name</p>
                        <input className={style.it} type="text" placeholder="last" />
                    </div>
                </div>
                <div className={style.mail}>
                    <p>E-mail address</p>
                    <input className={style.it} type="text" placeholder="xyz@gmail.com" />
                </div>
                <div className={style.phone}>
                    <p>Phone</p>
                    <input className={style.it} type="text" placeholder="0000 0000 00" />
                </div>
                <div className={style.phone}>
                    <p>Message</p>
                    <textarea name="txtArea" id="" cols="10" rows="5" className={style.tt} placeholder="Write your message.."></textarea>
                </div>
                <div className={style.btn}>Send message</div>
            </div>
        </div>
    );
}

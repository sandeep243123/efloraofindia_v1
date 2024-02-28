import React from "react";
import "../contact us/contact.css";
export default function contact() {
    return (
        <div className="d3">
            <div className="parent3">
                <div className="content3">
                    <div className="title3">
                        <p>Contact Us</p>
                    </div>
                    <div className="mailto">
                        {/* <p>Please send mail to <a href="mailto:itpmods@googlegroups.com" style={{color:'#06FF96'}}>itpmods@googlegroups.com</a></p> */}
                    </div >
                    <div className="search">
                        <p>Your Name (Required) </p>
                        <input
                            type="text"
                            placeholder="NAME"
                            name="name"
                        />
                    </div>
                    <div className="search">
                        <p>Your Email (Required) </p>
                        <input
                            type="Email"
                            placeholder="xyz@gmail.com"
                            name="email"
                        />
                    </div>
                    <div className="search">
                        <p>Subject (Required) </p>
                        <input
                            type="text"
                            placeholder="SUBJECT"
                            name="name"
                        />
                    </div>
                    <div className="search">
                        <p>Your Message (Required) </p>
                        <input
                            type="text"
                            placeholder="MESSAGE"
                            name="password"
                            className="name"
                            style={{ height: "100px", textAlign: "none" }}
                        />
                    </div>
                    <div className="search">
                        <button type="button" name="button" className="button">
                            SEND
                        </button>
                    </div>

                    <div className="second">
                        Wanna start  a new project or microproject with efloraOfIndia<br></br>
                        A partnership?<br></br>
                        Or simply,a quetions?<br></br>

                        <br></br>
                        Dont's hesitate and write to us!<br></br>
                        <br></br>
                        <br></br>
                        <p className="style"> the efloraOfIndia team </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import style from './UploadImg1.module.css';
import uploadPic from '../a1.jpg';


export default function UploadImg1(){
    return(
        <div className={style.wrapper}>
            <div className={style.container}>
                {/* left-section */}
                <div className={style.leftSection}>
                        <h1>Description</h1>

                        {/* here  is the description of the image will be added */}
                </div>

                {/* right-section */}
               
                <div className={style.rightSection}>
                    <div>
                        <p className={style.heading}>Upload Images</p>
                    </div>
                    <div className={style.rightTop}>
                        <img className={style.upload} src={uploadPic} alt=""></img>
                        <div>
                            <p className={style.text}><strong className={style.highlight}>Upload Photo</strong> or just drag and drop</p>
                            <p className={style.text}>+ Add atleast 3 Photos</p>
                        </div>
                    </div>

                    {/* image- section */}

                    <div className={style.imageSection}>
                        <img className={style.images} src={uploadPic} alt=""></img>
                        <img className={style.images} src={uploadPic} alt=""></img>
                        <img className={style.images} src={uploadPic} alt=""></img>
                    </div>

                    {/* Buttons */}

                    <div className={style.btn}>
                        <div className={style.previous}>Previous</div>
                        <div className={style.next}>Next Step</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
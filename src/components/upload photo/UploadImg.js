import React from 'react'
import styles from './style.module.css'
import img from '../assets/img1.png'
import plantImg from '../assets/plant.jpg'
import uploadImg from '../assets/upload1.png'
import { Link } from 'react-router-dom'
export default function UploadImg() {
    return (
        <div className={styles.parent}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.leftContainer}>
                        <div className={styles.k1}>
                            <div className={styles.k11}>
                                <p>1</p>
                                <p>2</p>
                            </div>
                            <div className={styles.line1}></div>
                        </div>
                        <div className={styles.imgDiv}>
                            <img src={img} alt="" />
                            <h1 className={styles.addPhoto}>Add Photos</h1>
                            <p className={styles.addPhoto1}>
                                Please add atleast 3 photos of the plant for correct identification and contribution
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <h1>Upload Photos</h1>
                    <div className={styles.rightDiv}>
                        <img src={uploadImg} alt="" />
                        <h1>Upload image</h1>
                        <h1 style={{ color: 'black' }}>+ Add atleast 3 photos</h1>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={plantImg} alt="" />
                        <img src={plantImg} alt="" />
                        <img src={plantImg} alt="" />
                    </div>

                    <div className={styles.btnContainer}>
                        <div className={styles.btn1}>Previous</div>
                        <Link to={'/next'}><div className={styles.btn2}>Next</div></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

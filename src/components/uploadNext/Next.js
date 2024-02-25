import React from 'react'
import styles from './style.module.css'
import img from '../assets/img2.png'
import plantImg from '../assets/plant.jpg'
import uploadImg from '../assets/upload1.png'

export default function Next() {
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
                            <h1 className={styles.addPhoto}>Add Description</h1>
                            <p className={styles.addPhoto1}>
                                Please write some Description about the plant
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <h1>Add Description</h1>
                    <textarea name="" id="" cols="70" rows="15" placeholder='Write description about plant'></textarea>
                    <div className={styles.btnContainer}>
                        <div className={styles.btn1}>Previous</div>
                        <div className={styles.btn2}>Submit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

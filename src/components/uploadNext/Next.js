import React, { useState } from 'react'
import styles from './style.module.css'
import img from '../assets/img2.png'
import plantImg from '../assets/plant.jpg'
import uploadImg from '../assets/upload1.png'
import { useNavigate } from 'react-router-dom'

import { gql, useMutation } from "@apollo/client";

export default function Next(props) {

    // const {data}= props.location.state || {};
    // const images = data?.images || [];
    const images = props.data;
    console.log("bye", images, props)

    const navigate = useNavigate();

    const [description, setDescription] = useState("");

    const createpostmut = gql`
    mutation CreatePost($details: PostCreateRequest!) {
        createPost(details: $details)
    }
`
    const [CreatePostfunc] =
        useMutation(createpostmut, {
            onCompleted: (data) => {

            },
            onError: (error) => {
                console.error('Error signing up:', error.message);

            }
        })

    return (

        <div className={styles.parent}>
            {
                console.log(images)
            }
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.leftContainer}>
                        <div className={styles.k1}>
                            <div className={styles.k11}>
                                <p style={{ backgroundColor: "#1e9a86", color: 'white' }}>1</p>
                                <p style={{ backgroundColor: "white", color: 'black' }}>2</p>
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
                    <textarea name="" id="" cols="70" rows="15" placeholder='Write description about plant' onChange={(e) => {
                        setDescription(e.target.value.toLowerCase());
                    }}></textarea>
                    <div className={styles.btnContainer}>
                        <div className={styles.btn1} onClick={() => {
                            navigate("/upload");
                        }}>Previous</div>
                        <div className={styles.btn2} onClick={() => {
                            CreatePostfunc({ variables: { details: { "description": description, "images": images } } })
                            alert("Thanku")
                            navigate("/")

                        }}>Submit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
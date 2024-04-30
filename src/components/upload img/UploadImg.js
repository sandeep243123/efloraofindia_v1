import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.css'
import img from './t1.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { gql, useMutation } from "@apollo/client";

export default function UploadImg(props) {
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [path, setPath] = useState('')
    const fileInputRef = useRef(null)
    const btnRef = useRef()
    const labelRef = useRef()
    const navigate = useNavigate();
    const notifySuccess = (msg) => {
        toast.success(` ${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Success'
        });
    }
    const notifyError = (msg) => {
        toast.error(` ${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            containerId: 'Error'
        });
    }
    const notifyWarning = (msg) => {
        toast.warning(` ${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Warning'
        });
    }
    function selectFiles() {
        fileInputRef.current.click();
    }

    function onFileSelect(event) {
        const files = event.target.files;
        if (files.length === 0) {
            return
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);

                reader.onload = () => {
                    const p = reader.result
                    setImages((prevImages) => [
                        ...prevImages, p
                    ]);
                }

            }
            notifySuccess("Image uploaded Successfully");
        }
    }

    function deleteImage(index) {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
        notifyWarning("Image deleted Successfully");
    }


    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";

    }
    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }
    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files
        const x = []

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const p = reader.result
                setImages((prevImages) => [
                    ...prevImages, p
                ]);
            }
            notifySuccess("Image uploaded Successfully");
        }
    }

    useEffect(() => {
        if (images.length < 3) {
            labelRef.current.style.display = "inline"
            setPath('')
        } else {
            labelRef.current.style.display = "none"
            setPath('/next')
        }
    })



    const [description, setDescription] = useState("");

    const createpostmut = gql`
    mutation CreatePost($details: PostCreateRequest!) {
        createPost(details: $details)
      }
`
    const [CreatePostfunc] =
        useMutation(createpostmut, {
            onCompleted: (data) => {
                notifySuccess("Successfully Uploaded")
                navigate("/")
            },
            onError: (error) => {
                console.error('Error signing up:', error.message);
                notifyError(error.message)
            }
        })

    return (
        <div className={styles.parent}>
            <img src={img} alt="" />
            <div className={styles.container}>
                <div>
                    <h1 className={styles.uploadT}>Upload Images</h1>
                    <div className={styles.card}>
                        <div className={styles.dragArea} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                            {
                                isDragging ? (
                                    <span className={styles.select}>
                                        drop images here
                                    </span>
                                ) : (
                                    <p>
                                        Drag & Drop images here {" "}
                                        <span className={styles.select} role='button' onClick={selectFiles}>
                                            Browse
                                        </span>
                                    </p>
                                )
                            }
                            <input name='file' type="file" className={styles.file} accept='image/*' multiple ref={fileInputRef} onChange={onFileSelect} />
                        </div>
                    </div>
                    <label htmlFor="" ref={labelRef} style={{ color: 'orange' }}>*Please upload atleast 3 images</label>
                    <div className={styles.imgContainer}>
                        {
                            images.map((images, index) => (
                                <div className={styles.image} key={index}>
                                    <span className={styles.delete} onClick={() => deleteImage(index)}>&times;</span>
                                    <img src={images} alt={images.name} />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.desc}>Description</div>
                    <textarea name="txtArea" id="" cols="10" rows="5" className={styles.tt} placeholder="Write description.." onChange={(e) => {
                        setDescription(e.target.value);
                    }}></textarea>
                    <div className={styles.btnSection}>
                        <Link to={'contribute'}><buttot className={styles.submit} onClick={() => {
                            CreatePostfunc({ variables: { details: { "description": description, "images": images } } })
                        }}>Submit</buttot></Link>
                    </div>
                </div>
            </div>

            <ToastContainer containerId="Success" />
            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning" />
        </div >
    )
}

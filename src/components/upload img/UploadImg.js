import React, { useState, useRef, useEffect, useContext } from 'react'
import styles from './style.module.css'
import img from './t1.png'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from '../../services/AuthContext.js';

export default function UploadImg(props) {
    const { logout } = useContext(AuthContext);
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [path, setPath] = useState('');
    const fileInputRef = useRef(null);
    const btnRef = useRef();
    const labelRef = useRef();
    const navigate = useNavigate();

    const notifySuccess = (msg) => {
        toast.success(` ${msg}!`, {
            position: "top-right",
            autoClose: 700,
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
        const files = Array.from(event.target.files);

        if (images.length + files.length > 4) {
            notifyError("You can upload a maximum of 4 images.");
            return;
        }

        files.forEach((file) => {
            if (file.type.split('/')[0] !== 'image') return;
            if (!images.some((e) => e.name === file.name)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    setImages((prevImages) => [...prevImages, reader.result]);
                }

                notifySuccess("Image uploaded Successfully");
            }
        });
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
        const files = Array.from(event.dataTransfer.files);

        if (images.length + files.length > 4) {
            notifyError("You can upload a maximum of 4 images.");
            return;
        }

        files.forEach((file) => {
            const fileType = file.name.substring(file.name.indexOf(".") + 1);
            if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png") {
                notifyError(`.${fileType} Image format not supported!!`);
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setImages((prevImages) => [...prevImages, reader.result]);
            }
            notifySuccess("Image uploaded Successfully");
        });
    }

    useEffect(() => {
        // Set a condition to disable/enable the submit button or show a warning
        if (images.length < 2 || images.length > 4) {
            labelRef.current.style.display = "inline";
        } else {
            labelRef.current.style.display = "none";
        }
    }, [images]);

    const [description, setDescription] = useState("");

    const createpostmut = gql`
        mutation CreatePost($details: PostCreateRequest!) {
            createPost(details: $details)
        }
    `;

    const [CreatePostfunc] = useMutation(createpostmut, {
        errorPolicy: "all",
        onCompleted: (data) => {
            notifySuccess("Successfully Posted");
            setTimeout(() => {
                navigate("/")
            }, 1000);
        },
        onError: (error) => {
            console.error('Error:', error.message);
            notifyError(error.message);
            if (error.graphQLErrors[0].code === 601) {
                setTimeout(() => {
                    logout();
                }, 1000);
            }
        }
    });

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
                            <input name='file' type="file" className={styles.file} accept='image/jpg,image/jpeg,image/png' multiple ref={fileInputRef} onChange={onFileSelect} />
                        </div>
                    </div>
                    <label htmlFor="" ref={labelRef} style={{ color: 'orange' }}>*Please upload between 2 to 4 images</label>
                    <div className={styles.imgContainer}>
                        {
                            images.map((image, index) => (
                                <div className={styles.image} key={index}>
                                    <span className={styles.delete} onClick={() => deleteImage(index)}>&times;</span>
                                    <img src={image} alt={`uploaded-${index}`} />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.desc}>Description</div>
                    <textarea name="txtArea" id="" cols="10" rows="5" className={styles.tt} placeholder="Write description.." onChange={(e) => setDescription(e.target.value)}></textarea>
                    <div className={styles.btnSection}>
                        <button className={styles.submit} onClick={() => {
                            if (description === '' && images.length < 2) {
                                notifyWarning("Provide at least 2 images and a description");
                            } else if (images.length < 2) {
                                notifyWarning("Please upload at least 2 images");
                            } else if (images.length > 4) {
                                notifyWarning("You can upload a maximum of 4 images.");
                            } else if (description === '') {
                                notifyWarning("Please provide the description");
                            } else {
                                CreatePostfunc({ variables: { details: { "description": description, "images": images } } });
                            }
                        }}>Submit</button>
                    </div>
                </div>
            </div>

            <ToastContainer containerId="Success" />
            <ToastContainer containerId="Error" />
            <ToastContainer containerId="Warning" />
        </div>
    )
}


import React, { useState, useRef, useEffect, useContext } from 'react';
import styles from './style.module.css';
import img from './t1.png';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from '../../services/AuthContext.js';

export default function UploadImg(props) {
    const { logout } = useContext(AuthContext);
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const labelRef = useRef();

    const notifySuccess = (msg) => {
        toast.success(`${msg}!`, {
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
    };

    const notifyError = (msg) => {
        toast.error(`${msg}!`, {
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
    };

    const notifyWarning = (msg) => {
        toast.warning(`${msg}!`, {
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
    };

    function selectFiles() {
        fileInputRef.current.click();
    }

    async function checkImageSimilarity(files) {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        try {
            const response = await fetch('/api/check-similarity', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.similar) {
                notifyError("Similar images detected. Please upload different images.");
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error during image similarity check:', error);
            notifyError("Failed to check image similarity.");
            return false;
        }
    }

    async function onFileSelect(event) {
        const files = Array.from(event.target.files);

        if (images.length + files.length > 4) {
            notifyError("You can upload a maximum of 4 images.");
            return;
        }

        const areImagesUnique = await checkImageSimilarity(files);
        if (!areImagesUnique) return;

        files.forEach((file) => {
            if (file.type.split('/')[0] !== 'image') return;
            if (!images.some((e) => e.name === file.name)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => {
                    setImages((prevImages) => [...prevImages, reader.result]);
                };

                notifySuccess("Image uploaded Successfully");
            }
        });
    }

    async function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = Array.from(event.dataTransfer.files);

        if (images.length + files.length > 4) {
            notifyError("You can upload a maximum of 4 images.");
            return;
        }

        const areImagesUnique = await checkImageSimilarity(files);
        if (!areImagesUnique) return;

        files.forEach((file) => {
            const fileType = file.name.substring(file.name.indexOf(".") + 1);
            if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png") {
                notifyError(`${fileType} Image format not supported!!`);
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setImages((prevImages) => [...prevImages, reader.result]);
            };
            notifySuccess("Image uploaded Successfully");
        });
    }

    useEffect(() => {
        if (images.length < 2) {
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

            // Reset the form by clearing the images and description state
            setImages([]); // Clear uploaded images
            setDescription(""); // Clear description text
        },
        onError: (error) => {
            console.error('Full Error Object:', error);
            notifyError(error.message);

            // Handle GraphQL errors safely
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                const graphqlError = error.graphQLErrors[0]; // Safe access to the first error
                const graphqlErrorCode = graphqlError?.code;

                if (graphqlErrorCode === 601) {
                    setTimeout(() => {
                        logout();
                    }, 1000);
                }
            } else if (error.networkError) {
                console.error('Network Error:', error.networkError);
                notifyError('A network error occurred. Please check your connection.');
            } else {
                notifyError('An unexpected error occurred. Please try again.');
            }
        }
    });

    useEffect(() => {
    
        const handleBeforeUnload = (e) => {
            const confirmationMessage = 'Are you sure you want to leave? Your changes will not be saved.';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);



    function getWordCount(text) {
        return text.trim().split(/\s+/).length;
    }

    return (
        <div className={styles.parent}>
            <img src={img} alt="" />
            <div className={styles.container}>
                <div>
                    <h1 className={styles.uploadT}>Upload Images</h1>
                    <div className={styles.card}>
                        <div
                            className={`${styles.dragArea} ${isDragging ? styles.dragActive : ''}`}
                            onDragOver={(e) => {
                                e.preventDefault(); // Prevent default behavior
                                setIsDragging(true); // Show drag feedback
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={onDrop}
                        >
                            {
                                isDragging ? (
                                    <span className={styles.select}>
                                        Drop images here
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
                            <input
                                name='file'
                                type="file"
                                className={styles.file}
                                accept='image/jpg,image/jpeg,image/png'
                                multiple
                                ref={fileInputRef}
                                onChange={onFileSelect}
                            />
                        </div>
                    </div>
                    <label htmlFor="" ref={labelRef} style={{ color: 'orange' }}>*Please upload between 2 to 4 images</label>
                    <div className={styles.imgContainer}>
                        {
                            images.map((image, index) => (
                                <div className={styles.image} key={index}>
                                    <span className={styles.delete} onClick={() => setImages(images.filter((_, i) => i !== index))}>&times;</span>
                                    <img src={image} alt={`uploaded-${index}`} />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.desc}>Description</div>
                    <textarea
                        name="txtArea"
                        cols="10"
                        rows="5"
                        className={styles.tt}
                        placeholder="Write description.."
                        value={description} // Bind the value to the description state
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>

                    <div className={styles.btnSection}>
                        <button className={styles.submit} onClick={() => {
                            const wordCount = getWordCount(description);
                            if (wordCount < 10) {
                                notifyWarning("Please provide a description of at least 10 words.");
                            } else if (images.length < 2) {
                                notifyWarning("Please upload at least 2 images");
                            } else if (images.length > 4) {
                                notifyWarning("You can upload a maximum of 4 images.");
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
    );
}

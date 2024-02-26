import React, { useState, useRef } from 'react'
import styles from './style.module.css'
import img from '../assets/img1.png'
import { Link } from 'react-router-dom'
import Next from '../uploadNext/Next'
export default function UploadImg(props) {
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)
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
                setImages((prevImages) => [
                    ...prevImages, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    }
    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files
        const x = []
        for (let i = 0; i < files.length; i++) {
            x.push({ name: files[i].name, url: URL.createObjectURL(files[i]) })

        }
        setImages(x)
    }
    function deleteImage(index) {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
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

    return (
        <div className={styles.parent}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.leftContainer}>
                        <div className={styles.k1}>
                            <div className={styles.k11}>
                                <p style={{ color: "black", backgroundColor: "white" }}>1</p>
                                <p >2</p>
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
                    <div className={styles.card}>
                        <div className={styles.dragArea} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                            {
                                isDragging ? (
                                    <span className={styles.select}>
                                        drop images here
                                    </span>

                                ) : (
                                    <>
                                        Drag & Drop images here {" "}
                                        <span className={styles.select} role='button' onClick={selectFiles}>
                                            Browse
                                        </span>
                                    </>
                                )
                            }
                            <input name='file' type="file" className={styles.file} accept='image/*' multiple ref={fileInputRef} onChange={onFileSelect} />
                        </div>
                    </div>
                    <div className={styles.imgContainer}>
                        {
                            images.map((images, index) => (
                                <div className={styles.image} key={index}>
                                    <span className={styles.delete} onClick={() => deleteImage(index)}>&times;</span>
                                    <img src={images.url} alt={images.name} />
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles.btnContainer}>
                        <div className={styles.btn1}>Previous</div>
                        <Link to={'/next'}><div className={styles.btn2} onClick={() => props.setData(images)}>Next</div></Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

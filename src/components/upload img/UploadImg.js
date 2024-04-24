import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.css'
import img from './t1.png'
import { Link } from 'react-router-dom'
export default function UploadImg(props) {
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [path, setPath] = useState('')
    const fileInputRef = useRef(null)
    const btnRef = useRef()
    const labelRef = useRef()
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

    useEffect(() => {
        if (images.length < 3) {
            labelRef.current.style.display = "inline"
            setPath('')
        } else {
            labelRef.current.style.display = "none"
            setPath('/next')
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
                                    <img src={images.url} alt={images.name} />
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.desc}>Description</div>
                    <textarea name="txtArea" id="" cols="10" rows="5" className={styles.tt} placeholder="Write description.."></textarea>
                    <div className={styles.btnSection}>
                        <Link to={'contribute'}><buttot className={styles.submit}>Submit</buttot></Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

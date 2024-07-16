import React, { useEffect, useState,useContext } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import styles from '../showPosts/style.module.css';
import Contribute from '../contribute/Contribute.js';
import img1 from './a1.jpg';
import img from '../assets/t1.png'
import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../services/AuthContext.js';

function ShowPost() {

    const [postinfo, setpost] = useState(null);
    
    const {logout} = useContext(AuthContext);
    
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
    const detailVar = {
        details: {
            "showMyPosts": false
        }
    }

    const [pList, setpList] = useState([]);

    const { data } = useQuery(gql`
        query GetPosts($details: searchQuery) {
            getPosts(details: $details) {
            createdAt
            description
            imagesLink
            postID
            }
        }
    `, {
        onCompleted: (data) => {
            setpList(data["getPosts"])
        },
        variables: detailVar
        ,
        onError: (error) => {

            console.error('Error:', error.message);
                notifyError(error.message)
                if(error.message==="Please Login First !!!")
                {
                    logout();
                }
        }
    });

    const [getpList] = useLazyQuery(gql`
        query GetPosts($details: searchQuery) {
            getPosts(details: $details) {
            createdAt
            description
            imagesLink
            postID
            postedBy
            }
        }
        `, {
        onCompleted: (data) => {
            setpList(data["getPosts"])
        },
        onError: (error) => {
           console.error('Error:', error.message);
                notifyError(error.message)
                if(error.message==="Please Login First !!!")
                {
                    logout();
                }
        }

    })


    useEffect(() => {
        if (data)
            getpList({
                variables: {
                    details: {
                        "showMyPosts": false
                    }
                }
            })
    }, [data]);



    return (
        <div className={styles.top} >
            <img src={img} className={styles.im1} alt="" />
            <img src={img} className={styles.im1} alt="" />
            <div className={styles.parent1}>
                <div className={styles.listOptions}>
                    <input type="text" className={styles.search} placeholder='Search Obsevation' onChange={(e) => {
                        if (e.target.value.length > 0)
                            getpList({ variables: { details: { "showMyPosts": false, "searchText": e.target.value } } });
                        else
                            getpList({ variables: { details: { "showMyPosts": false } } });
                    }} />
                </div>

                <ul className={styles.listContainer}>
                    {
                        pList?.map((post) => (
                            <Link
                                to={{ pathname: `/showposts/${post.postID}` }}

                                state={{ postinfo: post }}>

                                <li className={styles.listItem}>
                                    <img src={`https://eflora.vangyaan.com/images/${post.imagesLink[0]}`} alt='r2'></img>
                                    <div className={styles.itemContent}>
                                        <h3>{post.postedBy}</h3>
                                        <p>{post.description}</p>
                                    </div>
                                </li>
                            </Link>
                        ))
                    }
                </ul>


            </div>
            
            <ToastContainer containerId="Error" />
        </div >
    )
}

export default ShowPost
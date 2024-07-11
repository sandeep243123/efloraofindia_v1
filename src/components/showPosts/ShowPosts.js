import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import styles from '../showPosts/style.module.css';
import Contribute from '../contribute/Contribute.js';
import img1 from './a1.jpg';
import img from '../assets/t1.png'
import { Link } from 'react-router-dom';
function ShowPost() {

    const [postinfo, setpost] = useState(null);

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
        </div >
    )
}

export default ShowPost
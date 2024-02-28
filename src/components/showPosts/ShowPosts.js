import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import styles from '../showPosts/style.module.css';
import Contribute from '../contribute/Contribute.js';
import img1 from '../a1.jpg';
function ShowPost() {

    const [postinfo, setpost] = useState(null);
    const detailVar = {
        details: {
            "searchText": "",
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
        postedBy
        }
    }
`, {

        onCompleted: (data) => {
            setpList(data["getPosts"])
        },
        variables: detailVar
        ,
        onError: (error) => {
            console.error('Error signing up:', error.message);

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
            console.error('Error signing up:', error.message);

        }

    })


    useEffect(() => {
        if (data)
            getpList({
                variables: {
                    details: {
                        "searchText": "",
                        "showMyPosts": false
                    }
                }
            })
    }, [data]);



    return (

        <div >
            {postinfo != null && <Contribute postInfo={postinfo} />}
            <div className={styles.parent1}>
                {
                    <ul className={styles.listContainer}>
                        <div className={styles.listOptions}>
                            <input type="text" className={styles.search} placeholder='Search Obsevation' />
                            <div className={styles.filterContainer}>
                                <p>Sort by:</p>
                                <select name="filters">
                                    <option value="Recently">Recently Uploaded</option>
                                    <option value="Recently">Verified Obsevation</option>
                                    <option value="Recently">Pending Obsevation</option>
                                    <option value="Recently">Ascending order</option>
                                    <option value="Recently">Descending order</option>
                                </select>
                            </div>
                        </div>
                        {
                            pList?.map((post) => (

                                <li className={styles.listItem} style={{ display: 'flex', flexDirection: 'row', listStyleType: 'none', padding: 0, marginRight: '10px' }} onClick={() => {
                                    setpost(post)
                                }}>

                                    <img src={img1} alt='r2' className={styles.listImage}></img>


                                    <div className={styles.itemContent}>
                                        <h3 className={styles.itemTitle}>{post.postedBy}</h3>
                                        <p className={styles.itemDesc}>{post.description}</p>
                                    </div>

                                </li>
                            ))
                        }
                    </ul>
                }

            </div>
        </div >



    )
}

export default ShowPost
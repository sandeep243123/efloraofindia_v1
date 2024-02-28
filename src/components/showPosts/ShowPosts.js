import { Link, useNavigate, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import styles from '../showPosts/showPosts.css';
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
            <div className="parent1">
                {
                    <ul>
                        {
                            pList?.map((post) => (

                                <li className="d2" style={{ display: 'flex', flexDirection: 'row', listStyleType: 'none', padding: 0, marginRight: '10px' }} onClick={() => {
                                    setpost(post)
                                }}>

                                    <img src={img1} alt='r2'></img>


                                    <h3>{post.postedBy}</h3>
                                    <p>{post.description}</p>

                                </li>
                            ))
                        }
                    </ul>
                }

            </div>
        </div>



    )
}

export default ShowPost
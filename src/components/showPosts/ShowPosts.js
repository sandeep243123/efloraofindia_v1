import React, { useState, useEffect } from 'react'
import '../showPosts/showPosts.css'
import { Link } from 'react-router-dom'
import Query from "../../graphql_queries/graphql_queries.js"
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

export default function ShowPosts() {
    const detailVar = {
        details: {
            "searchText": "",
            "showMyPosts": false
        }
    }

    const [pList, setpList] = useState([]);
    const { data } = useQuery(gql`
    {
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

    const [getpList] = useLazyQuery(Query.getpostquery, {
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

    // return
    // (
    //     <div>
    //         Hello
    //     </div>
    // )
}

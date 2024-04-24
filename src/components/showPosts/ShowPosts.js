import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import styles from '../showPosts/style.module.css';
import Contribute from '../contribute/Contribute.js';
import img1 from './a1.jpg';
import img from '../assets/t1.png'
import { Link } from 'react-router-dom';
function ShowPost() {

    const [postinfo, setpost] = useState(null);
    //     const detailVar = {
    //         details: {
    //             "searchText": "",
    //             "showMyPosts": false
    //         }
    //     }

    //     const [pList, setpList] = useState([]);
    //     const { data } = useQuery(gql`
    //     query GetPosts($details: searchQuery) {
    //         getPosts(details: $details) {
    //         createdAt
    //         description
    //         imagesLink
    //         postID
    //         // postedBy
    //         }
    //     }
    // `, {

    //         onCompleted: (data) => {
    //             setpList(data["getPosts"])
    //         },
    //         variables: detailVar
    //         ,
    //         onError: (error) => {
    //             console.error('Error signing up:', error.message);

    //         }
    //     });

    //     const [getpList] = useLazyQuery(gql`
    //     query GetPosts($details: searchQuery) {
    //         getPosts(details: $details) {
    //         createdAt
    //         description
    //         imagesLink
    //         postID
    //         // postedBy
    //         }
    //     }
    //     `, {
    //         onCompleted: (data) => {
    //             setpList(data["getPosts"])
    //         },
    //         onError: (error) => {
    //             console.error('Error signing up:', error.message);

    //         }

    //     })


    //     useEffect(() => {
    //         if (data)
    //             getpList({
    //                 variables: {
    //                     details: {
    //                         "searchText": "",
    //                         "showMyPosts": false
    //                     }
    //                 }
    //             })
    //     }, [data]);



    return (
        <div className={styles.top} >
            <img src={img} className={styles.im1} alt="" />
            <img src={img} className={styles.im1} alt="" />
            <div className={styles.parent1}>
                <div className={styles.listOptions}>
                    <input type="text" className={styles.search} placeholder='Search Obsevation' />
                    {/* <div className={styles.filterContainer}>
                        <p>Sort by:</p>
                        <select name="filters">
                            <option value="Recently">Recently Uploaded</option>
                            <option value="Recently">Verified Obsevation</option>
                            <option value="Recently">Pending Obsevation</option>
                            <option value="Recently">Ascending order</option>
                            <option value="Recently">Descending order</option>
                        </select>
                    </div> */}
                </div>

                <ul className={styles.listContainer}>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quaerat voluptatem placeat omnis perspiciatis, iure tempora harum sint, fuga illo id, unde laboriosam odio excepturi doloribus cupiditate reiciendis eum aperiam?</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, distinctio, possimus sit vero placeat eaque minima vel assumenda necessitatibus nisi labore voluptatibus a. Et neque itaque corrupti sit modi tempora?</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dignissimos dolor, minima voluptas excepturi porro. Suscipit molestias mollitia, perferendis totam accusamus beatae necessitatibus enim voluptatem nam quas ipsam inventore cupiditate!</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ipsum eos ipsam voluptate nam, quia rerum laborum veniam temporibus praesentium nulla, qui vel non suscipit soluta nesciunt impedit odit. Nesciunt.
                                </p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima eum repudiandae quibusdam vero ad accusantium tempore, cupiditate beatae quis quo nobis aspernatur fuga veritatis ea aliquam minus repellat expedita atque?</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem labore tempora optio, libero nostrum voluptates, ut numquam odit sapiente reiciendis dolore deserunt fuga cum saepe error cumque accusantium dolorum at.</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis ad ut ratione doloribus sequi cumque sapiente repellat laudantium, qui temporibus, explicabo ullam quidem perspiciatis odit rem facilis non eveniet similique.</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero quis quaerat, adipisci iste, dignissimos magnam quisquam quae molestiae debitis nostrum exercitationem, iure iusto. Repellendus quae cum commodi ipsam aperiam exercitationem.</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quod nesciunt praesentium dolorum velit aut reprehenderit, alias vero quisquam delectus magni! Iusto illum quia magni. Eos nisi ipsam beatae odio.</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus possimus ullam ipsum suscipit sed incidunt ea temporibus! Nemo odio distinctio quibusdam, aspernatur aliquid maiores ad soluta cupiditate commodi hic autem!</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit officiis mollitia vitae tempora illum voluptatibus, unde deleniti quam modi fugit, natus qui eaque architecto aspernatur excepturi! Totam voluptas tempora ipsa?</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quia facilis repellendus aspernatur a! Velit corporis officiis tempore eius sequi voluptates voluptas illum, ratione quasi molestias obcaecati odit nemo dolor.</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>This is flower with red color</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>This is flower with red color</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>This is flower with red color</p>
                            </div>
                        </li>
                    </Link>
                    <Link
                        to={'showposts'}>
                        <li className={styles.listItem}>
                            <img src={img1} alt='r2'></img>
                            <div className={styles.itemContent}>
                                <h3>Rose</h3>
                                <p>This is flower with red color</p>
                            </div>
                        </li>
                    </Link>
                </ul>


            </div>
        </div >
    )
}

export default ShowPost
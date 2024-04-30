// import { Navbar } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import style from './Contribute.module.css'
import Comments from '../comments/Comments';
import img1 from '../assets/t1.png';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import slide_image1 from '../assets/im1.jpg'
import slide_image2 from '../assets/im2.jpg'
import slide_image3 from '../assets/im3.jpg'
import slide_image4 from '../assets/im4.jpg'
import slide_image5 from '../assets/im5.jpg'
import slide_image6 from '../assets/im6.jpg'
import slide_image7 from '../assets/im7.jpg'
import slide_image8 from '../assets/im8.jpg'
import { IoSend } from "react-icons/io5";
import useFunction from './useFunction';
import { commentsData } from './commentsData';
import { Link, useLocation } from 'react-router-dom'
//import Comment from './Comment';

import pp from './pp.png';
import AddContribution from '../popup components/add contribution/AddContribution'
import ViewContribution from '../popup components/view contribution/ViewContribution'


export default function Contribute(props) {
  const { addComment, deleteComment } = useFunction();
  const [comments, setComments] = useState(commentsData)


  const handleAddComments = (commentId, comment) => {
    const updatedTree = addComment(comments, commentId, comment);
    setComments(updatedTree)
  }

  const handleCommentDelete = (commentId) => {
    const updatedTree = deleteComment(comments, commentId)
    setComments(updatedTree)
  }

  const [openAddContribution, setOpenAddContribution] = useState(false)
  const [openViewContribution, setOpenViewContribution] = useState(false)


  const location = useLocation();

  const { postinfo } = location.state || {};

  const [selectedImage, setSelectedImage] = useState(postinfo.imagesLink[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };


  const postID = postinfo.postID;
  console.log("postID", postID)

  const [input, setInput] = useState("");


  //   const [commentList,setCommentList]=useState(null)

  //   const { data } = useQuery(gql`
  //   query Query($details: getCommentV1Input) {
  //     getCommentsV1(details: $details)
  //   }
  // `, {
  //       onCompleted: (data) => {
  //         console.log("Comment",data)
  //           //setComments(data["getCommentsV1"])
  //       },
  //       variables: {details:{"postID":props.postID}}
  //       ,
  //       onError: (error) => {
  //           console.error('Error:', error.message);

  //       }
  //   });




  //   const addCommentMutation = gql`
  //   mutation PostComment($details: PostCommentRequest!) {
  //     postComment(details: $details)
  //   }
  //   `
  //   const [addComments] =
  //       useMutation(addCommentMutation, {
  //           onCompleted: (data) => {
  //              //console.log(data,"Success")
  //              setInput("")
  //              getComments({
  //               variables: {
  //                   details: {
  //                     "postID":props.postID
  //                   }
  //               }});
  //           },
  //           onError: (error) => {
  //               console.error('Error:', error.message);
  //           }
  //       })






  //       const deleteCommentMutation = gql`
  //       mutation DeleteComment($commentId: ID!) {
  //         deleteComment(commentID: $commentId)
  //       }
  //       `
  //       const [deleteComments] =
  //           useMutation(deleteCommentMutation, {
  //               onCompleted: (data) => {
  //                   console.log(data,"Success")
  //                   getComments({
  //                     variables: {
  //                         details: {
  //                           "postID":props.postID
  //                         }
  //                     }});

  //               },
  //               onError: (error) => {
  //                   console.error('Error:', error.message);
  //               }
  //           })



  //   const updateVotemutation = gql`
  //   mutation UpdateVote($details: updateVoteDetail!) {
  //     updateVote(details: $details)
  //   }`
  //   const [updatevotes] = useMutation(updateVotemutation,{
  //     onCompleted:(data)=>{

  //     },
  //     onError: (error) => {
  //       console.error('Error:', error.message);
  //   }
  //   })



  //   const [ getComments ] = useLazyQuery(gql`
  //   query Query($details: getCommentV1Input) {
  //     getCommentsV1(details: $details)
  //   }
  // `, {
  //       onCompleted: (data) => {
  //         console.log("commentlist",data)
  //         //setComments(data["getCommentsV1"])
  //       },
  //       onError: (error) => {
  //           console.error('Error:', error.message);
  //       }
  //   });




  //   useEffect(() => {
  //     if (data)
  //         getComments({
  //             variables: {
  //                 details: {
  //                   "postID":props.postID
  //                 }
  //             }
  //         })
  // }, [data]);



  //     const handleInsertNode = (folderId, item) => {

  //         if(folderId=="")
  //         {
  //             addComments({ variables: { details: {"postID":postID,"commentText":item}}})
  //         }
  //         else
  //         {
  //           addComments({ variables: { details: {"postID":postID,"commentText":item,"repliedTo":folderId}}})
  //         }

  //     };

  //     const handleDeleteNode = (folderId) => {
  //       console.log("delete the node",folderId)
  //       deleteComments({ variables: {"commentId": folderId}})


  //     };

  //     const handlevote=(commentid,action)=>{
  //       console.log("handle vote: ",action ," ",commentid)
  //       updatevotes({variables:{details: {
  //         "action": action,
  //         "commentID":commentid
  //       }}})
  //     }


  return (
    <div className={style.wrapper}>
      <div className={style.imageAndDesc}>
        <div className={style.imageGallary}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={'auto'}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            className={style.swiper_container + " " + style.tt}
            style={{ backgroundColor: 'white' }}
          >
            {
              postinfo.imagesLink.map((image, index) => (
                <SwiperSlide><img className={style.slide_img} src={`https://eflora.vangyaan.com/images/${image}`} alt="" /></SwiperSlide>))
            }
          </Swiper>
        </div>
        <div className={style.tt + " " + style.tt1}>
          <h1>Discussion</h1>
          <div className={style.commentParent}>
            {/* <div className={style.commentContainer}>
              <Comment comments={comments} handleAddComments={handleAddComments} handleCommentDelete={handleCommentDelete}></Comment>
              
            </div>
            <div className={style.discussionFooter}>
              <input type="text" placeholder='comment here..' value={input}
              onChange={(e) => setInput(e.target.value)}/>
              <div className={style.cicon} onClick={() => handleInsertNode("", input)}>
                <IoSend style={{ width: '100%', height: '100%' }}></IoSend>
              </div>
            </div> */}
            <div className={style.commentContainer}>
              <Comments postID={postinfo.postID}></Comments>
            </div>
          </div>
        </div>
      </div>
      <div className={style.imageInfo}>
        <div className={style.info}>
          <h1>Plant information</h1>
          <hr />
          <div className={style.iDetails}>
            <div className={style.irow}>
              <p>Posted By:</p>
              <p>{postinfo.postedBy}</p>
            </div>
            <div className={style.irow}>
              <p>Date:</p>
              <p>{postinfo.createdAt}</p>
            </div>
            <div className={style.irow}>
              <p>Description</p>
              <p>{postinfo.description}</p>
            </div>

          </div>

        </div>
        <div className={style.infoRight}>

          <h1>Suggest an identification</h1>
          <hr />
          <div className={style.profileSection}>
            <div className={style.pimg}>
              <img src={pp} alt="" />
              <div className={style.pif}>
                <p>graydarby</p>
                <p>23 observations </p>
              </div>
            </div>

          </div>
          <div className={style.status}>
            <p>Status : </p>
            <p>Not Verified</p>
          </div>
          <div className={style.btnSection}>
            <div className={style.add}>
              <p onClick={() => setOpenAddContribution(true)}>Add Contribution</p>
            </div>
            <div className={style.add}>
              <p onClick={() => setOpenViewContribution(true)}>View Contribution</p>
            </div>
          </div>
          {openAddContribution && <AddContribution closeAddContribution={setOpenAddContribution} postID={postinfo.postID} ></AddContribution>}
          {openViewContribution && <ViewContribution closeViewContribution={setOpenViewContribution} postID={postinfo.postID}></ViewContribution>}
        </div>
      </div>

    </div >
  )
}

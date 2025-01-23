import React, { useState, useEffect } from 'react';
import "./PostStatus.css";
import ModalComponent from "../modal/ModalComponent";
import { postStatus, getStatus, updatePost, updateCommentsWithNewName, getCurrentUser } from "../../../api/FirestoreAPI";
import PostsCard from "../postscard/PostsCard";
import { uploadPostImage } from '../../../api/ImageUpload';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import { getUniqueID } from '../../../helpers/getUniqueId';
import {useNavigate} from "react-router-dom"
import { Carousel } from 'antd';
import { HiUserPlus } from "react-icons/hi2";
// import ConnectedUsers from '../connectedusers/ConnectedUsers';

// const contentStyle = {
//   margin: 0,
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#364d79',
// };

function PostStatus({ currentUser }) {
  let navigate = useNavigate();
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");
  // const [allUsers, setAllUsers] = useState([]);

  const sendStatus = async () => {
    try {
      let object = {
        status: status,
        timestamp: getCurrentTimeStamp("LLL"),
        userEmail: currentUser.email,
        userName: currentUser.name,
        postID: getUniqueID(),
        userID: currentUser.id,
        postImage: postImage,
      };
      await postStatus(object);
      setModalOpen(false);
      setIsEdit(false);
      setStatus("");
    } catch (error) {
      console.error("Gabim gjatë postimit të statusit:", error);
    }
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = async () => {
    try {
      let updatedPost = {
        status: status,
        postImage: postImage,
      };
      await updatePost(currentPost.id, updatedPost);
      setModalOpen(false);
      setStatus("");
      setPostImage("");
      setCurrentPost({});
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };




  

  // // Fetch Users from Firestore
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const users = await getAllUsers();
  //       setAllUsers(users || []); // Sigurohuni që allUsers është një array
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  // // Log Users data for debugging
  // useEffect(() => {
  //   console.log("All Users:", allUsers);
  // }, [allUsers]);

  // Fetch Posts
  useEffect(() => {
    getStatus(setAllStatus);
  }, []);

  const updateCommentsName = async () => {
    try {
      await updateCommentsWithNewName(currentUser.id, currentUser.name);
    } catch (error) {
      console.error("Error updating comments with new name:", error);
    }
  };

  useEffect(() => {
    updateCommentsName();
  }, [currentUser.name]);

  return (
    <div className="post-status-main">

      <div className="user-details">
        <div className="bgr_img">
        <img src={currentUser?.imageLink} alt="imageLink" />
        </div>
        <p className="name">{currentUser.name}</p>
        <p className="headline">{currentUser.headline}</p>
        <hr className='hr-textt' />
        <div className='user-detail-connection'   onClick={() => navigate("/connections")}>
          <div>
        <span>Connections</span> <br />
        <span>Grow your network</span>
        </div>
        <div><HiUserPlus/></div>
        </div>
        
      </div>


      <Carousel arrows infinite={false}>
        <div className="quick">
          <img src="https://media.licdn.com/media/AAYQAgSuAAgAAQAAAAAAACwog6StkzhzSlK17m4iY5d_Xg.png" alt="" />
          <p>Add your work experience and skills to show your strengths to recruiters.</p>
          <button
            className="btn-post-status-edit"
            onClick={() => navigate("/profile")}
          >
            Update Profile
          </button>
        </div>
        <div className="quick">
          <img src="https://media.licdn.com/media/AAYQAgSuAAgAAQAAAAAAACnZ-D2hlcNzRqqPRb5a8tlJcA.png" alt="" />
          <p>Follow companies you want to work for to get noticed by recruiters.</p>
          <button
            className="btn-post-status-edit"
            onClick={() => navigate("/connections")}
          >
            Start Following
          </button>
        </div>
      </Carousel>

      

      
      

      <div className="post-status">
        <img className="post-image" src={currentUser?.imageLink} alt="imageLink" />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a post
        </button>
      </div>

      <ModalComponent
        status={status}
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
      />

      <div >
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>

      {/* <div className="connections-section">
        {allUsers.map((users) => {
          return (
            <div key={users.id}>
              <ConnectedUsers
                users={users}
                currentUser={currentUser}
                getCurrentUser={getCurrentUser}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default PostStatus;

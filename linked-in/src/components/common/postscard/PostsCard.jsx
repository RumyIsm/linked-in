import React, {useMemo, useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import LikeButton from '../likebutton/LikeButton';
import { Button, Modal } from "antd";
import {EditOutlined } from "@ant-design/icons";
import { FaTrash } from "react-icons/fa6";
import {getCurrentUser, getAllUsers, deletePost, getConnections} from "../../../api/FirestoreAPI"
// import { useProfileImage } from '../../contexts/ProfileImageContext';

import "./PostsCard.css"

function PostsCard({posts, id, getEditData}) {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState ({});
    const [allUsers, setAllUsers] = useState ([]);
    const [isConnected, setIsConnected] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    

    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers);
      }, []);

    useEffect(() => {
        getConnections(currentUser.id, posts.userID, setIsConnected);
      }, [currentUser.id, posts.userID]);



    return isConnected || currentUser.id === posts.userID ? (
        <div className="posts-card" key={id}>
          <div className="post-image-wrapper">
            {currentUser.id === posts.userID ? (
              <div className="action-container">
                <EditOutlined
                  size={20}
                  className="action-icon"
                  onClick={() => getEditData(posts)}
                />
                <FaTrash
                  size={20}
                  className="action-icon"
                  onClick={() => deletePost(posts.id)}
                />
              </div>
            ) : (
              <></>
            )}
    
    <img
          alt="profile-image"
          className="profile-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : (
        <></>
      )}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
export default PostsCard

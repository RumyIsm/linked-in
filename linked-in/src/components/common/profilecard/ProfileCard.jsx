import React, { useState, useMemo } from "react";
import PostsCard from "../postscard/PostsCard";
import {
  getSingleStatus,
  getSingleUser,
  updatePost,
} from "../../../api/FirestoreAPI";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../fileuploadmodal/FileUploadModal";
import ModalComponent from "../modal/ModalComponent";
import { EditOutlined } from "@ant-design/icons";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";

import "./ProfileCard.css";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  console.log(currentProfile);
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);



 

  // const getEditData = (posts) => {
  //   setModalOpen(true);
  //   setModalType("editPost"); 
  //   setStatus(posts?.status);
  //   setCurrentPost(posts);
  //   setPostImage(posts?.postImage || "");
  // };

  // const updateStatus = async () => {
  //   try {
  //     let updatedPost = {
  //       status: status, // Përditëson shkrimin
  //       postImage: postImage, // Përditëson fotografinë
  //     };
  
  //     await updatePost(currentPost.id, updatedPost); // Kalo objektin e përditësuar
  //     setModalOpen(false);
  //     setStatus("");
  //     setPostImage("");
  //     setCurrentPost({});
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   }
  // };

  // useMemo(() => {
  //   if (location?.state?.id) {
  //     getSingleStatus(setAllStatus, location?.state?.id);
  //   }
  //   if (location?.state?.email) {
  //     getSingleUser(setCurrentProfile, location?.state?.email);
  //   }
  // }, [location]);

  // useMemo(() => {
  //   if (location?.state?.id) {
  //     getSingleStatus(setAllStatus, location?.state?.id);
  //   }

  //   if (location?.state?.email) {
  //     getSingleUser(setCurrentProfile, location?.state?.email);
  //   }
  // }, []);
  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
       <div className="prifile_container">
      <div className="profile-card">
       
      
        <div className="profile-info">
          <div>

            <div className="profile-back-image"></div>
            <div className="profile_style">
            <img
              className="profile-image-pro"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
           </div>
           <div className="right_left"></div>
           <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {/* {(currentUser.city || currentUser.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <></>
            )} */}
            {currentUser.website || currentProfile?.website ? (
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className="right-info">
                {currentUser.id === location?.state?.id ? (
                 <div className="edit-btn">
                <EditOutlined className="edit-icon" onClick={onEdit} />
                </div>
                 ) : (
                 <></>
                 )}
           
            {/* <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p> */}
            </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>
      </div>
      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts}/>
            </div>
          );
        })}
      </div>
    </>
  );
}



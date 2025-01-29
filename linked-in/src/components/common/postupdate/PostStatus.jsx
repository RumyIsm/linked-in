import React, { useState, useEffect } from "react";
import "./PostStatus.css";
import ModalComponent from "../modal/ModalComponent";
import {
  postStatus,
  getStatus,
  updatePost,
  updateCommentsWithNewName,
} from "../../../api/FirestoreAPI";
import PostsCard from "../postscard/PostsCard";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import { getUniqueID } from "../../../helpers/getUniqueId";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import { HiUserPlus } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

function PostStatus({ currentUser }) {
  const { t } = useTranslation("global");
  let navigate = useNavigate();
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

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
        postImage: postImage || currentPost?.postImage,
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
        <hr className="hr-textt" />
        <div
          className="user-detail-connection"
          onClick={() => navigate("/connections")}
        >
          <div>
            <span>{t("paragraph.postStatusOne")}</span> <br />
            <span>{t("paragraph.postStatusTwo")}</span>
          </div>
          <div>
            <HiUserPlus />
          </div>
        </div>
      </div>

      <Carousel arrows infinite={false}>
        <div className="quick">
          <img
            src="https://media.licdn.com/media/AAYQAgSuAAgAAQAAAAAAACwog6StkzhzSlK17m4iY5d_Xg.png"
            alt=""
          />
          <p>{t("carousel-p.carouselOne")}</p>
          <button
      className="btn-post-status-edit"
      onClick={() =>
        navigate("/profile", {
          state: {
            id: currentUser.id,
            email: currentUser.email,
          },
        })
      }
    >
            {t("carousel-btn.carouselOne")}
          </button>
        </div>
        <div className="quick">
          <img
            src="https://media.licdn.com/media/AAYQAgSuAAgAAQAAAAAAACnZ-D2hlcNzRqqPRb5a8tlJcA.png"
            alt=""
          />
          <p>{t("carousel-p.carouselTwo")}</p>
          <button
            className="btn-post-status-edit"
            onClick={() => navigate("/connections")}
          >
            {t("carousel-btn.carouselTwo")}
          </button>
        </div>
      </Carousel>

      <div className="post-status">
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          {t("button.postStatus")}
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

      <div>
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostStatus;

import React, { useState } from "react";
import ProfileCard from "./common/profilecard/ProfileCard";
import ProfileEdit from "./common/profileedit/ProfileEdit";

function ProfileComponent({ currentUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <ProfileEdit currentUser={currentUser} onEdit={onEdit} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  );
}

export default ProfileComponent;

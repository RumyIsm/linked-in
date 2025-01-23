import React, { useState, useMemo } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/topbar/Topbar";
import Profile from "../pages/Profile";


function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});


  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);



  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  );
}

export default ProfileLayout;

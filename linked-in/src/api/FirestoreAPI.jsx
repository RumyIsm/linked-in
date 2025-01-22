import { firestore } from "../firebaseConfig";
import { addDoc, collection,onSnapshot, doc, updateDoc, query, where, setDoc,deleteDoc,getDocs ,orderBy,
  serverTimestamp,} from "firebase/firestore";
import { toast } from "react-toastify";


let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");


export const postStatus = (object) => {
  
 addDoc (postsRef, object)
 .then((res) => {
  toast.success("Post has been added successfully")
 })
 .catch((err) => {
console.log(err)
 })
}

export const getStatus = (setAllStatus) => {
  onSnapshot(postsRef, (response) =>{
    setAllStatus(response.docs.map((docs) =>{
      return {...docs.data(), id: docs.id}
    }));
  })
}

export const postUserData = (object) => {
addDoc(userRef,object)
.then(()=> {})
.catch((err)=> {
  console.log(err)
})
}

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const editProfile = (userID, payload) => {
let userToEdit = doc(userRef,userID)

updateDoc(userToEdit, payload)
.then(()=> {
  toast.success("Profile has been updated successfully")
})
.catch((err)=> {
  console.log(err)
})
}

export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};



export const likePost = (userId, postId, liked) => {
  try {
        let docToLike = doc(likeRef, `${userId}_${postId}`);
        if(liked){
          deleteDoc(docToLike);
        }
        else{
          setDoc(docToLike, { userId, postId });
        }
      } catch (err) {
        console.log(err);
      }
};

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
      let likeQuery = query(likeRef, where("postId", "==", postId));
  
      onSnapshot(likeQuery, (response) => {
        let likes = response.docs.map((doc) => doc.data());
        let likesCount = likes?.length;
  
        const isLiked = likes.some((like) => like.userId === userId);
  
        setLikesCount(likesCount);
        setLiked(isLiked);
      });
    } 
    catch(err){
      console.log(err);
    }
  };


export const postComment = (postId, comment, timeStamp, name, userId) => {
  try {
addDoc(commentsRef, {
  postId, comment, timeStamp, name, userId,
} );
  }
  catch(err){
    console.log(err)
  }
};


export const getComments = (postId, setComments) => {
try {
let singlePostQuery = query(commentsRef, where("postId", "==", postId));

onSnapshot(singlePostQuery, (response) => {
  const comments = response.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  setComments(comments);
});
}catch(err) {
  console.log(err)
}
};

export const updatePost = async (id, updatedFields) => {
  let docToUpdate = doc(postsRef, id);
  try {
    await updateDoc(docToUpdate, updatedFields); // Përditëson të gjitha fushat
    toast.success("Post has been updated successfully!");
  } catch (err) {
    console.error("Error updating post:", err);
    toast.error("Failed to update the post.");
  }
};


export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userId, targetId) => {
  try {
        let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);
      
          setDoc(connectionToAdd, { userId, targetId });
          toast.success("Connection Added!");
       } catch (err) {
        console.log(err);
      }
};


export const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(connectionRef, where("targetId", "==", targetId));

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());
      

      const isConnected = connections.some((connection) => connection.userId === userId);

      setIsConnected(isConnected);
  
    });
  } 
  catch(err){
    console.log(err);
  }
};


export const updateCommentsWithNewName = async (userId, newName) => {
  try {
   
    const q = query(commentsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, { name: newName })
    );
    await Promise.all(updatePromises);
    console.log("Të gjitha komentet u përditësuan me emrin e ri.");
  } catch (err) {
    console.error("Gabim gjatë përditësimit të komenteve:", err);
  }
};












































// let postsRef = collection(firestore, "posts");
// let userRef = collection(firestore, "users");

// export const postStatus = async (object) => {
//     try {
//         await addDoc(postsRef, object);
//         toast.success("Post has been added successfully");
//     } catch (err) {
//         console.log("Error adding post:", err);
//         toast.error("Failed to add post");
//     }
// };

// export const getStatus = (setAllStatus) => {
//   const q = query(postsRef, orderBy("timeStamp"));
//   onSnapshot(q, (response) => {
//     setAllStatus(
//       response.docs.map((docs) => {
//         return { ...docs.data(), id: docs.id };
//       })
//     );E
//   });
// };

// export const postUserData = (object) => {
//   addDoc(userRef, object)
//     .then(() => {})
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const getCurrentUser = (setCurrentUser) => {
//   onSnapshot(userRef, (response) => {
//     setCurrentUser(
//       response.docs.map((docs) => {
//           return { ...docs.data(), id: docs.id };
//         })
//         .filter((item) => {
//           return item.email === localStorage.getItem("userEmail");
//         })[0]
//     );
//   });
// };

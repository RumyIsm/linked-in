import React,{useEffect,useState} from 'react'
import "../css/ConnectionsComponents.css";
import { getAllUsers, addConnection} from '../api/FirestoreAPI';
import ConnectedUsers from './common/connectedusers/ConnectedUsers';

function ConnectionsComponents({currentUser}) {
const [users, setUsers] = useState ([]);
const getCurrentUser = (id) => {
addConnection(currentUser.id, id)
}

useEffect(()=> {
getAllUsers(setUsers)
},[]);

return users.length > 1 ? (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
          />
        );
      })}
    </div>
  ) : (
    <div className="connections-main">No Connections to Add!</div>
  );
}

export default ConnectionsComponents

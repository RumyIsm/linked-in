import React, { useEffect, useState } from 'react';
import { getConnections } from '../../../api/FirestoreAPI';
import { UsergroupAddOutlined } from "@ant-design/icons";

function ConnectedUsers({ user, getCurrentUser, currentUser, }) {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        getConnections(currentUser.id, user.id, setIsConnected);
      }, [currentUser.id, user.id]);

    return isConnected ? (
        <></> 
    ) : (
        <div className='grid-child'>
             <img src={user.imageLink} />
            <p className='name'>{user.name}</p>
            <p className='headline'>{user.headline}</p>

            <button onClick={() => getCurrentUser(user.id)}>
                <UsergroupAddOutlined /> Connect
            </button>
        </div>
    );
}

export default ConnectedUsers;

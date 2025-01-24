import React, { useEffect, useState } from 'react';
import { getConnections } from '../../../api/FirestoreAPI';
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./ConnectedUsers.css"

function ConnectedUsers({ user, getCurrentUser, currentUser, }) {
    const [isConnected, setIsConnected] = useState(false);
      const { t, i18n } = useTranslation("global");

    useEffect(() => {
        getConnections(currentUser.id, user.id, setIsConnected);
      }, [currentUser.id, user.id]);

    return isConnected ? (
        <></> 
    ) : (
        <div  className='grid-child'>
             <img src={user.imageLink} />
            <p className='name'>{user.name}</p>
            <p className='headline'>{user.headline}</p>

            <button className='connection-btn' onClick={() => getCurrentUser(user.id)}>
                <UsergroupAddOutlined /> {t("button.connection")}
            </button>
        </div>
    );
}

export default ConnectedUsers;

import React, {useState, useMemo} from 'react'
import "./ProfilePopup.css"
// import { onLogout } from "../../../api/AuthAPI";
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import Button from '../button/Button';


function ProfilePopup() {
    let navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState ({});
    useMemo (() => {
        getCurrentUser(setCurrentUser);
    }, []);
    return (
        <div className='popup-card' >
            <p className='name'>{currentUser?.name}</p>
            <p className='headline'>{currentUser?.headline}</p>
            
            <Button 
            title="View Profile"
            onClick={() =>
                navigate ("/profile", {
                    state: {
                        id: currentUser?.id,
                    },
                })
            }
            />

            <Button title="Log out" onClick={() => navigate ("/")}/>
             </div>
    )
}

export default ProfilePopup

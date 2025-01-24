import React, {useState} from 'react'
import { editProfile } from '../../../api/FirestoreAPI';
import {CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./ProfileEdit.css"

function ProfileEdit({onEdit, currentUser}) {
    const [editInputs, setEditInputs] = useState(currentUser)
        const { t, i18n } = useTranslation("global");
    const getInput = (event) => {
        let {name, value} = event.target;
        let input = { [name]: value};
        setEditInputs({...editInputs, ...input})

    };

    const updateProfileData = async () => {
       
        await editProfile(currentUser?.id, editInputs);
        
        if (editInputs.name !== currentUser?.name) {
            await updateCommentsWithNewName(currentUser?.id, editInputs.name);
          }
        await onEdit();
    };

    return (
        <div className='profile-containerr'>
        <div className='profile-card'>
            
            <div className='edit-btn'>
            <CloseOutlined className='close-icon' onClick={onEdit} />
            </div>

            <div className='profile-edit-inputs'>
                <label>{t("label.profileEdit1")}</label>
            <input 
            style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.name}
            onChange={getInput} 
            className='common-input'  
            placeholder={t("label.profileEdit1")}
            name='name' />
            
            <label >{t("label.profileEdit2")}</label>
            <input
            style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.headline}  
            onChange={getInput} 
            className='common-input'  
            placeholder={t("label.profileEdit2")}
            name='headline' />

            

            <label>{t("label.profileEdit3")}</label> 

            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.website}  
            onChange={getInput} 
            className='common-input'  
            placeholder={t("label.profileEdit3")}
            name='website' />

            <label>{t("label.profileEdit4")}</label>
            <textarea
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            rows={5}
            className='common-textArea ' 
            placeholder={t("label.profileEdit4")} 
            onChange={getInput} 
            name='aboutMe' 
            value={editInputs.aboutMe}  /> 


            <label>{t("label.profileEdit5")}</label>
            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.skills}  
            onChange={getInput} 
            className='common-input'  
            placeholder={t("label.profileEdit5")}
            name='skills' />




            </div>

            <div className='save-container'>
            <button className='save-btn' onClick={updateProfileData}>{t("button.profileEdit")}</button>
            </div>
            </div>
        </div>
    )
}

export default ProfileEdit

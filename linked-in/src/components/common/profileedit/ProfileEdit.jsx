import React, {useState} from 'react'
import { editProfile } from '../../../api/FirestoreAPI';
import {CloseOutlined } from "@ant-design/icons";
import "./ProfileEdit.css"

function ProfileEdit({onEdit, currentUser}) {
    const [editInputs, setEditInputs] = useState(currentUser)
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
                <label>Name</label>
            <input 
            style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.name}
            onChange={getInput} 
            className='common-input'  
            placeholder='Name'
            name='name' />
            
            <label >Headline</label>
            <input
            style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.headline}  
            onChange={getInput} 
            className='common-input'  
            placeholder='Headline'
            name='headline' />

            {/* <label>Country</label>
            <input
            style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.country}  
            onChange={getInput} 
            className='common-input'  
            placeholder='Country'
            name='country' />

            <label>City</label>
            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.city}  
            onChange={getInput} 
            className='common-input'  
            placeholder='City'
            name='city' /> */}

           {/* <label>Company</label> 
            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.company}  
            onChange={getInput} 
            className='common-input'  
            placeholder='Company'
            name='company' /> */}
{/* 
            <label>Industry</label> 

            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.industry}  
            onChange={getInput} 
            className='common-input'  
            placeholder='Industry'
            name='industry' /> */}
            
            
            
            
            {/* <label>College</label> 

            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.college}  
            onChange={getInput} 
            className='common-input'  
            placeholder='College'
            name='college' /> */}

            <label>Website</label> 

            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.website}  
            onChange={getInput} 
            className='common-input'  
            placeholder='Website'
            name='website' />

            <label>About</label>
            <textarea
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            rows={5}
            className='common-textArea ' 
            placeholder='About Me' 
            onChange={getInput} 
            name='aboutMe' 
            value={editInputs.aboutMe}  /> 


            <label>Skills</label>
            <input
             style={{borderRadius:"10px", border:"1px solid  rgb(200, 200, 200)", color:" rgb(116, 115, 115)"}}
            value={editInputs.skills}  
            onChange={getInput} 
            className='common-input'  
            placeholder='Skills'
            name='skills' />




            </div>

            <div className='save-container'>
            <button className='save-btn' onClick={updateProfileData}>Save</button>
            </div>
            </div>
        </div>
    )
}

export default ProfileEdit

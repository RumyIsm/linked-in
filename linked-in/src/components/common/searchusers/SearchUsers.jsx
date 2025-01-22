import React from 'react'
import {CloseCircleOutlined} from "@ant-design/icons"
import "./SearchUsers.css";

function SearchUsers({setIsSearch, setSearchInput}) {
    return (
        <div className='search-users'>
            
            <input placeholder='Search Users...' onChange={(event)=> setSearchInput(event.target.value)} />
            <CloseCircleOutlined className='close-icon' onClick={()=> { 
                setIsSearch(false);
                setSearchInput("");
                }} />
        </div>
    )
}

export default SearchUsers

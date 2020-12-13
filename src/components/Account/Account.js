import React from 'react'
import './Account.css';
//components
import ProfileContent from './ProfileContent/ProfileContent'
import Sidebar from './Sidebar/Sidebar'

const Account = () => {
    return (
        <div className="account">
            <div className="account__wrapper">
                <Sidebar />
                <ProfileContent />
            </div>
        </div>
    )
}

export default Account

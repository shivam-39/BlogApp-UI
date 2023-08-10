import React, { useContext } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'


function Profile() {

    const userContextData = useContext(userContext);

    return (
        <Base>
            <div>Profile</div>
            <h1>Welcome to your profile {userContextData.user.name}</h1>
        </Base>
    )
}

export default Profile
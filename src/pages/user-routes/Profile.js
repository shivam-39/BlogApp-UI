import React, { useContext } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'


function Profile() {

    const user = useContext(userContext);

    return (
        <Base>
            <div>Profile</div>
            <h1>Welcome to your profile {user.name}</h1>
        </Base>
    )
}

export default Profile
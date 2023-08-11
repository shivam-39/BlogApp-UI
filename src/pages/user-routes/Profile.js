import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import ViewUserProfile from '../ViewUserProfile';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../services/user-service'
import { toast } from 'react-toastify';

function Profile() {

    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserById(userId).then(data => {
            setUserData(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error on loading data!");
        })
    }, [])

    return (
        <Base>
            {userData != null && <ViewUserProfile user={userData}></ViewUserProfile>}
        </Base>
    )
}

export default Profile
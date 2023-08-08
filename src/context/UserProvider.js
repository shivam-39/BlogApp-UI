import { useEffect, useState } from 'react';
import userContext from './userContext'
import { getCurrentUserData, isLoggedIn } from '../services/auth-service';

function UserProvider({ children }) {

    const [user, setUser] = useState({
        name: ''
    });

    useEffect(() => {
        setUser(getCurrentUserData());
    }, [])

    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider
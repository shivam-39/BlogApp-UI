import { useEffect, useState } from 'react';
import userContext from './userContext'
import { getCurrentUserData } from '../services/auth-service';

function UserProvider({ children }) {

    const [user, setUser] = useState({
        name: ''
    });

    useEffect(() => {
        setUser(getCurrentUserData());
    }, [])

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider
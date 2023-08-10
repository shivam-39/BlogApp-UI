import Base from "../components/Base"
import userContext from "../context/userContext";
import { useContext } from "react";

const Services = () => {

    const userContextData = useContext(userContext);

    return (
        <Base>
            <h1>Services Page</h1>
            <h1>Welcome {userContextData.user.name}</h1>
        </Base>
    )
}

export default Services;
import Base from "../components/Base"
import userContext from "../context/userContext";
import { useContext } from "react";

const Services = () => {

    const user = useContext(userContext);

    return (
        <Base>
            <h1>Services Page</h1>
            <h1>Welcome {user.name}</h1>
        </Base>
    )
}

export default Services;
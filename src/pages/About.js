import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () => {
    return (
        <userContext.Consumer>
            {(user) => (
                <Base>
                    <h1>This is about component</h1>
                    <h1>Blogging Website</h1>
                    <h1>Welcome {user.name} !!</h1>
                </Base>
            )}
        </userContext.Consumer>
    );
}

export default About;
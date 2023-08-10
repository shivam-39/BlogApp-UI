import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState, useContext } from "react";
import { toast } from 'react-toastify';
import { loginService } from "../services/user-service";
import { doLogin, getCurrentUserData } from "../services/auth-service";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {

    const userContextData = useContext(userContext);
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const resetLoginData = () => {
        setLoginData({
            username: "",
            password: ""
        });
    };

    const navigate = useNavigate();

    const handleChange = (event, field) => {
        // console.log(event.target.value);
        setLoginData({ ...loginData, [field]: event.target.value });
    };

    const submitForm = (event) => {
        event.preventDefault();
        // console.log(loginData);
        if (loginData.username === null || loginData.username.trim() === '') {
            toast.error("Email is required!");
            return;
        } else if (loginData.password === null || loginData.password.trim() === '') {
            toast.error("Password is required!");
            return;
        }
        loginService(loginData).then((data) => {
            // console.log(data);
            doLogin(data, () => {
                console.log("login data saved to localstorage");
            })
            toast.success("Login Success!");
            userContextData.setUser(getCurrentUserData());
            navigate("/user/dashboard");
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 400 || error.response.status === 404) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error occured in login!");
            }
        })
    }

    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Fill details to Login!!</h3>
                            </CardHeader>
                            <CardBody>
                                {/* creating form */}
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Type here..."
                                            required
                                            value={loginData.username}
                                            onChange={(e) => handleChange(e, 'username')}
                                        ></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Type here..."
                                            required
                                            value={loginData.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        ></Input>
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button color="light">Submit</Button>
                                        <Button
                                            color="secondary"
                                            className="ms-4"
                                            type="reset"
                                            style={{ minWidth: "80px" }}
                                            onClick={resetLoginData}
                                        >Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default Login;
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signupService } from "../services/user-service";
import { toast } from 'react-toastify';

const Signup = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        about: ''
    });

    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    // useEffect(() => {
    //     console.log(signupData);
    // }, [signupData]);

    const handleChange = (event, field) => {
        // console.log(event.target.value);
        setSignupData({ ...signupData, [field]: event.target.value });
    };

    const resetSignupData = () => {
        setSignupData({
            name: '',
            email: '',
            password: '',
            about: ''
        });
    };

    const submitForm = (event) => {
        event.preventDefault();
        // console.log(signupData);
        //validate
        // if (error.isError) {
        //     toast.error("Details entered are invalid!");
        //     setError({ ...error, isError: false });
        //     return;
        // }
        //api call
        signupService(signupData).then((resp) => {
            console.log(resp);
            toast.success("User registered success!");
        }).catch((error) => {
            console.log(error);
            toast.error("Error occured in registration!");
            setError({
                errors: error,
                isError: true
            })
            // console.log(JSON.parse(error.response.data.message));
        })
    }

    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    {/* {JSON.stringify(signupData)} */}
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Fill details to Register!!</h3>
                            </CardHeader>
                            <CardBody>
                                {/* creating form */}
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Type here..."
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={signupData.name}
                                            required
                                            invalid={error.errors?.response?.data?.name ? true : false}
                                        >
                                        </Input>
                                        <FormFeedback>{error.errors?.response?.data?.name}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Type here..."
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={signupData.email}
                                            required
                                            invalid={error.errors?.response?.data?.email ? true : false}
                                        >
                                        </Input>
                                        <FormFeedback>{error.errors?.response?.data?.email}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Type here..."
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={signupData.password}
                                            required
                                            invalid={error.errors?.response?.data?.password ? true : false}
                                        >
                                        </Input>
                                        <FormFeedback>{error.errors?.response?.data?.password}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="about">Enter About</Label>
                                        <Input
                                            id="about"
                                            type="textarea"
                                            rows={5}
                                            placeholder="Type here..."
                                            style={{ minWidth: "80px" }}
                                            onChange={(e) => handleChange(e, 'about')}
                                            value={signupData.about}
                                            invalid={error.errors?.response?.data?.about ? true : false}
                                        >
                                        </Input>
                                        <FormFeedback>{error.errors?.response?.data?.about}</FormFeedback>
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button color="light">Submit</Button>
                                        <Button
                                            color="secondary"
                                            className="ms-4"
                                            type="reset"
                                            style={{ minWidth: "80px" }}
                                            onClick={resetSignupData}
                                        >
                                            Reset
                                        </Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base >
    );
}

export default Signup;
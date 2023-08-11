import React from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap';
import userContext from '../context/userContext';
import { useContext } from 'react';

const ViewUserProfile = ({ user }) => {

    const userContextData = useContext(userContext);
    let currentUser = userContextData.user;

    return (
        <Row>
            <Col md={{ size: 6, offset: 3 }}>
                <Card className='mt-3'>
                    <CardBody>
                        <h3 className='text-uppercase text-center mb-3'>Profile Information</h3>
                        <Container className='text-center'>
                            <img className='img-fluid rounded-circle'
                                style={{ width: '200px', height: '200px' }}
                                src='/assets/default-profile-picture.png'
                                alt='default-profile'></img>
                        </Container>
                        <Table className='mt-4' bordered={true} responsive striped hover>
                            <tbody>
                                <tr>
                                    <td>
                                        USER ID
                                    </td>
                                    <td>
                                        NBA-{user.id}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        USERNAME
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        E-MAIL
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ROLE
                                    </td>
                                    <td>
                                        {user.roleSet.map(role => (
                                            <div key={role.id}>{role.name}</div>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ABOUT
                                    </td>
                                    <td>
                                        {user.about}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        {currentUser.id === user.id &&
                            <CardFooter className='text-center'>
                                <Button className='mt-3' color='warning'>Update Profile</Button>
                            </CardFooter>
                        }
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default ViewUserProfile
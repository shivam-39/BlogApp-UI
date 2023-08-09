import React from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost';
import ShowPostByUser from './ShowPostByUser';
import { Container } from 'reactstrap';

const UserDashboard = () => {
    return (
        <Base>
            <Container>
                <AddPost></AddPost>
                <ShowPostByUser></ShowPostByUser>
            </Container>
        </Base>
    );
};

export default UserDashboard;
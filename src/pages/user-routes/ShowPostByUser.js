import { React, useState, useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { getCurrentUserData } from '../../services/auth-service';
import { getAllPostByUser } from '../../services/post-service';
import { toast } from 'react-toastify'
import CardOfPost from '../../components/CardOfPost'
import { Link } from 'react-router-dom';

function ShowPostByUser() {

    const [userData, setUserData] = useState({
        name: ""
    });
    const [postByUserList, setPostByUserList] = useState([]);

    useEffect(() => {
        const u = getCurrentUserData();
        setUserData(u);
        getAllPostByUser(u.id).then(data => {
            setPostByUserList(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        })
    }, []);

    return (
        <div className='conatiner-fluid'>
            <Row className='mx-4'>
                <Col md={{ size: 12, offset: 0 }}>
                    <h3 className='text-center my-2'>Post by {userData.name}</h3>
                    {
                        postByUserList.map(p => (
                            <CardOfPost post={p} key={p.postId}></CardOfPost>
                        )
                        )}
                    {
                        postByUserList.length !== 0 ? "" :
                            <div>
                                <h5 className='text-center'>You haven't created any Post.</h5>
                                <h6 className='text-center'>{"Click here to "}
                                    <Link>
                                        Add Post
                                    </Link>
                                </h6>
                            </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default ShowPostByUser
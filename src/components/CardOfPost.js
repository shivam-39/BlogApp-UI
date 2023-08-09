import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserData, isLoggedIn } from '../services/auth-service';
import { Button } from 'reactstrap';

function CardOfPost({ post = { title: "This is default post title", content: "This is default post content" }, handleDelete }) {

    const [userId, setUserId] = useState(-1);

    useEffect(() => {
        if (isLoggedIn()) {
            setUserId(getCurrentUserData().id);
        }
    }, []);

    const handleEdit = () => {

    }

    return (
        <Card className='shadow mt-2'>
            <CardBody>
                <h2>{post.title}</h2>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 800) }}></CardText>
                <span style={{ display: 'inline-flex', paddingTop: '0px', marginTop: '0px' }}>...</span>
                <div>
                    <Link to={"/post/" + post.postId} className='btn btn-secondary' style={{ minWidth: '100px' }}>Read More</Link>
                    {
                        userId !== post.user.id ? "" :
                            <div style={{ float: 'right' }}>
                                <Button onClick={() => handleEdit(post.postId)} className='ms-3' color="warning" style={{ minWidth: '100px' }}>Update</Button>
                                <Button onClick={() => handleDelete(post.postId)} className='ms-3' color="danger" style={{ minWidth: '100px' }}>Delete</Button>
                            </div>
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default CardOfPost
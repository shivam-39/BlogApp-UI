import React, { useState, useEffect } from 'react'
import Base from '../components/Base'
import { Link, useParams } from 'react-router-dom'
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap'
import { getPostById } from '../services/post-service';
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/helper';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function FullPost() {

    const { postId } = useParams();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        getPostById(postId).then(data => {
            // console.log(data);
            setPostData(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        })
    }, []);

    const printDate = (date) => {
        return new Date(date).toDateString() + ", " + new Date(date).toLocaleTimeString();
    }

    return (
        <Base>
            <Container className='mt-4'>
                <Breadcrumb listTag="div">
                    <BreadcrumbItem><Link to="/" style={{ color: "blue", textEmphasisColor: 'gray' }}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/feed" style={{ color: "blue", textEmphasisColor: 'gray' }}>All Posts</Link></BreadcrumbItem>
                    {(postData) && (
                        <>
                            <BreadcrumbItem><Link to="/category" style={{ color: "blue", textEmphasisColor: 'gray' }}>{postData.category.catTitle}</Link></BreadcrumbItem>
                            <BreadcrumbItem active tag="span">{postData.title}</BreadcrumbItem>
                        </>
                    )}
                </Breadcrumb>
                <Row>
                    <Col md={{ size: 12 }}>
                        <Card className='mt-2'>
                            {
                                (postData) && (
                                    <CardBody>
                                        <p style={{ borderBottom: '2px solid', paddingBottom: '5px', borderColor: '#8080d770' }}>
                                            Posted By <b>{postData.user.name}</b> on <b><em>{printDate(postData.addedDate)}</em></b>
                                        </p>
                                        <span><b>Category:</b> <em>{postData.category.catTitle}</em></span>
                                        <div className='mt-3'
                                            style={{ border: '2px groove', padding: '10px', borderRadius: '10px' }}>
                                            <h2 className='text-center'>{postData.title}</h2>
                                            <div className='image-container text-center mt-4'
                                                style={{ borderBottom: '2px solid', paddingBottom: '20px', borderColor: '#8080d770' }}>
                                                <img className='img-fluid'
                                                    style={{ maxWidth: '50%' }}
                                                    src={`${BASE_URL}/post/image/${postData.imageName}`}
                                                    alt=''></img>
                                            </div>
                                            <p className='mt-3' dangerouslySetInnerHTML={{ __html: postData.content }}></p>
                                        </div>
                                    </CardBody>
                                )
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base >
    )
}

export default FullPost
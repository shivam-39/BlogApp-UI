import React, { useEffect, useState } from 'react'
import { getAllPost } from '../services/post-service';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import ShowPost from './ShowPost';
import { toast } from 'react-toastify';

function NewPosts() {

    const [postDataList, setPostDataList] = useState({
        content: [],
        lastPage: false,
        pageNumber: 0,
        pageSize: "",
        totalElements: ""
    });

    useEffect(() => {
        changePage();
    }, []);

    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber < 0 || (postDataList.lastPage && pageNumber >= postDataList.totalElements)) return;
        getAllPost(pageNumber, pageSize).then(data => {
            // console.log(data);
            setPostDataList(data);
            window.scroll(0, 0);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        })
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={{ size: 12 }}>
                    <h1 className='text-center my-2'>All Blogs</h1>
                    {
                        postDataList.content.map((post) => {
                            return <ShowPost post={post} key={post.postId}></ShowPost>
                        })

                    }
                    <Container className='mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination size='md'>
                            <PaginationItem onClick={() => changePage(postDataList.pageNumber - 1)} disabled={postDataList.pageNumber === 0}>
                                <PaginationLink previous>Prev</PaginationLink>
                            </PaginationItem>
                            {
                                [...Array(postDataList.totalElements)].map((item, index) => (
                                    <PaginationItem onClick={() => changePage(index)} key={index} active={index === postDataList.pageNumber}>
                                        <PaginationLink>{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                            <PaginationItem onClick={() => changePage(postDataList.pageNumber + 1)} disabled={postDataList.lastPage}>
                                <PaginationLink next>Next</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container>

                </Col>
            </Row>
        </div>
    )
}

export default NewPosts
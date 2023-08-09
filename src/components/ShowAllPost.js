import React, { useEffect, useState } from 'react'
import { getAllPost } from '../services/post-service';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import CardOfPost from './CardOfPost';
import { toast } from 'react-toastify';
import { deletePost } from '../services/post-service';

function ShowAllPost() {

    const [postDataList, setPostDataList] = useState({
        content: [],
        lastPage: false,
        pageNumber: 0,
        pageSize: 5,
        totalElements: 0
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

    const handleDelete = (postId) => {
        deletePost(postId).then(data => {
            toast.success("Post deleted!");
            changePage(postDataList.pageNumber, postDataList.pageSize);
        }).catch(error => {
            console.log((error));
            toast.error("Error occured when delete Post!");
        });
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={{ size: 12 }}>
                    <h1 className='text-center my-2'>All Blogs</h1>
                    {
                        postDataList.content.map((post) => {
                            return <CardOfPost post={post} key={post.postId} handleDelete={handleDelete}></CardOfPost>
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

export default ShowAllPost
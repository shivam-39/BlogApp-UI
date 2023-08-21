import React, { useEffect, useState } from 'react'
import { getAllPost } from '../services/post-service';
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap';
import CardOfPost from './CardOfPost';
import { toast } from 'react-toastify';
import { deletePost } from '../services/post-service';
import CustomLoading from './CustomLoading';

function ShowAllPost() {

    const [postDataList, setPostDataList] = useState({
        content: [],
        lastPage: false,
        pageNumber: 0,
        pageSize: 5,
        totalElements: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        changePage();
    }, []);

    const changePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber < 0 || (postDataList.lastPage && pageNumber >= postDataList.totalElements)) return;
        setLoading(true);
        getAllPost(pageNumber, pageSize).then(data => {
            // console.log(data);
            setPostDataList(data);
            window.scroll(0, 0);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
            toast.error("Error in loading data!");
        })
    }

    const handleDelete = (postId) => {
        setLoading(true);
        deletePost(postId).then(data => {
            toast.success("Post deleted!");
            let filteredList = postDataList.content.filter(p => p.postId != postId);
            setPostDataList({ ...postDataList, content: filteredList });
            setLoading(false);
        }).catch(error => {
            console.log((error));
            setLoading(false);
            toast.error("Error occured when delete Post!");
        });
    }

    if (loading) return (<CustomLoading></CustomLoading>)

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
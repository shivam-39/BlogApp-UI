import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Row, Col } from 'reactstrap'
import SidebarMenu from '../components/SidebarMenu'
import { Link, useParams } from 'react-router-dom'
import { getAllPostByCategory } from '../services/post-service'
import { toast } from 'react-toastify'
import CardOfPost from '../components/CardOfPost'
import { getCategory } from '../services/category-service'
import { isLoggedIn } from '../services/auth-service'
import { deletePost } from '../services/post-service'

function ShowPostByCategory() {

    const { catId } = useParams();
    const [category, setCategory] = useState({
        catTitle: ""
    });
    const [postByCategoryList, setPostByCategoryList] = useState([]);

    useEffect(() => {
        getCategory(catId).then(data => {
            setCategory(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        })
        getListofReqPost();
    }, [catId]);

    const handleAddPost = () => {
        if (!isLoggedIn()) {
            toast.info("Login to create a Post");
        }
    }

    const getListofReqPost = () => {
        getAllPostByCategory(catId).then(data => {
            setPostByCategoryList(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        })
    }

    const handleDelete = (postId) => {
        deletePost(postId).then(data => {
            toast.success("Post deleted!");
            let filteredList = postByCategoryList.filter(p => p.postId != postId);
            setPostByCategoryList([...filteredList]);
        }).catch(error => {
            console.log((error));
            toast.error("Error occured when delete Post!");
        });
    }

    return (
        <Base>
            <Row className='mx-4'>
                <Col md={{ size: 2 }} style={{ marginTop: '64px', marginBottom: '30px' }}>
                    <SidebarMenu catId={catId} />
                </Col>
                <Col md={{ size: 10 }}>
                    <h1 className='text-center my-2'>{category.catTitle}</h1>
                    {
                        postByCategoryList.map(p => (
                            <CardOfPost post={p} key={p.postId} handleDelete={handleDelete}></CardOfPost>
                        )
                        )}
                    {
                        postByCategoryList.length !== 0 ? "" :
                            <div>
                                <h5 className='text-center'>No Post in this category.</h5>
                                <h6 className='text-center'>{"Click here to "}
                                    <Link onClick={handleAddPost} to="/user/dashboard">
                                        Add Post
                                    </Link>
                                </h6>
                            </div>
                    }
                </Col>
            </Row>
        </Base>
    )
}

export default ShowPostByCategory
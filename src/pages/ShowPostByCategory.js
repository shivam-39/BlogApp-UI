import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Row, Col } from 'reactstrap'
import SidebarMenu from '../components/SidebarMenu'
import { useParams } from 'react-router-dom'
import { getAllPostByCategory } from '../services/post-service'
import { toast } from 'react-toastify'
import ShowPost from '../components/ShowPost'
import { getCategory } from '../services/category-service'

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
        getAllPostByCategory(catId).then(data => {
            setPostByCategoryList(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        })
    }, [catId]);

    return (
        <Base>
            <Row className='mx-4'>
                <Col md={{ size: 2 }} style={{ marginTop: '64px', marginBottom: '30px' }}>
                    <SidebarMenu catId={catId} />
                </Col>
                <Col md={{ size: 10 }}>
                    <h1 className='text-center my-2'>{category.catTitle}</h1>
                    {(postByCategoryList) && (
                        postByCategoryList.map(p => (
                            <ShowPost post={p} key={p.postId}></ShowPost>
                        ))
                    )}
                </Col>
            </Row>
        </Base>
    )
}

export default ShowPostByCategory
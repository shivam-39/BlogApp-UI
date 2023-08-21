import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from './Base';
import userContext from '../context/userContext';
import { getPostById } from '../services/post-service';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import JoditEditor from 'jodit-react';
import { getAllCategory } from '../services/category-service';
import { updatePost } from '../services/post-service';

function EditPost() {

    const { postId } = useParams();
    const userContextData = useContext(userContext);
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const editor = useRef(null);

    useEffect(() => {
        getPostById(postId).then(data => {
            setPostData(data);
            // console.log((data));
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        });
        getAllCategory().then(data => {
            // console.log(data);
            setCategoryList(data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        if (postData && postData.user.id !== userContextData.user.id) {
            toast.info("You can only edit your posts.");
            navigate("/feed");
        }
    }, [postData]);

    const fieldChange = (event) => {
        // console.log(event);
        if (event.target != undefined || event.target != null) {
            if (event.target.name === 'categoryId') {
                setPostData({ ...postData, 'category': { ...postData.category, 'catId': event.target.value } });
            } else {
                setPostData({ ...postData, [event.target.name]: event.target.value });
            }
        } else {
            setPostData({ ...postData, 'content': event });
        }
    };

    const resetPostData = () => {
        setPostData({
            ...postData,
            title: "",
            category: { catId: -1 },
            content: ""
        });
    }

    const submitCreatePost = (event) => {
        event.preventDefault();
        // console.log(postData);
        if (postData.title.trim() === "") {
            toast.info("Title cannot be blank")
            return;
        } else if (postData.categoryId === -1) {
            toast.info("Please select a category!")
            return;
        } else if (postData.content.trim() === "") {
            toast.info("Content cannot be blank")
            return;
        }
        updatePost(postData).then(data => {
            // console.log(data);
            toast.success("Post Updated!");
        }).catch(error => {
            console.log(error);
            toast.error("Error in updating post");
        })
    }

    const editPostHtml = () => {
        return (
            <div className='wrapper mb-4'>
                <Card className='shadow-sm mt-3' style={{ backgroundColor: '#d7ccc8' }}>
                    <CardBody>
                        <h3>Edit your Post here</h3>
                        <Form onSubmit={submitCreatePost}>
                            <div className='my-3'>
                                <Label for="title">Post Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder='Enter here...'
                                    className='rounded-0'
                                    name="title"
                                    value={postData.title}
                                    onChange={(e) => fieldChange(e)}
                                />
                            </div>
                            <div className='my-3'>
                                <Label for="category">Category</Label>
                                <Input
                                    type="select"
                                    id="category"
                                    placeholder='Enter here...'
                                    className='rounded-0'
                                    name="categoryId"
                                    defaultValue={postData.category.catId}
                                    value={postData.category.catId}
                                    onChange={(e) => fieldChange(e)}
                                >
                                    <option value={-1}>---Select Category---</option>
                                    {categoryList.map(c => {
                                        return <option value={c.catId} key={c.catId}>{c.catTitle}</option>
                                    })}
                                </Input>
                            </div>
                            <div className='my-3'>
                                <Label for="content">Content</Label>
                                {/* <Input type="textarea" id="content" placeholder='Enter here...' className='rounded-0' style={{ minHeight: '250px' }}/> */}
                                <JoditEditor
                                    ref={editor}
                                    value={postData.content}
                                    onBlur={(e) => fieldChange(e)}
                                    onChange={() => { }}
                                ></JoditEditor>
                            </div>
                            <div className='mt-3'>
                                <Label for='postImage'>Add Image</Label>
                                <Input id='postImage' name='postImage' type='file'></Input>
                            </div>
                            <Container className='text-center mt-3'>
                                <Button type='submit' color='primary'>Update Post</Button>
                                <Button
                                    type="reset"
                                    className='ms-3'
                                    color='danger'
                                    style={{ minWidth: "105px" }}
                                    onClick={resetPostData}
                                >Reset</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (
        <Base>
            <Container>
                {postData && editPostHtml()}
            </Container>
        </Base>
    )
}

export default EditPost
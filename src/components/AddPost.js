import React, { useEffect, useState, useRef } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { getAllCategory } from '../services/category-service';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { createPost } from '../services/post-service';
import { getCurrentUserData } from '../services/auth-service';

function AddPost() {

    const editor = useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    const [postData, setPostData] = useState({
        title: "",
        categoryId: -1,
        content: ""
    });

    // const joditConfig = useMemo(
    //     {
    //         readonly: false,
    //         placeholder: 'Start writing here...'
    //     },
    //     [postData.content]
    // );

    useEffect(() => {
        getAllCategory().then(data => {
            // console.log(data);
            setCategoryList(data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const fieldChange = (event) => {
        // console.log(event);
        if (event.target != undefined || event.target != null) {
            setPostData({ ...postData, [event.target.name]: event.target.value });
        } else {
            setPostData({ ...postData, 'content': event });
        }
    };

    const resetPostData = () => {
        setPostData({
            title: "",
            categoryId: -1,
            content: ""
        });
    }

    const submitCreatePost = (event) => {
        event.preventDefault();
        // console.log(postData);
        if (postData.title.trim() === "") {
            toast.info("Title cannot be blank")
            return;
        } else if (postData.categoryId.trim() === -1) {
            toast.info("Please select a category!")
            return;
        } else if (postData.content.trim() === "") {
            toast.info("Content cannot be blank")
            return;
        }
        postData['userId'] = getCurrentUserData().id;
        createPost(postData).then(data => {
            console.log(data);
            toast.success("Post created");
            resetPostData();
        }).catch(error => {
            console.log(error);
            toast.error("Error in creating post");
        })
    }

    return (
        <div className='wrapper'>
            <Card className='shadow-sm mt-3' style={{ backgroundColor: '#d7ccc8' }}>
                <CardBody>
                    <h3>Whats on your mind ??</h3>
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
                                value={postData.categoryId}
                                onChange={(e) => fieldChange(e)}
                            >
                                <option disabled value={-1}>---Select Category---</option>
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
                        <Container className='text-center'>
                            <Button type='submit' color='primary'>Create Post</Button>
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

export default AddPost
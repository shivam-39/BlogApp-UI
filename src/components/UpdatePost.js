import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from './Base';
import userContext from '../context/userContext';
import { getPostById } from '../services/post-service';
import { toast } from 'react-toastify';

function UpdatePost() {

    const { postId } = useParams();
    const userContextData = useContext(userContext);
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        getPostById(postId).then(data => {
            setPostData(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading data!");
        })
    }, [])

    useEffect(() => {
        if (postData && postData.user.id !== userContextData.user.id) {
            toast.info("You can only edit your posts.");
            navigate("/feed");
        }
    }, [postData]);

    return (
        <Base>
            <div className='wrapper mb-4'>
                <Card className='shadow-sm mt-3' style={{ backgroundColor: '#d7ccc8' }}>
                    <CardBody>
                        <h3>Update Post</h3>
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
                                <Input id='postImage' name='postImage' type='file' onChange={handleFileChange}></Input>
                            </div>
                            <Container className='text-center mt-3'>
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
        </Base>
    )
}

export default UpdatePost
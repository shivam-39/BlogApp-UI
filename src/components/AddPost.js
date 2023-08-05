import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { getAllCategory } from '../services/category-service';

function AddPost() {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getAllCategory().then(data => {
            // console.log(data);
            setCategoryList(data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (
        <div className='wrapper'>
            <Card inverse className='shadow-sm mt-3' style={{ backgroundColor: '#006064' }}>
                <CardBody>
                    <h3>Whats going on your mind ??</h3>
                    <Form>
                        <div className='my-3'>
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" placeholder='Enter here...' className='rounded-0' />
                        </div>
                        <div className='my-3'>
                            <Label for="category">Category</Label>
                            <Input type="select" id="category" placeholder='Enter here...' className='rounded-0'>
                                <option>---</option>
                                {categoryList.map(c => {
                                    return <option value={c.catId} key={c.catId}>{c.catTitle}</option>
                                })}
                            </Input>
                        </div>
                        <div className='my-3'>
                            <Label for="content">Content</Label>
                            <Input type="textarea" id="content" placeholder='Enter here...' className='rounded-0'
                                style={{ minHeight: '250px' }}
                            />
                        </div>
                        <Container className='text-center'>
                            <Button color='primary'>Create Post</Button>
                            <Button className='ms-3' color='danger' style={{ minWidth: "105px" }}>Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost
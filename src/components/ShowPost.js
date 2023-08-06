import React from 'react'
import { Button, Card, CardBody, CardText } from 'reactstrap'

function ShowPost({ post = { title: "This is default post title", content: "This is default post content" } }) {
    return (
        <Card className='shadow mt-2'>
            <CardBody>
                <h2>{post.title}</h2>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 800) }}></CardText>
                <span style={{ display: 'inline-flex', paddingTop: '0px', marginTop: '0px' }}>...</span>
                <div>
                    <Button>Read More</Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default ShowPost
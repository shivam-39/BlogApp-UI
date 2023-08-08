import React from 'react'
import Base from '../components/Base'
import SidebarMenu from '../components/SidebarMenu'
import NewPosts from '../components/NewPosts'
import { Col, Row } from 'reactstrap'

function NewFeed() {
    return (
        <Base>
            <Row className='mx-4'>
                <Col md={{ size: 2 }} style={{ marginTop: '64px', marginBottom: '30px' }}>
                    <SidebarMenu />
                </Col>
                <Col md={{ size: 10 }}>
                    <NewPosts />
                </Col>
            </Row>
        </Base>
    )
}

export default NewFeed
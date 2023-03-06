import React from 'react'
import { Col, Form } from 'react-bootstrap'
import Slidebar from '../Slidebar'

const Support = () => {
    return (
        <>
            <Slidebar title='Support' style={{ color: "#d47617", fontSize: 30, fontWeight: 'bold' }} />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </>
    )
}

export default Support
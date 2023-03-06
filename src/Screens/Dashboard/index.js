import React from 'react'
import Slidebar from '../Slidebar'
import { Link, useLocation } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import { RxDashboard } from 'react-icons/rx';
const Dashboard = () => {

    const location = useLocation()
    console.log(location, "location")
    const { state } = location

    return (
        <>
            <Slidebar title='Dashboard' style={{ color: "#d47617", fontSize: 30, fontWeight: 'bold' }} />
            <Container>
                <Row style={{ gap: 20 }}>
                    <Col lg="2" style={{ border: "1px solid #d47617", height: '100px', backgroundColor: "#d47617", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        <Link to='/Dashboard' style={{ textDecoration: 'none' }}>
                            <div style={{ marginBottom: 20 }}>
                                <button className='sliderButton' style={{ width: '100%', display: 'flex', alignItems: 'flex-start', alignItems: 'center', gap: 10, borderRadius: 5 }}> <RxDashboard id='sliderIcon' color='white' size={20} /><span style={{ fontSize: 20 }}>Dashboard</span> </button>

                            </div>
                        </Link>
                    </Col>
                    <Col lg="2" style={{ border: "1px solid #d47617", height: '150px', backgroundColor: "#d47617" }}></Col>
                    <Col lg="2" style={{ border: "1px solid #d47617", height: '150px', backgroundColor: "#d47617" }}></Col>
                    <Col lg="2" style={{ border: "1px solid #d47617", height: '150px', backgroundColor: "#d47617" }}></Col>
                    <Col lg="2" style={{ border: "1px solid #d47617", height: '150px', backgroundColor: "#d47617" }}></Col>
                    <Col lg="2" style={{ border: "1px solid #d47617", height: '150px', backgroundColor: "#d47617" }}></Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard
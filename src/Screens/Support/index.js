import React from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import Slidebar from "../Slidebar";

const Support = () => {
  return (
    <>
      <Slidebar
        title="Support"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />
      <Container>
        <Row className="align-items-center">
          <Col lg="6">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-black">Email address</Form.Label>
              <Form.Control
                className="form__input"
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="text-black">Example textarea</Form.Label>
              <Form.Control
                className="form__input"
                placeholder="message...."
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <button
              className="button-sub px-4"
              type="submit"
              //   onClick={() => updatePass(newPassword)}
            >
              Submit
            </button>
          </Col>
          <Col lg="6" className="text-center">
            <div className="p-3">
              <Image
                style={{ objectFit: "cover", width: "70%" }}
                src={require("../../Images/desk_work.png")}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Support;

import React from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import Slidebar from "../Slidebar";
import { BsFacebook, BsInstagram, BsLinkedin, BsSearch } from "react-icons/bs";
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";

const Support = () => {
  const navigate = useNavigate()
  const [state, handleSubmit] = useForm("xknavvbl");
  if (state.succeeded) {
    return navigate('/Dashboard')
  }
  return (
    <>
      <Slidebar
        title="Support"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />
      <Container>
        <Row className="align-items-center">
          <Col lg="6">
            <form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="text-black">Subject</Form.Label>
                <Form.Control
                  className="form__input"
                  type="subject"
                  placeholder="Title"
                  id="subject"
                  name="subject"
                />
              </Form.Group>
              <ValidationError
                prefix="Subject"
                field="subject"
                errors={state.errors}
              />
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
                  id="message"
                  name="message"
                />
              </Form.Group>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />

              <button
                className="button-sub px-4"
                type="submit"
              //   onClick={() => updatePass(newPassword)}
              >
                Submit
              </button>
            </form>
          </Col>
          <Col lg="6" className="text-center">
            <div className="p-3">
              <Image
                style={{ objectFit: "cover", width: "50%" }}
                src={require("../../Images/desk_work.png")}
              />
              <div className="d-flex gap-4 icon">
                <a href="https://www.facebook.com/deskworksol/">
                  <BsFacebook style={{ color: "#1196f5" }} />
                </a>
                <a href="https://www.instagram.com/deskworksol/?hl=en">
                  <BsInstagram className="insta" />
                </a>
                <a href="https://www.linkedin.com/company/deskworksol/mycompany/">
                  <BsLinkedin className="linkedin" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Support;

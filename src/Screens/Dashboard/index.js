import React from "react";
import Slidebar from "../Slidebar";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import {
  AiOutlineBars,
  AiFillSchedule,
  AiOutlineOrderedList,
  AiFillPushpin,
  AiFillSetting,
  BiSupport,
} from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";

import { RxDashboard } from "react-icons/rx";

const Dashboard = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <>
      <Slidebar
        title="Dashboard"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />
      <Container>
        <Row>
          <Col lg="3">
            <div className="box-shad">
              <Link to="/Dashboard" style={{ textDecoration: "none" }}>
                <div>
                  <button
                    className="sliderButton"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      borderRadius: 5,
                    }}
                  >
                    <RxDashboard id="sliderIcon" color="white" size={40} />
                    <span style={{ fontSize: 20 }}>Dashboard</span>{" "}
                  </button>
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3">
            <div className="box-shad">
              <Link to="/UploadVideo" style={{ textDecoration: "none" }}>
                <div>
                  <button
                    className="sliderButton"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      borderRadius: 5,
                    }}
                  >
                    <AiFillSchedule id="sliderIcon" color="white" size={40} />
                    <span style={{ fontSize: 20 }}>
                      Scheduled New Video
                    </span>
                  </button>
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3">
            <div className="box-shad">
              <Link to="/ScheduledVideoList" style={{ textDecoration: "none" }}>
                <div>
                  <button
                    className="sliderButton"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      borderRadius: 5,
                    }}
                  >
                    <AiOutlineOrderedList
                      id="sliderIcon"
                      color="white"
                      size={40}
                    />
                    <span style={{ fontSize: 20 }}>Scheduled Video List</span>{" "}
                  </button>
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3">
            <div className="box-shad">
              <Link to="/PushNotification" style={{ textDecoration: "none" }}>
                <div style={{ textDecoration: "none" }}>
                  <div>
                    <button
                      className="sliderButton"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-start",
                        alignItems: "center",
                        gap: 10,
                        borderRadius: 5,
                      }}
                    >
                      <AiFillPushpin id="sliderIcon" color="white" size={40} />
                      <span style={{ fontSize: 20 }}>
                        Push Notification
                      </span>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3">
            <div className="box-shad">
              <Link to="/Setting" style={{ textDecoration: "none" }}>
                <div>
                  <button
                    className="sliderButton"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      borderRadius: 5,
                    }}
                  >
                    <AiFillSetting id="sliderIcon" color="white" size={40} />
                    <span style={{ fontSize: 20 }}>Setting</span>{" "}
                  </button>
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3">
            <div className="box-shad">
              <Link to="/Support" style={{ textDecoration: "none" }}>
                <div>
                  <button
                    className="sliderButton"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      borderRadius: 5,
                    }}
                  >
                    <MdOutlineContactSupport
                      id="sliderIcon"
                      color="white"
                      size={40}
                    />
                    <span style={{ fontSize: 20 }}>Support</span>{" "}
                  </button>
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3">
            <div className="box-shad">
              <Link to="/Marquee" style={{ textDecoration: "none" }}>
                <div>
                  <button
                    className="sliderButton"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      borderRadius: 5,
                    }}
                  >
                    <MdOutlineContactSupport
                      id="sliderIcon"
                      color="white"
                      size={40}
                    />
                    <span style={{ fontSize: 20 }}>Marquee</span>{" "}
                  </button>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

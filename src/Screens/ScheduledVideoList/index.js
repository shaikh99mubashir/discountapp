import React, { useState, useEffect } from "react";
import Slidebar from "../Slidebar";
import ReactPlayer from "react-player";
import app from "../../FirebaseConfig/Config";
import Modal from "react-bootstrap/Modal";
import { getDatabase, onValue, ref as dbRef, remove } from "firebase/database";
import { Table, Button, Container } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

const ScheduledVideoList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [dataUpdated, setDataUpdated] = React.useState(false)
  const db = getDatabase(app);
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    const getData = dbRef(db, `videolink/`);
    onValue(getData, (e) => {
      const val = e.val();
      const data = Object.entries(val).map(([key, value]) => {
        return {
          ...value,
          id: key,
        };
      });
      setVideoData(data);
      setDataUpdated(true)
    });
  }, []);

  const [updatedData, setUpdatedData] = useState([])
  const checkStatus = () => {
    let startTime;
    let endTime;
    const d = new Date();
    let time = d.getTime();
    setVideoData(videoData.map((e, i) => {
      let startDate = new Date(e.startDate)
      let endDate = new Date(e.endDate)

      startTime = startDate.getTime();
      endTime = endDate.getTime();
      if (e.videoLink) {
        if (time > endTime) {
          return {
            ...e, completedStatus: e.completedStatus = true
          }
        }
        if (time > startTime && time < endTime) {
          return {
            ...e, runningStatus: e.runningStatus = true
          }
        }
        if (time < startTime) {
          return {
            ...e, pendingStatus: e.pendingStatus = true
          }
        } else {
          return e
        }
      }
    }))
  }


  useEffect(() => {
    dataUpdated && checkStatus()
  }, [dataUpdated])



  const deleteVideoLink = (id, i) => {
    const deleteLink = dbRef(db, `videolink/${id}`);
    remove(deleteLink)
      .then((deleted) => {
        alert("successfully deleted");
      })
      .catch((err) => alert("GOT THE ERROR ON DELETE", err));
    setVideoData(
      videoData.filter((item, index) => {
        return index !== i;
      })
    );
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        style={{ alignItems: "-webkit-center" }}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>{props.props.videoName}</Modal.Header>
        <div style={{ alignContent: "center" }} className="video">
          <ReactPlayer controls url={props.props.videoLink} />
        </div>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const modalshow = (e) => {
    if (e.clicked == true) {
      e.clicked = false;
      setModalShow(false);
    } else {
      setModalShow(true);
      e.clicked = true;
    }
  };
  return (
    <>
      <Slidebar
        title="Scheduled Video List"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />
      <Container>
        <Table style={{ marginTop: 20 }} striped bordered hover>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Video Name</th>
              <th>Video Link</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Preview</th>
              <th>Delete</th>
            </tr>
          </thead>
          {videoData && videoData.length > 0 &&
            videoData.map((e, i) => {
              return (
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{e.videoName && e.videoName}</td>
                    <td>{e.videoLink}</td>
                    <td>{e.completedStatus ? 'completed' : e.runningStatus ? 'running' : e.pendingStatus ? 'pending' : ''}</td>
                    <td>{e.startDate}</td>
                    <td>{e.endDate}</td>
                    <td style={{ textAlign: "-webkit-center" }}>
                      <button
                        style={{ border: "none" }}
                        onClick={() => modalshow(e)}
                      >
                        <BsEyeFill size={25} />
                      </button>
                    </td>
                    {e.clicked == true && (
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        props={e}
                        onHide={() => modalshow(e)}
                      />
                    )}
                    <td style={{ textAlign: "-webkit-center" }}>
                      <button
                        style={{ border: "none" }}
                        onClick={() => deleteVideoLink(e.id, i)}
                      >
                        <AiFillDelete size={25} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </Table>
      </Container>
    </>
  );
};

export default ScheduledVideoList;

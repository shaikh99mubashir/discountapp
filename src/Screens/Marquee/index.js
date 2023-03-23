import React, { useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import { Form, Table, Button, Container, Col } from "react-bootstrap";
import app from "../../FirebaseConfig/Config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  onValue,
  ref as dbRef,
  push,
  set,
  update,
  remove,
} from "firebase/database";
import { useNavigate } from "react-router-dom";

const Marquee = () => {
  // const LimitedWordTextarea = ({ rows, cols, value, limit }) => {
  //   const [{ content, wordCount }, setContent] = React.useState({
  //     content: value,
  //     wordCount: 0,
  //   });

  // const setFormattedContent = React.useCallback(
  //   (text) => {
  //     let words = text.split(" ").filter(Boolean);
  //     if (words.length > limit) {
  //       setContent({
  //         content: words.slice(0, limit).join(" "),
  //         wordCount: limit,
  //       });
  //     } else {
  //       setContent({ content: text, wordCount: words.length });
  //     }
  //   },
  //   [limit, setContent]
  // );

  // React.useEffect(() => {
  //   setFormattedContent(content);
  // }, []);
  const db = getDatabase(app);
  const [marquee, setMarquee] = useState({
    marqueeText: '',
  });
  const navigate = useNavigate()
  const handleMarqueeSubmit = () => {
    const reference = dbRef(db, `Marquee/`);
    push(reference, marquee)
      .then(() => {
        alert("Submit Successfully!");
        navigate('/Dashboard')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [marqueeData, setMarqueeData] = useState()
  useEffect(() => {
    const getData = dbRef(db, `Marquee/`);
    onValue(getData, (e) => {
      const val = e.val();
      const data = Object.entries(val).map(([key, value]) => {
        return {
          ...value,
          id: key,
        };
      });
      console.log('dadaagag', data);
      setMarqueeData(data);
    });
  }, []);
  console.log('marqueeData', marqueeData);

  return (
    <>
      <Slidebar
        title="Headline"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />

      <Container>
        <Col lg="12">
          <div style={{ color: "#222536" }}></div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <LimitedWordTextarea limit={5} placeholder='Headline Text' /> */}
            <input
              className="form-control form__input"
              type="email"
              maxlength="25"
              placeholder="Headline Text"
              onChange={(e) => setMarquee(e.target.value)}
            />
          </Form.Group>
        </Col>
        <button
          className="button-sub px-4"
          type="submit"
          onClick={handleMarqueeSubmit}
        // disabled={!selectedFile}
        >
          Submit
        </button>
        <Table style={{ marginTop: 20 }} striped bordered hover>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Headline</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>none</td>
              <td>none</td>
              <td>none</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Marquee;

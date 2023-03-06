import React from "react";
import Slidebar from "../Slidebar";
import { Form, Table, Button, Container, Col } from "react-bootstrap";

const Marquee = () => {
  const LimitedWordTextarea = ({ rows, cols, value, limit }) => {
    const [{ content, wordCount }, setContent] = React.useState({
      content: value,
      wordCount: 0,
    });

    const setFormattedContent = React.useCallback(
      (text) => {
        let words = text.split(" ").filter(Boolean);
        if (words.length > limit) {
          setContent({
            content: words.slice(0, limit).join(" "),
            wordCount: limit,
          });
        } else {
          setContent({ content: text, wordCount: words.length });
        }
      },
      [limit, setContent]
    );

    React.useEffect(() => {
      setFormattedContent(content);
    }, []);
    return (
      <>
        <input
          className="form-control form__input"
          type="email"
          //   maxlength="10"
          rows={rows}
          cols={cols}
          placeholder="Video Name"
          onChange={(event) => setFormattedContent(event.target.value)}
          value={content}
        />
        {/* <textarea
              rows={rows}
              cols={cols}
              onChange={(event) => setFormattedContent(event.target.value)}
              value={content}
            /> */}
        <p style={{ float: "right" }}>
          {wordCount}/{limit}
        </p>
      </>
    );
  };
  return (
    <>
      <Slidebar
        title="Headline"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />

      <Container>
        <Col lg="12">
          <div style={{ color: "#222536" }}>Send Notification to users</div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <LimitedWordTextarea limit={5} value="Hello there!" />
            {/* <input
                  className="form-control form__input"
                  type="email"
                  maxlength="10"
                  placeholder="Video Name"
                /> */}
          </Form.Group>
        </Col>
        <Table style={{ marginTop: 20 }} striped bordered hover>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Date / Time</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>none</td>

              <td style={{ textAlign: "-webkit-center" }}>
                <td>date</td>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Marquee;

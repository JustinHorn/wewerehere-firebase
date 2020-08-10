import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import moment from "moment";

import { db } from "./service";

function App() {
  const [marks, setMarks] = useState([]);

  const downloadMarks = () => {
    db.ref("marks").on("value", (snapshot) => {
      let values = [];

      snapshot.forEach((x) => values.push(x.val()));
      setMarks(values);
    });
  };

  useEffect(() => {
    downloadMarks();
  }, []);

  const nameInput = useRef();
  const messageInput = useRef();

  const createMark = () => {
    const mark = {
      name: nameInput.current.value,
      message: messageInput.current.value,
      time: Date.now(),
      timeStr: moment().format("DD.MM.YYYY HH:mm"),
    };
    nameInput.current.value = "";
    messageInput.current.value = "";
    return mark;
  };

  const sendMark = (e) => {
    e.preventDefault();
    db.ref("marks").push(createMark());
  };

  return (
    <div className="App">
      <div className="container mt-4">
        <div className="row">
          <div className="col align-items-center">
            <form onSubmit={sendMark}>
              <div className="form-group">
                <input
                  ref={nameInput}
                  type="text"
                  className="form-control noSemicolon"
                  id="inputName"
                  placeholder="Enter Name"
                  name="name"
                  maxLength="40"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  ref={messageInput}
                  type="text"
                  className="form-control threeLines noSemicolon"
                  rows="3"
                  id="textareaMessage"
                  placeholder="Enter message"
                  name="message"
                  maxLength="240"
                ></textarea>
              </div>
              <div className="form-group">
                <input type="submit" className="form-control" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div id="otherPeople">
          {marks.map((mark, i) => (
            <div key={i}>
              <div className="row col col-12">
                <p>
                  <a
                    data-toggle="collapse"
                    href={"#collapse" + i}
                    aria-expanded="false"
                  >
                    {mark.name + " "}
                  </a>
                  was here.
                  {" " + mark.timeStr}
                </p>
              </div>

              <div className="row col">
                <div className="collapse" id={"collapse" + i}>
                  <p>{mark.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

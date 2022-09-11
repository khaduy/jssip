import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./css/home.module.css";
import JsSIP from "jssip";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//import RNImmediatePhoneCall from "react-native-immediate-phone-call";

var socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");

var configuration = {
  sockets: [socket],
  uri: "107@2-test1.gcalls.vn:50061",
  password: "test1107",
  // session_timers: false,
};

var ua = new JsSIP.UA(configuration);
// Register callbacks to desired call events
var eventHandlers = {
  progress: function (e) {
    console.log("call is in progress");
  },
  failed: function (e) {
    console.log("call failed with cause: " + e.message.data);
    // console.log("call failed with cause: " + JSON.stringify(e));
  },
  ended: function (e) {
    console.log("call ended with cause: " + e.data.cause);
  },
  confirmed: function (e) {
    console.log("call confirmed");
  },
};

var options = {
  eventHandlers: eventHandlers,
  mediaConstraints: { audio: true, video: true },
  sessionTimersExpires: 1800,
};

function Home() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const info = useSelector((state) => state.personalInfo);
  useEffect(() => {
    ua.start();
    var userCurrent = localStorage.getItem("userInfo");
    console.log("data: ", userCurrent);
    if (userCurrent === null) {
      navigate("/login");
    } else {
      console.log("Da vao trang");
    }
  }, []);
  const call = async (e) => {
    e.preventDefault();
    console.log("abc");
    console.log(ua.isConnected());
    ua.call("0386580528", options);
    // sip:'+number+'@'+GLOBAL.jssip_server
  };
  const dangXuat = () => {
    localStorage.removeItem("userInfo");
  };
  return (
    <div className={`${styles.overlay}`}>
      <div>
        <span>Tên người dùng: {info.user}</span>
      </div>
      <div>
        <Link to="/login" style={{ color: "#dc3545" }} onClick={dangXuat}>
          Đăng xuẩt
        </Link>
      </div>
      <Form onSubmit={call}>
        <Form.Group className="mb-3 text-center">
          <h1>JsSIP</h1>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="SIP URI or username"
            onChange={(e) => setNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={`${styles.btn}`}>
          <Button variant="primary" type="submit">
            Gọi điện
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./css/login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/action/updateAction";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    var userCurrent = localStorage.getItem("userInfo");
    console.log("data: ", userCurrent);
    if (userCurrent != null) {
      navigate("/");
    } else {
      console.log("Da vao trang");
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    const info = {
      username,
      password,
    };
    const { data } = await axios.post(`http://192.168.0.114:5000/login`, info);
    if (data === false) {
      alert("Vui lòng kiểm tra lại tên người dùng hoặc mật khẩu");
    } else {
      console.log("data: ", data.username);
      dispatch(updateUser(data.username));
      localStorage.setItem("userInfo", data.username);
      navigate("/");
    }
  };
  return (
    <div className={`${styles.overlay}`}>
      <Form onSubmit={login}>
        <Form.Group className="mb-3 text-center">
          <h1>Đăng nhập</h1>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={`${styles.btn}`}>
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;

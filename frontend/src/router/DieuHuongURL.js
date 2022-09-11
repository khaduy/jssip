import * as React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "../components/trangchu/Home";
import Login from "../components/login/Login";

function DieuHuongURL() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}


export default DieuHuongURL;
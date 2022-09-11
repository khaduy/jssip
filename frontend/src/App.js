import React, { Component } from "react";
import "./App.css";
import DieuHuongURL from "./router/DieuHuongURL";
import { Provider } from "react-redux";
import { store } from "./redux/store";
class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <DieuHuongURL />
        </Provider>
      </div>
    );
  }
}

export default App;

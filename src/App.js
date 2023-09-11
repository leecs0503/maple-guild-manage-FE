import React, { Component} from "react";
import "./App.css";
import ScreenCapture from "./components/screen_capture"

class App extends Component{
  render(){
    return(
      <div className="App">
        <ScreenCapture />
      </div>
    );
  }
}

export default App;

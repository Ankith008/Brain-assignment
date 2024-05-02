import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./component/Signup";
import ContextState from "./Context/ContextState";
import Alert from "./component/Alert";
import Home from "./component/Home";
import Addpost from "./component/Addpost";
import Viewpost from "./component/Viewpost";
import Card from "./component/Card";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ContextState>
          <Alert />
          <Routes>
            <Route exact path="/login" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/addpost" element={<Addpost />} />
            <Route exact path="/card" element={<Card />} />
            <Route exact path="/viewpost" element={<Viewpost />} />
          </Routes>
        </ContextState>
      </BrowserRouter>
    </div>
  );
}

export default App;

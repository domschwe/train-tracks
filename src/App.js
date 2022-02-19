import "./App.css";
// import { AmplifyProvider } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css"; // default theme
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { HashRouter, Routes, Route } from "react-router-dom";

import HeaderMenu from "./components/HeaderMenu";
import Home from "./pages/Home";
import InstructorPage from "./pages/InstructorPage";

Amplify.configure(awsconfig);

function App() {
  return (
    <>
      <HashRouter>
        <div>
          <HeaderMenu />
          <hr />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/instructors" element={<InstructorPage />} />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;

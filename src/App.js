import "./App.css";
// import { AmplifyProvider } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css"; // default theme
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeaderMenu from "./components/HeaderMenu";
import Home from "./pages/Home";
import InstructorPage from "./pages/InstructorPage";
import { ScrollView } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderMenu />
        <ScrollView padding="20px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instructors" element={<InstructorPage />} />
          </Routes>
        </ScrollView>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
// import { AmplifyProvider } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@aws-amplify/ui-react/styles.css"; // default theme
import Amplify, { Hub, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeaderMenu from "./components/HeaderMenu";
import Home from "./pages/Home";
import InstructorPage from "./pages/InstructorPage";
import TrainingPage from "./pages/TrainingPage";
import { ScrollView, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);
  const [userGroups, setUserGroups] = useState(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          getUser().then((userData) => setUser(userData));
          break;
        case "signOut":
          setUser(null);
          setUserGroups(null);
          break;
        case "signIn_failure":
          console.log("Sign in failure", data);
          break;
      }
    });

    getUser().then((userData) => {
      setUser(userData);
      if (userData) {
        setUserGroups(
          userData.signInUserSession.accessToken.payload["cognito:groups"]
        );
      } else {
        setUserGroups(null);
      }
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }
  return (
    <>
      <BrowserRouter>
        <HeaderMenu user={user} />
        <ScrollView padding="20px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instructors" element={<InstructorPage />} />
            <Route path="/trainings" element={<TrainingPage />} />
          </Routes>
        </ScrollView>
      </BrowserRouter>
    </>
  );
}

export default withAuthenticator(App);

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
import ProfilePage from "./pages/ProfilePage";

Amplify.configure(awsconfig);

function App({ signOut }) {
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
        default:
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

  async function getUser() {
    return await Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }
  return (
    <>
      <BrowserRouter>
        {/* <div style={padding: "5%"}> */}
        
        <ScrollView padding="7%">
        <HeaderMenu user={user} signOut={signOut} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/instructors"
              element={<InstructorPage userGroups={userGroups} />}
              />
            <Route
              path="/trainings"
              element={<TrainingPage userGroups={userGroups} />}
              />
            <Route
              path="/profile"
              element={<ProfilePage user={user} />}
              />
          </Routes>
        </ScrollView>
              {/* </div> */}
      </BrowserRouter>
    </>
  );
}

export default withAuthenticator(App);

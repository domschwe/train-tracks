import React, { useState, useEffect } from "react";
import { Hub, Auth } from "aws-amplify";
// import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Flex } from "@aws-amplify/ui-react";

export default function HeaderMenu(props) {
  // const [user, setUser] = useState(null);
  // const [userGroups, setUserGroups] = useState(null);

  // useEffect(() => {
  //   Hub.listen("auth", ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "signIn":
  //         getUser().then((userData) => setUser(userData));
  //         break;
  //       case "signOut":
  //         setUser(null);
  //         setUserGroups(null);
  //         break;
  //       case "signIn_failure":
  //         console.log("Sign in failure", data);
  //         break;
  //     }
  //   });

  //   getUser().then((userData) => {
  //     setUser(userData);
  //     if (userData) {
  //       setUserGroups(
  //         userData.signInUserSession.accessToken.payload["cognito:groups"]
  //       );
  //     } else {
  //       setUserGroups(null);
  //     }
  //   });
  // }, []);

  // function getUser() {
  //   return Auth.currentAuthenticatedUser()
  //     .then((userData) => userData)
  //     .catch(() => console.log("Not signed in"));
  // }

  return (
    <Flex direction="row" gap="1.5rem">
      <h1>NchikotApp</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/trainings">All Trainings</NavLink>
      <NavLink to="/instructors">Instructors</NavLink>
      <div>
        <NavLink to="/">
          Manage profile for {props.user.attributes.email}
        </NavLink>
      </div>
    </Flex>
  );
}

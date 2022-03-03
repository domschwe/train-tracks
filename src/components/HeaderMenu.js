import React from "react";
import Amplify, { Hub, Auth } from "aws-amplify";
import { NavLink } from "react-router-dom";
import { Button, Flex } from "@aws-amplify/ui-react";
// import getUser from "../util/getUser";

export default function HeaderMenu(props) {
  return (
    <Flex direction="row" gap="1.5rem">
      <h1>NchikotApp</h1>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/trainings">All Trainings</NavLink>
      <NavLink to="/instructors">Instructors</NavLink>
      {props.user !== null && (
        <>
          <NavLink to="/profile">Manage Profile</NavLink>
          <Button onClick={props.signOut}>Sign out</Button>
          </>
      )}
    </Flex>
  );
}

import React from "react";
// import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Flex } from "@aws-amplify/ui-react";

export default function HeaderMenu() {
  return (
    <Flex direction="row" gap="1.5rem">
      <h1>Train-Tracks</h1>
      <NavLink to="/">All Trainings</NavLink>
      <NavLink to="/instructors">Instructors</NavLink>
    </Flex>
  );
}

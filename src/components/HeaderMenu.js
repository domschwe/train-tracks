import React, { useEffect, useState } from "react";
import Amplify, { Storage } from "aws-amplify";
import { NavLink } from "react-router-dom";
import { Button, Flex, Image } from "@aws-amplify/ui-react";
// import getUser from "../util/getUser";

export default function HeaderMenu(props) {
  const [logo, setLogo] = useState();

  async function getLogo()
  {
    const img = await Storage.get("logo.png");
    setLogo(img)
  }

  useEffect(() =>
  {
    getLogo()
  }, [])
  return (
    <Flex direction="row" gap="1.5rem">
      {/* {testS3()} */}
      <Image
        src={logo}
        width="10%"
        height="10%"
      />
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

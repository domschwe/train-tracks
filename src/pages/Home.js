import React, { useState, useEffect, useContext } from "react";
import { API, Storage, Auth } from "aws-amplify";
import { Text, Heading, Image, Button, Flex } from "@aws-amplify/ui-react";
import ProfileForm from "../components/ProfileForm";
import { getTraining } from "../graphql/queries";
import { UserContext } from "../App";

export default function Home() {
  const [logo, setLogo] = useState();
  const [registering, setRegistering] = useState(false);
  const { user } = useContext(UserContext);

  async function getLogo() {
    const img = await Storage.get("conference/Conference Logo.jpg");
    setLogo(img);
  }

  useEffect(() => {
    getLogo();
  }, []);

  async function getRegistered()
  {
       const user = await Auth.currentAuthenticatedUser();

    // const status = await API.graphql({
    //   query: getTraining,
    //   variables: { input: { attendees: user.attributes.email} },
    // });
    console.log(user.username);
  }

  return (
    <>
      {console.log(getRegistered())}
      <Heading level={2}>Conferences</Heading>
      <Heading level={4}>by Arllen</Heading>
      <br />
      <Image src={logo} />
      <Flex direction="row" justifyContent="space-between">
        <Button onClick={() => setRegistering(!registering)}>
          Register Now!
        </Button>
        <Button>More Info</Button>
      </Flex>
      <br />
      {registering && (
        <Flex direction="column">
          <ProfileForm registration={true} />
        </Flex>
      )}
    </>
  );
}

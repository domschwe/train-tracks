import React, { useState, useEffect } from "react";
import { API, Storage, Auth, graphqlOperation, Hub } from "aws-amplify";
import { Heading, Image, Button, Flex } from "@aws-amplify/ui-react";
import ProfileForm from "../components/ProfileForm";
import { listTrainings } from "../graphql/queries";

export default function Home() {
  const [logo, setLogo] = useState();
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    getLogo();
    getRegistered();
    Hub.listen("RegistrationEvents", ({ payload: { event } }) => {
      switch (event) {
        case "modified":
          getRegistered();
          setRegistering(false)
          break;
        default:
          break;
      }
    });

    async function getLogo() {
      const img = await Storage.get("conference/Conference Logo.jpg");
      setLogo(img);
    }
    async function getRegistered() {
      const user = await Auth.currentAuthenticatedUser();

      try {
        const attendeeData = await API.graphql(
          graphqlOperation(listTrainings, {
            filter: {
              id: { eq: "e8956193-a12f-4954-bb9b-97d3013bf89d" },
            },
          })
        );
        await setAttendees(attendeeData.data.listTrainings.items[0].attendees);
        await setRegistered(
          attendeeData.data.listTrainings.items[0].attendees.includes(
            user.username
          )
        );
      } catch {
        setAttendees([]);
        setRegistered(false);
      }
    }
  }, []);

  return (
    <>
      {console.log(attendees)}
      {console.log(registered)}
      <Heading level={2}>Conferences</Heading>
      <Heading level={4}>by Arllen</Heading>
      <br />
      <Image src={logo} />
      <Flex direction="row" justifyContent="space-between">
        <Button onClick={() => setRegistering(!registering)}>
          {!registered && "Register Now!"}{" "}
          {registered && "Already Registered. Modify Registration?"}
        </Button>
        <Button>More Info</Button>
      </Flex>
      <br />
      {registering && (
        <Flex direction="column">
          <ProfileForm
            registration={true}
            registered={registered}
            attendees={attendees}
          />
        </Flex>
      )}
    </>
  );
}

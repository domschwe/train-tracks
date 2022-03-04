import React, { useEffect, useState } from "react";
import { API, Auth, Hub } from "aws-amplify";
import { Text, TextField, Badge, Button, Loader } from "@aws-amplify/ui-react";
import { updateTraining } from "../graphql/mutations";

export default function ProfileForm(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [denomination, setDenomination] = useState("");
  const [church, setChurch] = useState("");
  const [role, setRole] = useState("");
  const [complete, setComplete] = useState(false);
  const [saving, setSaving] = useState(false);
  const { registration, registered, attendees } = props;

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (name && phone && denomination && church && role) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [name, phone, denomination, church, role]);

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    await setEmail(user.attributes.email);
    await setName(user.attributes.name || "");
    await setPhone(user.attributes["custom:phone"] || "");
    await setDenomination(user.attributes["custom:denomination"] || "");
    await setChurch(user.attributes["custom:church"] || "");
    await setRole(user.attributes["custom:role"] || "");
  }

  async function updateUser() {
    const user = await Auth.currentAuthenticatedUser();
    setSaving(true);
    await Auth.updateUserAttributes(user, {
      name,
      "custom:phone": phone,
      "custom:denomination": denomination,
      "custom:church": church,
      "custom:role": role,
    });

    if (registration && !registered) {
      const newAttendees = [...attendees, user.username];
      await API.graphql({
        query: updateTraining,
        variables: {
          input: {
            id: "e8956193-a12f-4954-bb9b-97d3013bf89d",
            attendees: newAttendees,
          },
        },
      });

      console.log(newAttendees)
      Hub.dispatch("RegistrationEvents", {
        data: {},
        event: "modified",
        message: "A user was registered",
      });
    }
    setSaving(false);
    console.log(user);
  }

  async function handleRemoveClick() {
    const user = await Auth.currentAuthenticatedUser();
    setSaving(true);
    const newAttendees = attendees.filter((item) => item !== user.username);
    await API.graphql({
      query: updateTraining,
      variables: {
        input: {
          id: "e8956193-a12f-4954-bb9b-97d3013bf89d",
          attendees: newAttendees,
        },
      },
    });
    Hub.dispatch("RegistrationEvents", {
      data: {},
      event: "modified",
      message: "A user was removed",
    });

    setSaving(false);
  }

  return (
    <>
      <Text>Please complete the form below:</Text>
      <TextField
        label="Email (Cannot be Modified)"
        placeholder="email"
        value={email}
        isReadOnly={true}
      />
      <TextField
        label="Name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        placeholder="Phone #"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Denomination"
        placeholder="e.g. Baptist"
        value={denomination}
        onChange={(e) => setDenomination(e.target.value)}
      />
      <TextField
        label="Church / Ministry"
        placeholder="e.g. Mclean Bible Church"
        value={church}
        onChange={(e) => setChurch(e.target.value)}
      />
      <TextField
        label="Role in Church / Ministry"
        placeholder="e.g. Youth Pastor"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      {complete && <Badge variation="success">Profile Complete</Badge>}
      {!complete && <Badge variation="error">Profile Not Complete</Badge>}
      {!saving && (
        <>
          <Button onClick={updateUser} disabled={!complete}>
            Save{registration && !registered && " and Register"}
          </Button>
          {registered && (
            <Button onClick={handleRemoveClick}>Remove Registration</Button>
          )}
        </>
      )}
      {saving && (
        <Button disabled={true}>
          <Loader /> Saving...
        </Button>
      )}
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Heading, TextField } from "@aws-amplify/ui-react";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [denomination, setDenomination] = useState("");
  const [church, setChurch] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    updateUser();
  }, [name, phone, denomination, church, role]);

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    setEmail(user.attributes.email);
    setName(user.attributes.name);
    setPhone(user.attributes["custom:phone"]);
    setDenomination(user.attributes["custom:denomination"] || "");
    setChurch(user.attributes["custom:church"] || "");
    setRole(user.attributes["custom:role"] || "");
  }
  async function updateUser() {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      name,
      "custom:phone": phone,
      "custom:denomination": denomination,
      "custom:church": church,
      "custom:role": role,
    });
    console.log(user);
  }
  return (
    <>
      <Heading level={3}>Profile Page</Heading>
      <TextField
        label="Email"
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
    </>
  );
}

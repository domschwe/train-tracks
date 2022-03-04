import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Heading, TextField } from "@aws-amplify/ui-react";
import ProfileForm from "../components/ProfileForm";

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
    setName(user.attributes.name || "");
    setPhone(user.attributes["custom:phone"] || "");
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
      <ProfileForm />
    </>
  );
}

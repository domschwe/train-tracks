import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Text, Heading, Image, Button } from "@aws-amplify/ui-react";

export default function Home() {
  const [logo, setLogo] = useState();
  async function getLogo() {
    const img = await Storage.get("conference/Conference Logo.jpg");
    setLogo(img);
  }

  useEffect(() => {
    getLogo();
  }, []);

  return (
    <>
      <Heading level={2}>Conferences</Heading>
      <Heading level={4}>by Arllen</Heading>
      <br />
      <Image src={logo} />
      <Button>Register Now!</Button>
    </>
  );
}

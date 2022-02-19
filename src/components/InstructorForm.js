import React, { useState, useEffect } from "react";
import { Heading, TextField, Button, Flex } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { createInstructor } from "../graphql/mutations";

export default function InstructorForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setDisabled(name === "");
  }, [name]);

  function onAddInstructorClick() {
    visible ? setVisible(false) : setVisible(true);
  }
  async function onSubmitClick() {
    try {
      setSaving(true);
      if (!name | !bio) return;
      await API.graphql({
        query: createInstructor,
        variables: { input: { name, bio, picture: "./missing.jpeg" } },
      });
      setBio("");
      setName("");
      setSaving(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Flex direction="column" gap="1.5rem">
      <Button onClick={onAddInstructorClick}>+ New Instructor</Button>
      {visible && (
        <span>
          <Heading level={3}>Add New Instructor</Heading>
          <TextField
            label="Name*"
            placeholder="Name"
            isRequired={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Bio"
            placeholder="Enter a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            isMultiline={true}
            resize="vertical"
            rows={3}
          />
          <Button
            variation="primary"
            onClick={onSubmitClick}
            isDisabled={disabled}
          >
            Save Instructor
          </Button>
        </span>
      )}
    </Flex>
  );
}

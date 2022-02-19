import React, { useState, useEffect } from "react";
import {
  Heading,
  TextField,
  Button,
  Flex,
  Divider,
} from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listInstructors } from "../graphql/queries";
import { createInstructor } from "../graphql/mutations";

import InstructorCard from "./InstructorCard";

export default function TrainingForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInstructors();
  }, [saving]);

  useEffect(() => {
    setDisabled(name === "");
  }, [name]);

  async function fetchInstructors() {
    try {
      const instructorData = await API.graphql({ query: listInstructors });
      setInstructors(instructorData.data.listInstructors.items);
    } catch (err) {
      console.log({ err });
    }
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
      <Heading level={3}>Add New Training</Heading>
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
      <Button variation="primary" onClick={onSubmitClick} isDisabled={disabled}>
        Add Instructor
      </Button>
      <Divider border="5px solid blue" borderRadius="10px" />
      {console.log(instructors)}
      {instructors.map((instructor) => {
        return <InstructorCard {...instructor} />;
      })}
    </Flex>
  );
}

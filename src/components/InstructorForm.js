import React, { useState, useEffect } from "react";
import {
  Heading,
  TextField,
  Button,
  Flex,
  Divider,
  Text,
} from "@aws-amplify/ui-react";

import InstructorCard from "./InstructorCard";

export default function TrainingForm() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(name === "");
  }, [name]);

  function onSubmitClick() {
    setInstructors([...instructors, name]);
    setBio("");
    setName("");
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
      {instructors.map((instructor) => {
        return (
          <>
            <InstructorCard name={instructor} />
          </>
        );
      })}
    </Flex>
  );
}

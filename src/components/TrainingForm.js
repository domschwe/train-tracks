import React, { useState } from "react";
import {
  Heading,
  TextField,
  Button,
  Flex,
  SelectField,
} from "@aws-amplify/ui-react";

export default function TrainingForm() {
  const [title, setTitle] = useState("");
  const [instructors, setInstructors] = useState(["Dom", "Ludmilla", "Arlen"]);
  const [description, setDescription] = useState("");

  return (
    <Flex direction="column" gap="1.5rem">
      <Heading level={3}>Add New Training</Heading>
      <TextField
        label="Training Title*"
        placeholder="Title"
        isRequired={true}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        isMultiline={true}
        resize="vertical"
        rows={3}
      />
      <SelectField
        label="Instructor"
        labelHidden={true}
        placeholder="Instructor"
      >
        {instructors.map((instructor) => {
          console.log(instructor);
          return <option value={instructor}>{instructor}</option>;
        })}
      </SelectField>
      <Button variation="primary">Create Training</Button>
    </Flex>
  );
}

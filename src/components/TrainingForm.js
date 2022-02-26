import React, { useState, useEffect } from "react";
import {
  Heading,
  TextField,
  Button,
  Flex,
  SelectField,
} from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listInstructors } from "../graphql/queries";
import { createTraining } from "../graphql/mutations";

export default function TrainingForm() {
  const [instructors, setInstructors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [saving, setSaving] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);

  // Make sure a title is entered
  useEffect(() => {
    setDisabled(title === "");
  }, [title]);

  // Make form visible on click
  function onAddTrainingClick() {
    visible ? setVisible(false) : setVisible(true);
  }

  // Get instructor list
  useEffect(() => {
    fetchInstructors();
  });

  async function fetchInstructors() {
    try {
      const instructorData = await API.graphql({ query: listInstructors });
      setInstructors(instructorData.data.listInstructors.items);
    } catch (err) {
      console.log({ err });
    }
  }
  // Create new DB entry
  async function onSubmitClick() {
    try {
      setSaving(true);
      if (!title) return;
      await API.graphql({
        query: createTraining,
        variables: {
          input: {
            title,
            description,
            instructorTrainingsId: selectedInstructor,
          },
        },
      });
      console.log(selectedInstructor);
      setTitle("");
      setDescription("");
      setSelectedInstructor("");
      setSaving(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Flex direction="column" gap="1.5rem">
      <Button onClick={onAddTrainingClick}>+ New Training</Button>
      {visible && (
        <span>
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
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
          >
            {instructors.map((instructor) => {
              console.log(instructor);
              return <option value={instructor.id}>{instructor.name}</option>;
            })}
          </SelectField>
          <Button
            variation="primary"
            onClick={onSubmitClick}
            isDisabled={disabled}
          >
            Create Training
          </Button>
        </span>
      )}
    </Flex>
  );
}

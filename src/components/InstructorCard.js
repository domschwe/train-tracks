import {
  Card,
  Heading,
  Flex,
  Text,
  Image,
  Button,
} from "@aws-amplify/ui-react";
import { updateInstructor } from "../graphql/mutations";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { TextField } from "@aws-amplify/ui-react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function InstructorCard(props) {
  const [updating, setUpdating] = useState(false);
  const [name, setName] = useState(props.name);
  const [bio, setBio] = useState(props.bio);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleUpdateClick() {
    setUpdating(true);
  }

  function handleDoneUpdatingClick() {
    setUpdating(false);
  }
  async function handleDeleteClick() {
    await API.graphql({
      query: updateInstructor,
      variables: { input: { id: props.id, enabled: false } },
    });
    setModalOpen(false);
  }

  useEffect(() => {
    API.graphql({
      query: updateInstructor,
      variables: { input: { id: props.id, name, bio } },
    });
  }, [name, bio]);

  return (
    <Card variation="elevated">
      <Flex direction="row" alignItems="flex-start">
        <Image
          alt="Instructor Picture"
          src={props.picture !== "" ? props.picture : "./missing.jpeg"}
          width="25%"
        />
        <Flex direction="column" alignItems="flex-start" width="75%">
          {!updating && (
            <>
              <Heading level={5}>{name}</Heading>
              <Text as="span">{bio}</Text>
              <Button onClick={handleUpdateClick}>Update Details</Button>
            </>
          )}
          {updating && (
            <>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TextField>
              <TextField
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                isMultiline={true}
                resize="vertical"
              ></TextField>
              <Button onClick={handleDoneUpdatingClick}>
                Finished Updates
              </Button>
            </>
          )}
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            contentLabel="Confirm Delete?"
            style={customStyles}
          >
            <Text>
              Are you sure you want to delete {name} from the instructor list?
            </Text>
            <Text>You can reverse this later if you change your mind.</Text>
            <Button onClick={handleDeleteClick}>
              Confirm Delete Instructor
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </Modal>
          <Button onClick={() => setModalOpen(true)}>Delete Instructor</Button>
        </Flex>
      </Flex>
    </Card>
  );
}

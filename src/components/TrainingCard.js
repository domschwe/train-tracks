import { Card, Heading, Flex, Text, Button } from "@aws-amplify/ui-react";
import { updateTraining } from "../graphql/mutations";
import { API } from "aws-amplify";
import { useEffect, useState, useContext } from "react";
import { TextField } from "@aws-amplify/ui-react";
import Modal from "react-modal";
import { UserContext } from "../App";

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

export default function TrainingCard(props) {
  const [updating, setUpdating] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [modalOpen, setModalOpen] = useState(false);
  const [enabled, setEnabled] = useState(props.enabled);
  const { userGroups } = useContext(UserContext);

  const admin = userGroups.includes("admin")

  async function handleDeleteClick() {
    await API.graphql({
      query: updateTraining,
      variables: { input: { id: props.id, enabled: false } },
    });
    setEnabled(false);
    setModalOpen(false);
  }
  async function handleRestoreClick() {
    await API.graphql({
      query: updateTraining,
      variables: { input: { id: props.id, enabled: true } },
    });
    setEnabled(true);
  }

  useEffect(() => {
    API.graphql({
      query: updateTraining,
      variables: { input: { id: props.id, title, description } },
    });
  }, [props.id, title, description]);

  return (
    <Card variation="elevated">
      {console.log(userGroups)}
      <Flex direction="row" alignItems="flex-start">
        <Flex direction="column" alignItems="flex-start" width="75%">
          {!updating && (
            <>
              <Heading level={5}>{title}</Heading>
              <Text as="span">{description}</Text>
            </>
          )}

            {updating && (
              <>
              <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ></TextField>
              <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isMultiline={true}
              resize="vertical"
              ></TextField>
              </>
              )}
        </Flex>
        
        <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Confirm Delete?"
        style={customStyles}
        >
          <Text>
            Are you sure you want to delete {title} from the training list?
          </Text>
          <Text>You can reverse this later if you change your mind.</Text>

          <Button onClick={handleDeleteClick}>Confirm Delete Training</Button>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
        </Modal>
        <Flex direction="column" alignItems="flex-start" width="25%">
          {!updating && admin && (
            <>
              <Button onClick={() => setUpdating(true)}>Update Details</Button>
            </>
          )}
          {updating && (
            <>
              <Button onClick={() => setUpdating(false)}>
                Finished Updates
              </Button>
            </>
          )}
          {enabled && admin && (
            <Button onClick={() => setModalOpen(true)}>Delete Training</Button>
            )}
          {!enabled && admin && (
            <Button onClick={handleRestoreClick}>Restore Training</Button>
            )}
        </Flex>
      </Flex>
    </Card>
  );
}

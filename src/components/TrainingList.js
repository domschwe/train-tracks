import React, { useState, useEffect, useContext } from "react";
import { Flex, Button, Heading } from "@aws-amplify/ui-react";
import { API, Hub } from "aws-amplify";
import { listTrainings } from "../graphql/queries";
import { UserContext } from "../App";
import TrainingCard from "./TrainingCard";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const { userGroups } = useContext(UserContext);

  useEffect(() => {
    fetchTrainings();

    Hub.listen("TrainingEvents", ({ payload: { event, data } }) => {
      switch (event) {
        case "added":
          fetchTrainings();
          break;
        default:
          break;
      }
    });
  }, []);

  async function fetchTrainings(props) {
    try {
      const trainingData = await API.graphql({ query: listTrainings });
      setTrainings(trainingData.data.listTrainings.items);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <Flex direction="column" gap="1.5rem">
      <Heading level={2}>All Events</Heading>
      {trainings
        .filter((training) => training.enabled)
        .map((training) => {
          return <TrainingCard key={training.id} {...training} />;
        })}
      {userGroups && userGroups.includes("admin") && (
        <>
          <Button onClick={() => setShowDeleted(!showDeleted)}>
            Show Deleted Trainings
          </Button>
          {showDeleted &&
            trainings
              .filter((training) => !training.enabled)
              .map((training) => {
                return <TrainingCard key={training.id} {...training} />;
              })}
        </>
      )}
    </Flex>
  );
}

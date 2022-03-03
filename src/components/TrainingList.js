import React, { useState, useEffect, useContext } from "react";
import { Flex, Button } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listTrainings } from "../graphql/queries";
import { UserContext } from "../App";
import TrainingCard from "./TrainingCard";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const { userGroups } = useContext(UserContext);

  useEffect(() => {
    fetchTrainings();
  }, [trainings]);

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
      {trainings
        .filter((training) => training.enabled)
        .map((training) => {
          return <TrainingCard {...training} />;
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
                return <TrainingCard {...training} />;
              })}
        </>
      )}
    </Flex>
  );
}

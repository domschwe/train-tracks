import React, { useState, useEffect } from "react";
import { Flex, Button } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listTrainings } from "../graphql/queries";

import TrainingCard from "./TrainingCard";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    fetchTrainings();
  });

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
      <Button onClick={() => setShowDeleted(!showDeleted)}>
        Show Deleted Trainings
      </Button>
      {showDeleted &&
        trainings
          .filter((training) => !training.enabled)
          .map((training) => {
            return <TrainingCard {...training} />;
          })}
    </Flex>
  );
}

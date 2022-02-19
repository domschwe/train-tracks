import React from "react";
import TrainingForm from "../components/TrainingForm";
import { Text } from "@aws-amplify/ui-react";

export default function Home() {
  return (
    <>
      <Text>
        This is the home page, please see all the training classes we offer:
      </Text>
      <TrainingForm />
    </>
  );
}

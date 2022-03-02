import React from "react";
import { Divider } from "@aws-amplify/ui-react";
import TrainingForm from "../components/TrainingForm";
import TrainingList from "../components/TrainingList";

export default function TrainingPage(props) {
  return (
    <>
      {props.userGroups && props.userGroups.includes("admin") && (
        <>
          <TrainingForm />
          <Divider border="5px solid blue" borderRadius="10px" />
        </>
      )}
      <TrainingList />
      {console.log({ props })}
    </>
  );
}

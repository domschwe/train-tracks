import React from "react";
import { Divider } from "@aws-amplify/ui-react";
import InstructorForm from "../components/InstructorForm";
import InstructorList from "../components/InstructorList";

export default function InstructorPage(props) {
  return (
    <>
      {props.userGroups && props.userGroups.includes("admin") && (
        <>
          <InstructorForm />
          <Divider border="5px solid blue" borderRadius="10px" />
        </>
      )}
      <InstructorList />
    </>
  );
}

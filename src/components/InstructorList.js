import React, { useState, useEffect } from "react";
import {
  Flex,
} from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { listInstructors } from "../graphql/queries";

import InstructorCard from "./InstructorCard";

export default function InstructorList() {
  const [instructors, setInstructors] = useState([]);

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

  return (
    <Flex direction="column" gap="1.5rem">
      {console.log(instructors)}
      {instructors.map((instructor) => {
        return <InstructorCard {...instructor} />;
      })}
    </Flex>
  );
}

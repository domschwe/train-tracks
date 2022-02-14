/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInstructor = /* GraphQL */ `
  mutation CreateInstructor(
    $input: CreateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    createInstructor(input: $input, condition: $condition) {
      id
      name
      trainings {
        items {
          id
          title
          createdAt
          updatedAt
          instructorTrainingsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateInstructor = /* GraphQL */ `
  mutation UpdateInstructor(
    $input: UpdateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    updateInstructor(input: $input, condition: $condition) {
      id
      name
      trainings {
        items {
          id
          title
          createdAt
          updatedAt
          instructorTrainingsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteInstructor = /* GraphQL */ `
  mutation DeleteInstructor(
    $input: DeleteInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    deleteInstructor(input: $input, condition: $condition) {
      id
      name
      trainings {
        items {
          id
          title
          createdAt
          updatedAt
          instructorTrainingsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTraining = /* GraphQL */ `
  mutation CreateTraining(
    $input: CreateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    createTraining(input: $input, condition: $condition) {
      id
      title
      instructor {
        id
        name
        trainings {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          trainingCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      instructorTrainingsId
    }
  }
`;
export const updateTraining = /* GraphQL */ `
  mutation UpdateTraining(
    $input: UpdateTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    updateTraining(input: $input, condition: $condition) {
      id
      title
      instructor {
        id
        name
        trainings {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          trainingCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      instructorTrainingsId
    }
  }
`;
export const deleteTraining = /* GraphQL */ `
  mutation DeleteTraining(
    $input: DeleteTrainingInput!
    $condition: ModelTrainingConditionInput
  ) {
    deleteTraining(input: $input, condition: $condition) {
      id
      title
      instructor {
        id
        name
        trainings {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          trainingCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
      instructorTrainingsId
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      training {
        id
        title
        instructor {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        instructorTrainingsId
      }
      content
      createdAt
      updatedAt
      trainingCommentsId
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      training {
        id
        title
        instructor {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        instructorTrainingsId
      }
      content
      createdAt
      updatedAt
      trainingCommentsId
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      training {
        id
        title
        instructor {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
        instructorTrainingsId
      }
      content
      createdAt
      updatedAt
      trainingCommentsId
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInstructor = /* GraphQL */ `
  subscription OnCreateInstructor {
    onCreateInstructor {
      id
      name
      picture
      bio
      enabled
      trainings {
        items {
          id
          title
          description
          enabled
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
export const onUpdateInstructor = /* GraphQL */ `
  subscription OnUpdateInstructor {
    onUpdateInstructor {
      id
      name
      picture
      bio
      enabled
      trainings {
        items {
          id
          title
          description
          enabled
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
export const onDeleteInstructor = /* GraphQL */ `
  subscription OnDeleteInstructor {
    onDeleteInstructor {
      id
      name
      picture
      bio
      enabled
      trainings {
        items {
          id
          title
          description
          enabled
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
export const onCreateTraining = /* GraphQL */ `
  subscription OnCreateTraining {
    onCreateTraining {
      id
      title
      description
      enabled
      instructor {
        id
        name
        picture
        bio
        enabled
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
export const onUpdateTraining = /* GraphQL */ `
  subscription OnUpdateTraining {
    onUpdateTraining {
      id
      title
      description
      enabled
      instructor {
        id
        name
        picture
        bio
        enabled
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
export const onDeleteTraining = /* GraphQL */ `
  subscription OnDeleteTraining {
    onDeleteTraining {
      id
      title
      description
      enabled
      instructor {
        id
        name
        picture
        bio
        enabled
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      training {
        id
        title
        description
        enabled
        instructor {
          id
          name
          picture
          bio
          enabled
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      training {
        id
        title
        description
        enabled
        instructor {
          id
          name
          picture
          bio
          enabled
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      training {
        id
        title
        description
        enabled
        instructor {
          id
          name
          picture
          bio
          enabled
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

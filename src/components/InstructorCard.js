import { Card, Heading, Flex, Text, Image } from "@aws-amplify/ui-react";

export default function InstructorCard(props) {
  const { name, picture, bio } = props;

  return (
    <Card variation="elevated">
      <Flex direction="row" alignItems="flex-start">
        <Image
          alt="Instructor Picture"
          src={picture !== "" ? picture : "./missing.jpeg"}
          width="33%"
        />
        <Flex direction="column" alignItems="flex-start">
          <Heading level={5}>{name}</Heading>

          <Text as="span">{bio}</Text>
        </Flex>
      </Flex>
    </Card>
  );
}

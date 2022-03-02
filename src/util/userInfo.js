import { Auth } from "aws-amplify";

export default async function userInfo() {
  const user = await Auth.currentAuthenticatedUser();

  const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

  return {
    user,
    groups,
  };
}

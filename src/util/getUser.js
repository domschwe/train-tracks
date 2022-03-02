import { Auth } from "aws-amplify";

export default function getUser() {
  return Auth.currentAuthenticatedUser()
    .then((userData) => userData)
    .catch(() => console.log("Not signed in"));
}

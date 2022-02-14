import "./App.css";
// import { AmplifyProvider } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.min.css";
import '@aws-amplify/ui-react/styles.css'; // default theme
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";

import HeaderMenu from "./components/HeaderMenu";
import Home from "./pages/Home";

Amplify.configure(awsconfig);

function App() {
  return (
    <>
      <HeaderMenu />
      <Home />
    </>
  );
}

export default App;

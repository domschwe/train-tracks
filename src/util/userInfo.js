const [user, setUser] = useState(null);
const [userGroups, setUserGroups] = useState(null);

useEffect(() => {
  Hub.listen("auth", ({ payload: { event, data } }) => {
    switch (event) {
      case "signIn":
        getUser().then((userData) => setUser(userData));
        break;
      case "signOut":
        setUser(null);
        setUserGroups(null);
        break;
      case "signIn_failure":
        console.log("Sign in failure", data);
        break;
    }
  });

  getUser().then((userData) => {
    setUser(userData);
    if (userData) {
      setUserGroups(
        userData.signInUserSession.accessToken.payload["cognito:groups"]
      );
    } else {
      setUserGroups(null);
    }
  });
}, []);

function getUser() {
  return Auth.currentAuthenticatedUser()
    .then((userData) => userData)
    .catch(() => console.log("Not signed in"));
}

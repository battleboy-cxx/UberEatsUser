import { createContext, useState, useEffect, useContext } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  useEffect(() => {
    if (sub) {
      API.graphql(
        graphqlOperation(listUsers, { filter: { sub: { eq: sub } } })
      ).then((res) => {
        const user = res.data.listUsers.items[0];
        setDbUser(user);
      });
    }
  }, [sub]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

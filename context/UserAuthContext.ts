import * as React from "react";

const UserAuthContext = React.createContext({
  authenticated: false,
  setAuthenticated: (_: boolean) => {}
});

export default UserAuthContext

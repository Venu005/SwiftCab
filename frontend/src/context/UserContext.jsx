import React, { useState } from "react";
import { UserDataContext } from "./UserDataContext";
import PropTypes from "prop-types";

//create context
//use context

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  return (
    <div>
      <UserDataContext.Provider value={[user, setUser]}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};
UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;

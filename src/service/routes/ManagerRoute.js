import React, { useContext } from "react";
import { UserContext } from "../../context/user";

const ManagerRoute = () => {
  const { user } = useContext(UserContext);
  if (!user || !user.user || user.user.role != "MANAGER") {
    window.location.href = "/";
    return;
  }
  return <div>Manager Page</div>;
};

export default ManagerRoute;

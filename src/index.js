import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./component/home/Home";
import { UserContext } from "./context/user";
import { isSignedIn } from "./service/auth/localstorage";
import Login from "./component/login/Login.js";
import Signup from "./component/signup/Signup.js";
// import Error from "./Error";
import AdminDashboard from "./component/dashboard/admin/AdminDashboard.js";
import ManagerDashboard from "./component/dashboard/manager/ManagerDashboard";
import EmployeeDashboard from "./component/dashboard/employee/EmployeDashboard";
import Passwordchange from "./component/Passwordchange";
const root = ReactDOM.createRoot(document.getElementById("root"));
const App = () => {
  const [user, setUser] = useState(() => isSignedIn());
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup/" element={<Signup />} />
          <Route exact path="/signup/*" element={<Navigate to="/signup/" />} />
          <Route exact path="/change-password" element={<Passwordchange />} />
          <Route exact path="/:companyName" element={<Login />} />
          {user && user.user && user.user.role == "ADMIN" && (
            <Route
              exact
              path="/:companyName/dashboard"
              element={<AdminDashboard />}
            />
          )}
          {user && user.user && user.user.role == "EMPLOYEE" && (
            <Route
              exact
              path="/:companyName/dashboard"
              element={<EmployeeDashboard />}
            />
          )}
          {user && user.user && user.user.role == "MANAGER" && (
            <Route
              exact
              path="/:companyName/dashboard"
              element={<ManagerDashboard />}
            />
          )}
          <Route exact path="/:companyName/*" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};
root.render(<App />);

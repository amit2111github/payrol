import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/user";
import "./AdminDashboard.css";
import LeftPanel from "./AdminLeftPanel.js";
import Employee from "./Employee.js";
import Navbar from "./Navbar.js";
import EmployeeCreationForm from "./EmployeeCreationForm";
import EmployeeCreationFormCSV from "./EmployeeCreationFormCSV";
import EmployeTypeForm from "./EmployeTypeForm";
import DepartmentForm from "./DepartmentForm";
import ChangeManagerForm from "./ChangeManagerForm";
import DepartmentChangeForm from "./DepartmentChangeForm";
import ListManager from "./ListManager";
import ListDepartment from "./ListDepartment";
import { removeUser } from "../../../service/auth/localstorage";
import RequestedLeave from "./RequestedLeave";
import CreateLeaveForm from "./CreateLeaveForm";
import EmployeKyc from "./EmployeKyc";
import Profile from "../employee/Profile";
import UploadLogo from "./UploadLogo";
const AdminDashboard = () => {
	const { user, setUser } = useContext(UserContext);
	const [panelItemCount, setPanelItemCoutn] = useState(0); // 0 is for home
	const [operationCount, setOperationCount] = useState(null);
	if (!user || !user.user || user.user.role != "ADMIN") {
		window.location.href = "/";
		return;
	}
	const handleLogout = () => {
		setUser(null);
		removeUser();
	};
	return (
		<div style={{ overflowX: "hidden" }}>
			<Navbar handleLogout={handleLogout} />
			<div className="row main_section">
				<LeftPanel
					operationCount={operationCount}
					panelItemCount={panelItemCount}
					setPanelItemCoutn={setPanelItemCoutn}
					setOperationCount={setOperationCount}
					name={user.user.name}
				/>
				<div className="col-10 Right">
					<div className="bashboard_text">Dashboard</div>
					<div
						className={!operationCount ? "grey_body" : ""}
						style={{
							overflow: "auto",
							height: "528px",
						}}
					>
						{operationCount === 1 && <Employee />}
						{operationCount === 2 && <EmployeeCreationForm />}
						{operationCount === 3 && <EmployeeCreationFormCSV />}
						{operationCount === 4 && <EmployeTypeForm />}
						{operationCount === 5 && <DepartmentForm />}
						{operationCount === 6 && <DepartmentChangeForm />}
						{operationCount === 7 && <ListManager />}
						{operationCount === 8 && <ChangeManagerForm />}
						{operationCount === 9 && <ListDepartment />}
						{operationCount === 10 && <Profile />}
						{operationCount === 11 && <EmployeKyc />}
						{operationCount === 12 && <UploadLogo />}
						{operationCount === 77 && <RequestedLeave />}
						{operationCount === 777 && <CreateLeaveForm />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;

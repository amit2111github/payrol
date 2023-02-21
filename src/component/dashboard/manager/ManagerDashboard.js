import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user";
import Navbar from "./Navbar";
import { removeUser } from "../../../service/auth/localstorage";
import LeftPanel from "./LeftPanel";
import KycForm from "../employee/kyc/KycForm";
import { getKycStatus } from "../../../service/api/user";
import ShowEducationDetails from "../employee/display/ShowEducationDetails";
import ShowKycDetail from "../employee/display/ShowKycDetail";
import ShowAddressDetils from "../employee/display/ShowAddressDetils";
import ShowBankAccountDetail from "../employee/display/ShowBankAccountDetail";
import EmployeList from "./EmployeList";
import RequestedLeave from "./RequestedLeave";
import MyRequestedLeave from "../employee/leave/RequestedLeave";
import TakeLeave from "../employee/leave/MakeLeave";
import Profile from "../employee/Profile";
const ManagerDashboard = () => {
	const [panelItemCount, setPanelItemCoutn] = useState(0); // 0 is for home
	const [operationCount, setOperationCount] = useState(null);
	const [step, setStep] = useState(1); // only for kyc
	const { user, setUser } = useContext(UserContext);
	const [kycStatus, setKycStatus] = useState(null);
	useEffect(() => {
		(async function () {
			const data = await getKycStatus(user.user, user.token);
			if (data && data.error) {
				if (data.code == 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setKycStatus(data);
		})();
	}, []);
	if (!user || !user.user || user.user.role != "MANAGER") {
		window.location.href = "/";
		return;
	}
	const handleLogout = () => {
		setUser(null);
		removeUser();
	};

	return (
		<div style={{ overflow: "hidden" }}>
			<Navbar handleLogout={handleLogout} />
			<div className="row main_section">
				<LeftPanel
					operationCount={operationCount}
					panelItemCount={panelItemCount}
					setPanelItemCoutn={setPanelItemCoutn}
					setOperationCount={setOperationCount}
					name={user.user.name}
					step={step}
					kycStatus={kycStatus}
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
						{!kycStatus && operationCount === 10 && (
							<KycForm step={step} setStep={setStep} />
						)}
						{operationCount === 1 && <EmployeList />}
						{operationCount === 2 && <ShowEducationDetails />}
						{operationCount === 3 && <ShowAddressDetils />}
						{operationCount === 4 && <ShowBankAccountDetail />}
						{operationCount === 5 && <ShowKycDetail />}
						{operationCount === 6 && <RequestedLeave />}
						{operationCount === 7 && <TakeLeave />}
						{operationCount === 8 && <MyRequestedLeave />}
						{operationCount === 9 && <Profile />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManagerDashboard;
// {operationCount === 1 && <Employee />}
// {operationCount === 2 && <EmployeeCreationForm />}
// {operationCount === 3 && <EmployeeCreationFormCSV />}
// {operationCount === 4 && <EmployeTypeForm />}
// {operationCount === 5 && <DepartmentForm />}
// {operationCount === 6 && <DepartmentChangeForm />}
// {operationCount === 7 && <ListManager />}
// {operationCount === 8 && <ChangeManagerForm />}
// {operationCount === 9 && <ListDepartment />}

// {operationCount === 77 && <RequestedLeave />}
// {operationCount === 777 && <CreateLeaveForm />}

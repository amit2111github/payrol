import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user";
import Navbar from "../admin/Navbar";
import LeftPanel from "./EmployeLeftPanel";
import { getKycStatus } from "../../../service/api/user";
import { removeUser } from "../../../service/auth/localstorage";
import KycForm from "./kyc/KycForm";
import ShowKycDetail from "./display/ShowKycDetail";
import ShowAddressDetils from "./display/ShowAddressDetils";
import ShowBankAccountDetail from "./display/ShowBankAccountDetail";
import ShowEducationDetails from "./display/ShowEducationDetails";
import MakeLeave from "./leave/MakeLeave";
import RequestedLeave from "./leave/RequestedLeave";
import Profile from "./Profile";
const EmployeDashboard = () => {
	const [step, setStep] = useState(1); // only for kyc
	const { user, setUser } = useContext(UserContext);
	const [panelItemCount, setPanelItemCoutn] = useState(0); // 0 is for home
	const [operationCount, setOperationCount] = useState(0);
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
	if (!user || !user.user || user.user.role != "EMPLOYEE") {
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
					kycStatus={kycStatus}
					operationCount={operationCount}
					panelItemCount={panelItemCount}
					setPanelItemCoutn={setPanelItemCoutn}
					setOperationCount={setOperationCount}
					name={user.user.name}
					step={step}
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
						{!kycStatus && operationCount == 0 && (
							<p className="text-center pt-2">
								Your KYC is not done. Please complete it first.
							</p>
						)}
						{!kycStatus && operationCount === 10 && (
							<KycForm step={step} setStep={setStep} />
						)}
						{operationCount === 9 && <ShowEducationDetails />}
						{operationCount === 99 && <ShowAddressDetils />}
						{operationCount === 999 && <ShowBankAccountDetail />}
						{operationCount === 9999 && <ShowKycDetail />}
						{operationCount === 66 && <MakeLeave />}
						{operationCount === 666 && <RequestedLeave />}
						{operationCount === 99999 && <Profile />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmployeDashboard;

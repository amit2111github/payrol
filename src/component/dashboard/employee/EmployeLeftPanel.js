import React from "react";
import "./EmployeDashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import CampaignIcon from "@mui/icons-material/Campaign";
import WalletIcon from "@mui/icons-material/Wallet";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import TimeLine from "./kyc/TimeLine";
const isSelected = (item, need) => {
	return need === item ? "#5473e3" : "#000";
};
const EmployeLeftPanel = ({
	kycStatus,
	operationCount,
	setPanelItemCoutn,
	panelItemCount,
	name,
	setOperationCount,
	step,
}) => {
	return (
		<div className="col-2">
			<div className="row header_section-1">
				<div
					className="dohover row"
					onClick={() => setPanelItemCoutn(0)}
				>
					<div className="col-3 homeicondiv">
						<HomeIcon />
					</div>
					<div className="col-9 hoverdiv">
						<h6 className="home_text">Home</h6>
						<p className="header_text">its where the heart is!</p>
					</div>
				</div>
				<div className="row rightofpanel">
					<div className="col-3 bluebg">
						<div
							style={{
								backgroundColor:
									panelItemCount === 10 ? "#fff" : "",
							}}
							onClick={() => {
								setPanelItemCoutn(10);
								setOperationCount(10);
							}}
							className="icons"
							title="KYC"
						>
							<VerifiedUserIcon
								style={{
									color:
										panelItemCount === 10
											? "#5473e3"
											: "#fff",
								}}
							/>
						</div>
						<div
							style={{
								backgroundColor:
									panelItemCount === 1 ? "#fff" : "",
							}}
							onClick={() => setPanelItemCoutn(1)}
							className="icons"
							title="Tasks"
						>
							<ContentPasteIcon
								style={{
									color:
										panelItemCount === 1
											? "#5473e3"
											: "#fff",
								}}
							/>
						</div>
						<div
							className="icons"
							title="Leave"
							style={{
								backgroundColor:
									panelItemCount === 3 ? "#fff" : "",
							}}
							onClick={() => setPanelItemCoutn(3)}
						>
							<CalendarTodayIcon
								style={{
									color:
										panelItemCount === 3
											? "#5473e3"
											: "#fff",
								}}
							/>
						</div>

						<div
							className="icons"
							title="New on Payrol.com"
							style={{
								backgroundColor:
									panelItemCount === 5 ? "#fff" : "",
							}}
							onClick={() => setPanelItemCoutn(5)}
						>
							<CampaignIcon
								style={{
									color:
										panelItemCount === 5
											? "#5473e3"
											: "#fff",
								}}
							/>
						</div>
						<div
							className="icons"
							title="Expense claims"
							style={{
								backgroundColor:
									panelItemCount === 6 ? "#fff" : "",
							}}
							onClick={() => setPanelItemCoutn(6)}
						>
							<WalletIcon
								style={{
									color:
										panelItemCount === 6
											? "#5473e3"
											: "#fff",
								}}
							/>
						</div>
						<div
							className="icons"
							title="My Account"
							style={{
								backgroundColor:
									panelItemCount === 7 ? "#fff" : "",
							}}
							onClick={() => setPanelItemCoutn(7)}
						>
							<PersonIcon
								style={{
									color:
										panelItemCount === 7
											? "#5473e3"
											: "#fff",
								}}
							/>
						</div>
					</div>
					<div className="col-9">
						{panelItemCount === 0 && (
							<div className="user_info">
								<h6>Hello {name} 😊</h6>
								<p>
									You can navigate between modules by
									selecting different icons on the left
								</p>
							</div>
						)}
						{kycStatus && panelItemCount == 3 && (
							<div>
								<h5 className="heading_info">leave</h5>
								<p
									onClick={() => setOperationCount(66)}
									className="linkfont"
								>
									Take Leave
								</p>
								<p
									onClick={() => setOperationCount(666)}
									className="linkfont"
								>
									Requested Leave
								</p>
							</div>
						)}
						{panelItemCount == 5 && (
							<div className="text-center pt-3">
								No new features has been added.
							</div>
						)}
						{kycStatus && panelItemCount == 7 && (
							<div>
								<h5 className="heading_info">My Account</h5>
								<p
									onClick={() => setOperationCount(9)}
									className="linkfont"
									style={{
										color: isSelected(operationCount, 9),
									}}
								>
									Education Details
								</p>
								<p
									onClick={() => setOperationCount(99)}
									className="linkfont"
									style={{
										color: isSelected(operationCount, 99),
									}}
								>
									Address Details
								</p>
								<p
									onClick={() => setOperationCount(999)}
									className="linkfont"
									style={{
										color: isSelected(operationCount, 999),
									}}
								>
									Bank Account Details
								</p>
								<p
									onClick={() => setOperationCount(9999)}
									className="linkfont"
									style={{
										color: isSelected(operationCount, 9999),
									}}
								>
									Kyc Details
								</p>
								<p
									onClick={() => setOperationCount(99999)}
									className="linkfont"
									style={{
										color: isSelected(
											operationCount,
											999999
										),
									}}
								>
									Profile
								</p>
							</div>
						)}
						{panelItemCount == 10 && (
							<div className="text-center pt-3">
								{!kycStatus && <TimeLine step={step} />}
								{kycStatus && kycStatus.rejection_reason && (
									<p className="small-font">
										Rejection message &gt;
										{kycStatus.rejection_reason}
									</p>
								)}
								{kycStatus &&
									!kycStatus.rejection_reason &&
									!kycStatus.is_verified && (
										<p className="small-font">
											Your Kyc is in Pending State. It
											will take some days for verification
										</p>
									)}
								{kycStatus && kycStatus.is_verified && (
									<p className="small-font">
										Your Kyc has been Verified.
									</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmployeLeftPanel;

import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import GroupIcon from "@mui/icons-material/Group";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import CampaignIcon from "@mui/icons-material/Campaign";
import MonitorIcon from "@mui/icons-material/Monitor";
import WalletIcon from "@mui/icons-material/Wallet";
import PropTypes from "prop-types";

const isSelected = (item, need) => {
	return need === item ? "#5473e3" : "#000";
};
const AdminLeftPanel = ({
	operationCount,
	setPanelItemCoutn,
	panelItemCount,
	name,
	setOperationCount,
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
							title="Employee"
							style={{
								backgroundColor:
									panelItemCount === 2 ? "#fff" : "",
							}}
							onClick={() => setPanelItemCoutn(2)}
						>
							<GroupIcon
								style={{
									color:
										panelItemCount === 2
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
							title="Assets Management"
							style={{
								backgroundColor:
									panelItemCount === 4 ? "#fff" : "",
							}}
							onClick={() => setPanelItemCoutn(4)}
						>
							<MonitorIcon
								style={{
									color:
										panelItemCount === 4
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

						{panelItemCount == 2 && (
							<div>
								<h5 className="heading_info">EMPLOYEE</h5>
								<p
									style={{
										color: isSelected(1, operationCount),
									}}
									className="linkfont"
									onClick={() => setOperationCount(1)}
								>
									Employee List
								</p>
								<p
									className="linkfont"
									style={{
										color: isSelected(2, operationCount),
									}}
									onClick={() => setOperationCount(2)}
								>
									Create Employee
								</p>
								<p
									className="linkfont"
									style={{
										color: isSelected(3, operationCount),
									}}
									onClick={() => setOperationCount(3)}
								>
									Create Employee with csv file
								</p>
								<p
									className="linkfont"
									style={{
										color: isSelected(6, operationCount),
									}}
									onClick={() => setOperationCount(6)}
								>
									Change Department
								</p>
								<div>
									<p
										style={{
											color: isSelected(
												11,
												operationCount
											),
										}}
										className="linkfont"
										onClick={() => setOperationCount(11)}
									>
										Employee Kyc
									</p>
								</div>
							</div>
						)}
						{panelItemCount == 3 && (
							<div>
								<h5 className="heading_info">leave</h5>
								<p
									style={{
										color: isSelected(77, operationCount),
									}}
									onClick={() => setOperationCount(77)}
									className="linkfont"
								>
									Requested Leave
								</p>
								<p
									style={{
										color: isSelected(777, operationCount),
									}}
									onClick={() => setOperationCount(777)}
									className="linkfont"
								>
									Create Leave
								</p>
							</div>
						)}
						{panelItemCount == 4 && (
							<div>
								<h5 className="heading_info">Manager</h5>
								<p
									className="linkfont"
									style={{
										color: isSelected(7, operationCount),
									}}
									onClick={() => setOperationCount(7)}
								>
									List Manager
								</p>
								<p
									className="linkfont"
									style={{
										color: isSelected(8, operationCount),
									}}
									onClick={() => setOperationCount(8)}
								>
									Change Manager
								</p>
							</div>
						)}
						{panelItemCount == 5 && (
							<div className="text-center pt-3">
								No new features has been added.
							</div>
						)}
						{panelItemCount == 7 && (
							<div>
								<h5 className="heading_info">Management</h5>

								<p
									className="linkfont"
									title="create employe type eg permanent, traine , temporary"
									onClick={() => setOperationCount(4)}
									style={{
										color: isSelected(4, operationCount),
									}}
								>
									Create Employe type
								</p>
								<p
									className="linkfont"
									title="List All Department"
									onClick={() => setOperationCount(9)}
									style={{
										color: isSelected(9, operationCount),
									}}
								>
									List Department
								</p>
								<p
									className="linkfont"
									title="create department like financec, it, bussiness , R&D"
									onClick={() => setOperationCount(5)}
									style={{
										color: isSelected(5, operationCount),
									}}
								>
									Create Department
								</p>
								<p
									className="linkfont"
									onClick={() => setOperationCount(12)}
									style={{
										color: isSelected(5, operationCount),
									}}
								>
									Change Logo
								</p>
								<p
									className="linkfont"
									title="Profile"
									onClick={() => setOperationCount(10)}
									style={{
										color: isSelected(10, operationCount),
									}}
								>
									Profile
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
AdminLeftPanel.propTypes = {
	operationCount: PropTypes.any,
	setPanelItemCoutn: PropTypes.any,
	panelItemCount: PropTypes.any,
	name: PropTypes.any,
	setOperationCount: PropTypes.any,
};

export default AdminLeftPanel;

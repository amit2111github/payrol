import React, { useContext } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "../../../context/user";
const Navbar = ({ handleLogout }) => {
	const { user } = useContext(UserContext);
	const url = user.user.company.logo || "/logo.png";
	return (
		<div className="navbar">
			<div
				className="logo p-0"
				style={{ width: "150px", height: "70px" }}
			>
				<img src={url} width="100%" height="100%" />
			</div>
			<div className="search">
				<div className="form-group has-search">
					<span className="fa fa-search form-control-feedback"></span>
					<input
						type="text"
						className="form-control shadow-none"
						style={{
							borderRadius: "20px",
							width: "280px",
						}}
						placeholder="Search"
					/>
				</div>
				<div className="help" title="Find help">
					Find Help
				</div>
				<div className="notification" title="Notifications">
					<NotificationsNoneIcon />
				</div>
				<div className="logout" title="Logout">
					<LogoutIcon onClick={handleLogout} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;

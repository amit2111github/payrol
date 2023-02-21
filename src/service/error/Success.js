import React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
const Success = ({ message, show = false }) => {
	const [state, setState] = useState(1);
	const handleClick = () => {
		navigator.clipboard.writeText(message);
		setState((old) => old ^ 1);
	};
	return (
		<Alert
			severity="success"
			style={{
				border: "1px solid green",
				width: "80%",
				margin: "auto",
			}}
		>
			{message}
			{show && state == 1 && (
				<ContentPasteIcon
					style={{ marginLeft: "20px", cursor: "pointer" }}
					onClick={handleClick}
				/>
			)}
			{show && state == 0 && (
				<AssignmentTurnedInIcon
					style={{ marginLeft: "20px", cursor: "pointer" }}
				/>
			)}
		</Alert>
	);
};

export default Success;

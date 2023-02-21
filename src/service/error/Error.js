import React from "react";
import Alert from "@mui/material/Alert";
const Error = ({ message }) => {
	return (
		<Alert variant="filled" severity="error">
			{message}
		</Alert>
	);
};

export default Error;

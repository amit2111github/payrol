import React, { useState, useEffect, useContext } from "react";
import { removeUser } from "../../../../service/auth/localstorage";
import { UserContext } from "../../../../context/user";
import { getAllRequestedLeave } from "../../../../service/api/user";
import IconButton from "@mui/material/IconButton";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import Modal from "./Modal";
const RequestedLeave = () => {
	const { user, setUser } = useContext(UserContext);
	const [leave, setLeaves] = useState([]);
	const [error, setError] = useState(false);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [attachment, setAttachment] = useState("");

	useEffect(() => {
		(async function () {
			const data = await getAllRequestedLeave(user.user, user.token);
			if (data.error) {
				setError(data.error);
				if (data.code == 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setLeaves(data);
		})();
	}, []);
	console.log(leave);
	return (
		<>
			{error && <p className="text-danger pt-2 text-center">Amit</p>}
			<Modal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				url={attachment}
			/>
			{!error && (
				<table className="table table-hover">
					<thead className="bluebg_table">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Leave Type</th>
							<th scope="col">Description</th>
							<th scope="col">From Date</th>
							<th scope="col">To Date</th>
							<th scope="col">Status</th>
							<th scope="col">Rejection Reason</th>
							<th scope="col">Attachment</th>
						</tr>
					</thead>
					<tbody>
						{leave.map((cur, index) => {
							return (
								<tr key={index}>
									<td scope="row">{index + 1}</td>
									<td>
										{cur?.leave_type?.name}
										<span>
											<Tooltip
												title={
													cur?.leave_type?.description
												}
											>
												<IconButton>
													<HelpOutlineOutlinedIcon className="helpicondiv" />
												</IconButton>
											</Tooltip>
										</span>
									</td>
									<td style={{ maxWidth: "150px" }}>
										{cur?.description || "NA"}
									</td>
									<td>{cur?.from}</td>
									<td>{cur?.to}</td>
									<td>{cur?.status}</td>
									<td style={{ maxWidth: "130px" }}>
										{cur?.rejection_reason || "NA"}
									</td>
									<td>
										<button
											className="btn btn-primary"
											disabled={!cur?.attachment}
											onClick={() => {
												handleOpen();
												setAttachment(cur?.attachment);
											}}
										>
											View
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</>
	);
};

export default RequestedLeave;

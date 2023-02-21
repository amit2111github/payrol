import React, { useState, useEffect, useContext } from "react";
import { removeUser } from "../../../service/auth/localstorage";
import {
	getAllRequestedLeave,
	changeLeaveStatus,
} from "../../../service/api/manager";
import { UserContext } from "../../../context/user";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AttachmentModal from "../admin/AttachmentModal.js";
import ActionModal from "../admin/ActionModal";
const RequestedLeave = () => {
	const [leave, setLeaves] = useState([]);
	// const [error, setError] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const handleClose1 = () => setOpen1(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose2 = () => setOpen2(false);
	const handleOpen2 = () => setOpen2(true);

	const [selectedLeave, setSelectedLeave] = useState("");
	useEffect(() => {
		(async function () {
			const data = await getAllRequestedLeave(user.user, user.token);
			if (data.error) {
				// setError(data.error);
				if (data.code == 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setLeaves(data);
		})();
	}, []);
	const [state, setState] = useState({
		status: "",
		rejectionReason: "",
		error: false,
		loading: false,
		message: false,
	});
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	const handleSubmit = async (status) => {
		setState((old) => ({ ...old, message: "Loading...", error: false }));
		const data = await changeLeaveStatus(
			selectedLeave.id,
			user.user,
			user.token,
			status,
			state.rejectionReason
		);
		if (data.error) {
			setState((old) => ({ ...old, message: false, error: data.error }));
			if (data.code === 1) {
				removeUser();
				setUser(null);
			}
			return;
		}
		setState((old) => ({ ...old, message: data.msg, error: false }));
		setTimeout(() => {
			handleClose2();
		}, 1000);
	};
	return (
		<table className="table table-hover">
			<AttachmentModal
				open={open1}
				handleClose={handleClose1}
				handleOpen={handleOpen1}
				url={selectedLeave?.attachment}
			/>
			<ActionModal
				open={open2}
				handleClose={handleClose2}
				handleOpen={handleOpen2}
				state={state}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
			<thead className="bluebg_table">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Leave Type</th>
					<th scope="col">Description</th>
					<th scope="col">From Date</th>
					<th scope="col">To Date</th>
					<th scope="col">User Code</th>
					<th scope="col">Name</th>
					<th scope="col">Attachment</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				{leave.map((cur, index) => {
					return (
						<tr key={index}>
							<td scope="row">{index + 1}</td>

							<td>
								{cur.leave_type.name}
								<span>
									<Tooltip title={cur.leave_type.description}>
										<IconButton>
											<HelpOutlineOutlinedIcon className="helpicondiv" />
										</IconButton>
									</Tooltip>
								</span>
							</td>
							<td scope="row">{cur.description || "NA"}</td>
							<td scope="row">{cur.from}</td>
							<td scope="row">{cur.to}</td>
							<td scope="row">{cur.user?.user_code}</td>
							<td scope="row">{cur.user?.name}</td>
							<td>
								<button
									className="btn btn-primary"
									disabled={!cur.attachment}
									onClick={() => {
										handleOpen1();
										setSelectedLeave(cur);
									}}
								>
									View
								</button>
							</td>
							<td scope="row">
								<button
									className="btn btn-primary"
									disabled={cur.status !== "pending"}
									onClick={() => {
										handleOpen2();
										setSelectedLeave(cur);
									}}
								>
									{cur.status.toUpperCase()}
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default RequestedLeave;

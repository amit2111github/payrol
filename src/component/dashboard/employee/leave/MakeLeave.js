import React, { useEffect, useState, useContext } from "react";
import { userLeave, takeLeave } from "../../../../service/api/user";
import { uploadFile } from "../../../../service/api/auth";
import { removeUser } from "../../../../service/auth/localstorage";

import { UserContext } from "../../../../context/user";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LeaveModal from "./LeaveModal";
const MakeLeave = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { user, setUser } = useContext(UserContext);
	const [leave, setLeave] = useState([]);
	const [error, setError] = useState(false);
	const [selectedLeave, setSelectedLeave] = useState({});
	const [state, setState] = useState({
		from: "",
		to: "",
		description: "",
		attachment: null,
		loading: false,
		message: false,
	});
	useEffect(() => {
		(async function () {
			const data = await userLeave(user.user, user.token);
			if (data.error) {
				setError(data.error);
				if (data.code === 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setLeave(data);
		})();
	}, []);
	const handleSubmit = async () => {
		const { from, to } = state;
		if (!from) {
			setError("From date is Manadatory");
			return;
		}
		if (!to) {
			setError("To date is Manadatory");
			return;
		}
		let numberOfDays = new Date(to) - new Date(from);
		numberOfDays = numberOfDays / 1000 / 60 / 60 / 24 + 1;
		if (numberOfDays <= 0) {
			setError("From date should be less than To date");
			return;
		}
		setState((old) => ({ ...old, loading: true }));
		setError(false);
		let s3link = { url: null };
		if (state.attachment) {
			s3link = await uploadFile(state.attachment);
		}
		if (s3link.error) {
			setError("Fail to upload Attachment");
			return;
		}
		const data = await takeLeave(
			{ ...state },
			selectedLeave,
			s3link.url,
			user.user,
			user.token
		);
		if (data.error) {
			setError(data.error);
			setState((old) => ({ ...old, loading: false }));
			if (data.code === 1) {
				removeUser();
				setUser(null);
			}
			return;
		}
		setState((old) => ({ ...old, loading: false, message: data.msg }));
		setTimeout(() => {
			handleClose();
		}, 1000);
	};
	const handleChange = (event) => {
		if (event.target.type === "file") {
			setState((old) => ({
				...old,
				[event.target.name]: event.target.files[0],
			}));
			console.log(event.target.files[0]);
			return;
		}
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<table className="table table-hover">
			<LeaveModal
				handleSubmit={handleSubmit}
				state={state}
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				leave={selectedLeave}
				handleChange={handleChange}
				error={error}
			/>
			<thead className="bluebg_table">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Leave Type</th>
					<th scope="col">Used</th>
					<th scope="col">Total Availabe</th>
					<th scope="col">Take</th>
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
							<td>{cur.used}</td>
							<td>{cur.assigned}</td>
							<td>
								<button
									className="btn btn-primary"
									disabled={cur.used == cur.assigned}
									onClick={() => {
										handleOpen();
										setSelectedLeave(cur);
									}}
								>
									Take
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default MakeLeave;

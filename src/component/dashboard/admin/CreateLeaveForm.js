import React, { useEffect, useState, useContext } from "react";
import { createLeave, getAllLeaveType } from "../../../service/api/admin";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
const CreateLeaveForm = () => {
	const { user, setUser } = useContext(UserContext);
	const [error, setError] = useState(false);
	const [leaveType, setLeaveType] = useState([]);
	const [state, setState] = useState({
		days: "",
		leaveTypeId: "",
		loading: false,
		message: "",
	});
	useEffect(() => {
		(async function () {
			const data = await getAllLeaveType(user.user, user.token);
			if (data.error) {
				setError(data.error);
				if (data.code == 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setLeaveType(data);
		})();
	}, []);
	const handleSubmit = async () => {
		setError("");
		console.log("clicked");
		if (!Number.isInteger(+state.days)) {
			setError("Days should be Integer");
			return;
		}
		if (+state.days < 1) {
			setError("Days should be > 0");
			return;
		}
		if (!state.leaveTypeId) {
			setError("Leave type is Manadatory");
			return;
		}
		setState((old) => ({ ...old, loading: true, message: "" }));
		const data = await createLeave(
			user.user,
			user.token,
			state.days,
			state.leaveTypeId
		);
		if (data.error) {
			setError(data.error);
			setState((old) => ({ ...old, loading: false }));
			if (data.code == 1) {
				removeUser();
				setUser(null);
			}
			return;
		}
		setState((old) => ({ ...old, loading: false, message: data.msg }));
	};
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	return (
		<div className="outer-div-employe-type">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Create Leave
				</h5>
				<div className="form-group leftForm">
					<p>Leave Type</p>
					<select
						className="form-select gg"
						onChange={handleChange}
						name="leaveTypeId"
					>
						<option value="">Leave Type</option>
						{leaveType.map((cur) => (
							<option
								className="form-control"
								value={cur.id}
								key={cur.id}
							>
								{cur.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-group leftForm">
					<p className="pt-1">
						Days
						<Tooltip title="# of Days to allot as holiday in 1 Year.">
							<IconButton>
								<HelpOutlineOutlinedIcon className="helpicondiv mt-n1" />
							</IconButton>
						</Tooltip>
					</p>
					<input
						name="days"
						value={state.days}
						min={1}
						type="number"
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				{error && <p className="text-center text-danger"> {error}</p>}
				{state.message && (
					<p className="text-center text-success">{state.message}</p>
				)}
				<div className="form-group leftForm">
					<button
						onClick={handleSubmit}
						className="btn btn-primary w-100"
					>
						{state.loading ? (
							<i className="fa fa-refresh fa-spin" />
						) : (
							"Create"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateLeaveForm;
// selected={state.departmentId === cur.id}

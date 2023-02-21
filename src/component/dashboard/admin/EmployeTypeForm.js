import React, { useState, useContext } from "react";
import "./AdminDashboard.css";
import { UserContext } from "../../../context/user";
import { createEmployeType } from "../../../service/api/admin";
import { removeUser } from "../../../service/auth/localstorage";
const EmployeTypeForm = () => {
	const { user, setUser } = useContext(UserContext);
	const [employeTypeName, setEmployeTypeName] = useState("");
	const [state, setState] = useState({
		error: false,
		message: false,
		loading: false,
	});
	const handleChange = (e) => {
		setEmployeTypeName(e.target.value);
	};
	const handleSubmit = async () => {
		setState((old) => ({
			...old,
			error: false,
			loading: true,
			message: false,
		}));
		const data = await createEmployeType(
			employeTypeName.trim(),
			user.token,
			user.user
		);
		if (data.error) {
			setState((old) => ({ ...old, error: data.error, loading: false }));
			if (data.code === 1) {
				setTimeout(() => {
					removeUser();
					setUser(null);
				}, 1000);
			}
			return;
		}
		setState((old) => ({ ...old, message: data.msg, loading: false }));
		setEmployeTypeName("");
	};
	return (
		<div className="outer-div-employe-type">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-2">
					Create Employee Type
				</h5>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Employe Type Name
					</p>
					<input
						type="text"
						value={employeTypeName}
						className="form-control"
						onChange={handleChange}
						placeholder="eg. Traine, Permanent"
					/>
				</div>
				{state.error && (
					<p className="text-centerp pt-2" style={{ color: "red" }}>
						{state.error}
					</p>
				)}
				{state.message && (
					<p className="text-centerp pt-2" style={{ color: "green" }}>
						{state.message}
					</p>
				)}
				<div className="d-grid gap-2 leftForm">
					<button
						className="btn btn-primary loginbutton"
						onClick={handleSubmit}
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

export default EmployeTypeForm;

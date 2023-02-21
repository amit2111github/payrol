import React, { useContext, useState, useEffect } from "react";
import {
	getAllEmployee,
	changeManager,
	getAllDepartment,
} from "../../../service/api/admin";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";
import "./AdminDashboard.css";

const ChangeManagerForm = () => {
	const { user, setUser } = useContext(UserContext);
	const [state, setState] = useState({
		error: false,
		message: false,
		loading: false,
		departments: [],
		users: [],
		userCode: "",
		departmentId: "",
	});
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	useEffect(() => {
		(async function () {
			Promise.all([
				getAllEmployee(user.user, user.token),
				getAllDepartment(user.user, user.token),
			])
				.then(([data1, data2]) => {
					if (data1.error || data2.error) {
						alert("Oops Something went wrong");
						if (data1.code === 1 || data2.code === 1) {
							removeUser();
							setUser();
						}
						return;
					}
					setState((old) => ({
						...old,
						users: data1,
						departments: data2,
					}));
				})
				.catch(() => {
					alert("Ooops Something went wrong");
				});
		})();
	}, []);
	const handleSubmit = async () => {
		if (!state.userCode) {
			setState((old) => ({ ...old, error: "Employe code is required" }));
			return;
		}
		if (!state.departmentId) {
			setState((old) => ({ ...old, error: "Department  is required" }));
			return;
		}
		setState((old) => ({
			...old,
			error: false,
			loading: true,
			message: false,
		}));
		const data = await changeManager(
			{
				userCode: state.userCode,
				departmentId: state.departmentId,
			},
			user.user,
			user.token
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
	};
	return (
		<div className="outer-div-employe-type">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Change Manager
				</h5>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Department
					</p>

					<select
						className="form-select gg"
						style={{ opacity: 0.7 }}
						name="departmentId"
						onChange={handleChange}
						value={state.departmentId}
					>
						<option value="">Department</option>
						{state.departments.map((cur) => (
							<option
								className="form-control"
								value={cur.id}
								key={cur.id}
								selected={state.departmentId === cur.id}
							>
								{cur.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Choose Employee
					</p>
					<input
						type="text"
						placeholder="Enter employe user code"
						className="form-control"
						list="data"
						name="userCode"
						onChange={handleChange}
					/>
					<datalist value={state.userCode} id="data">
						{state.users.map((cur) => (
							<option key={cur.id}>{cur.user_code}</option>
						))}
					</datalist>
				</div>

				{state.error && (
					<p style={{ color: "red" }} className="pt-2">
						{state.error}
					</p>
				)}
				{state.message && (
					<p style={{ color: "green" }} className="pt-2">
						{state.message}
					</p>
				)}

				<div className="leftForm d-grid gap-2">
					<button
						className="btn btn-primary loginbutton"
						onClick={handleSubmit}
					>
						{!state.loading ? (
							"Change Manager"
						) : (
							<i className="fa fa-refresh fa-spin" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChangeManagerForm;

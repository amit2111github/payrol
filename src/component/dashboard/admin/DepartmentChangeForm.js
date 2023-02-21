import React, { useContext, useState, useEffect } from "react";
import {
	getAllEmployee,
	changeDepartment,
	getAllDepartment,
} from "../../../service/api/admin";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";
import "./AdminDashboard.css";
const DepartmentChangeForm = () => {
	const { user, setUser } = useContext(UserContext);
	const [employe, setEmploye] = useState([]);
	const [state, setState] = useState({
		error: false,
		message: false,
		loading: false,
	});
	const [departmentId, setDepartmentId] = useState([]);
	const [userCode, setUserCode] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState(null);
	const handleChange = (event) => {
		setUserCode(event.target.value);
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
					setEmploye(data1);
					setDepartmentId(data2);
				})
				.catch(() => {
					alert("Ooops Something went wrong");
				});
		})();
	}, []);
	const handleSubmit = async () => {
		if (!userCode) {
			setState((old) => ({ ...old, error: "Employe code is required" }));
			return;
		}
		if (!selectedDepartment) {
			setState((old) => ({ ...old, error: "Department  is required" }));
			return;
		}
		setState((old) => ({
			...old,
			error: false,
			loading: true,
			message: false,
		}));
		const data = await changeDepartment(
			{ userCode, selectedDepartment },
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
		// console.log(old);
		setState((old) => ({ ...old, message: data.msg, loading: false }));
	};
	return (
		<div className="outer-div-employe-type">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Change Department
				</h5>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Choose Employee
					</p>
					<input
						type="text"
						placeholder="Enter employe user code"
						className="form-control"
						list="data"
						onChange={handleChange}
					/>
					<datalist
						value={userCode}
						id="data"
						style={{ width: "100%" }}
					>
						{employe.map((cur) => (
							<option key={cur.id}>{cur.user_code}</option>
						))}
					</datalist>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Department
					</p>

					<select
						className="form-select gg"
						style={{ opacity: 0.7 }}
						name="department"
						onChange={(e) => setSelectedDepartment(e.target.value)}
						value={selectedDepartment}
					>
						<option value="">Department</option>
						{departmentId.map((cur) => (
							<option
								className="form-control"
								value={cur.id}
								key={cur.id}
								selected={selectedDepartment === cur.id}
							>
								{cur.name}
							</option>
						))}
					</select>
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
							"Change Department"
						) : (
							<i className="fa fa-refresh fa-spin" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DepartmentChangeForm;

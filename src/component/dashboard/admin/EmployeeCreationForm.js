import React, { useState, useEffect, useContext } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import "./AdminDashboard.css";
import {
	getEmployeType,
	getAllDepartment,
	createEmploye,
} from "../../../service/api/admin";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";

const validate1 = (state, setState, employeType) => {
	let ok = state.phone.length === 10;
	for (let i = 0; i < state.phone.length && ok; i++)
		ok &= state.phone[i] >= "0" && state.phone[i] <= "9";
	if (!state.name) {
		setState((old) => ({ ...old, error: "Name is required" }));
		return false;
	}
	if (!state.email) {
		setState((old) => ({ ...old, error: "Email is required" }));
		return false;
	}
	if (!ok) {
		setState((old) => ({ ...old, error: "Invalid Phone Number" }));
		return false;
	}
	if (!employeType || employeType.length === 0) {
		setState((old) => ({
			...old,
			error: "First you need to create employe type.",
		}));
		return false;
	}
	if (!state.employe_type) {
		setState((old) => ({ ...old, error: "Employe Type is required" }));
		return false;
	}

	return true;
};
const validate2 = (state, setState, department) => {
	if (!department || department.length == 0) {
		setState((old) => ({
			...old,
			error: "First you need to create Department.",
		}));
		return false;
	}
	if (!state.department) {
		setState((old) => ({ ...old, error: "Department is required" }));
		return false;
	}
	if (!state.gender) {
		setState((old) => ({ ...old, error: "Gender is required" }));
		return false;
	}
	if (!state.joning_date) {
		setState((old) => ({ ...old, error: "joning date is required" }));
		return false;
	}
	if (!state.taxSlab) {
		setState((old) => ({ ...old, error: "Tax Slab is required" }));
		return false;
	}
	return true;
};

const EmployeeCreationForm = () => {
	const { setUser, user } = useContext(UserContext);
	const [employeType, setEmployeType] = useState([]);
	const [department, setDepartment] = useState([]);
	const [state, setState] = useState({
		step: 1,
		name: "",
		email: "",
		password: "",
		phone: "",
		gender: "",
		error: false,
		taxSlab: null,
		message: "",
		employe_type: null,
		department: null,
		joning_date: null,
		loading: false,
	});
	useEffect(() => {
		(async function () {
			Promise.all([
				getEmployeType(user.user, user.token),
				getAllDepartment(user.user, user.token),
			])
				.then(([data1, data2]) => {
					if (data1.error || data2.error) {
						if (data1.code == 1 || data2.code == 1) {
							setUser(null);
							removeUser();
						}
						return;
					}
					setEmployeType(data1);
					setDepartment(data2);
				})
				.catch((err) => console.log(err));
		})();
	}, []);
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	const handlePrevStep = () => {
		setState((old) => ({ ...old, step: old.step - 1, error: false }));
	};
	const handleSubmit = async () => {
		if (!validate2(state, setState, department)) return;
		setState((old) => ({
			...old,
			error: false,
			loading: true,
			message: false,
		}));
		const data = await createEmploye(state, user.token, user.user);
		if (data.error) {
			setState((old) => ({
				...old,
				error: data.error,
				loading: false,
			}));
			if (data.code === 1) {
				setTimeout(() => {
					removeUser();
					setUser(null);
				}, 1000);
			}
			return;
		}
		setState(() => ({
			step: 2,
			name: "",
			email: "",
			password: "",
			phone: "",
			gender: "",
			taxSlab: null,
			message: data.msg,
			employe_type: null,
			department: null,
			joning_date: null,
			loading: false,
		}));
	};
	const handleNextStep = () => {
		if (!validate1(state, setState, employeType)) return;
		setState((old) => ({ ...old, step: old.step + 1, error: "" }));
	};
	return (
		<div className="outer-create-div">
			<div className="employeform" style={{ paddingTop: "5px" }}>
				<h5 style={{ color: "#394657" }} className="pt-2">
					Create Employee
				</h5>
				{state.step == 1 && (
					<Step1
						handleChange={handleChange}
						state={state}
						employeType={employeType}
					/>
				)}
				{state.step == 2 && (
					<Step2
						handleChange={handleChange}
						state={state}
						department={department}
						setState={setState}
					/>
				)}
				{state.error && (
					<p className="pt-1" style={{ color: "red" }}>
						{state.error}
					</p>
				)}
				{state.message && (
					<p style={{ color: "green" }} className="pt-2">
						{state.message}
					</p>
				)}
				<div
					className="form-group leftForm buttons pb-4 pt-2"
					style={{
						justifyContent:
							state.step == 1 ? "center" : "space-between",
					}}
				>
					{state.step > 1 && (
						<button
							className="btn btn-md btn-primary"
							onClick={handlePrevStep}
						>
							Prev
						</button>
					)}
					{state.step < 2 && (
						<button
							className="btn btn-md btn-primary nextbutton"
							onClick={handleNextStep}
						>
							Next Step
						</button>
					)}
					{state.step == 2 && (
						<button
							className="btn btn-md btn-primary"
							onClick={handleSubmit}
						>
							{state.loading ? (
								<i className="fa fa-refresh fa-spin" />
							) : (
								"Create"
							)}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmployeeCreationForm;

import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";
import { createBulkEmployee } from "../../../service/api/admin";
const EmployeeCreationFormCSV = () => {
	const { user, setUser } = useContext(UserContext);
	const [file, setFile] = useState(() => null);
	const [state, setState] = useState(() => ({
		error: false,
		message: false,
		loading: false,
	}));
	const handleFile = (e) => {
		if (e.target.files[0].type != "text/csv") {
			setState((old) => ({ ...old, error: "A .csv file is needed" }));
			return;
		}
		setState((old) => ({ ...old, error: false }));
		setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (state.error) return;
		setState((old) => ({
			...old,
			loading: true,
			message: false,
			error: false,
		}));
		const data = await createBulkEmployee(file, user.token, user.user);
		console.log(data);
		if (data.error) {
			setState((old) => ({ ...old, error: data.error, loading: false }));
			if (data.code === 1) {
				setTimeout(() => {
					setUser(null);
					removeUser();
				}, 1000);
			}
			return;
		}
		setState((old) => ({
			...old,
			loading: false,
			message: "User uploaded successfully.",
		}));
	};
	return (
		<div className="csv-form">
			<div className="form-group">
				<input
					type="file"
					className="form-control-file"
					onChange={handleFile}
				/>
				{state.error && (
					<p style={{ color: "red", textAlign: "center" }}>
						{state.error}
					</p>
				)}
				{state.message || (
					<p className="pt-2" style={{ color: "green" }}>
						{state.message}
					</p>
				)}
				<div className="pt-4">
					{!state.error && file && (
						<>
							<button
								className="btn btn-md w-75 btn-primary"
								onClick={handleUpload}
							>
								{state.loading ? (
									<i className="fa fa-refresh fa-spin" />
								) : (
									"Upload"
								)}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmployeeCreationFormCSV;

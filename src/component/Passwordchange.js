import React, { useState } from "react";
import { changePassword, sendOtp } from "../service/api/auth";

const Passwordchange = () => {
	const [step, setStep] = useState(1);
	const [state, setState] = useState({
		userCode: "",
		password: "",
		loading: false,
		error: "",
		message: "",
		otp: "",
	});
	const handleChange = (e) => {
		setState((old) => ({ ...old, [e.target.name]: e.target.value }));
	};
	const style = {
		width: "40%",
		margin: "auto",
		textAlign: "center",
		borderRadius: "8px",
		boxShadow: "0 4px 10px rgb(0 0 0 / 0.2)",
		marginTop: "100px",
	};
	const handleSubmit = async () => {
		if (state.loading) return;
		if (!state.password) {
			setState((old) => ({ ...old, error: "password is required" }));
			return;
		}
		if (!state.otp) {
			setState((old) => ({ ...old, error: "otp is required" }));
			return;
		}
		setState((old) => ({ ...old, error: false, loading: true }));
		const data = await changePassword(
			state.otp,
			state.password,
			state.userCode
		);
		if (data.error) {
			setState((old) => ({ ...old, error: data.error, loading: false }));
			return;
		}
		setState((old) => ({ ...old, message: data.msg, loading: false }));
		setTimeout(() => {
			window.location.href = "/";
		}, 2000);
	};
	const handleSendOtp = async () => {
		if (state.loading) return;
		if (!state.userCode) {
			setState((old) => ({ ...old, error: "User Code is Required" }));
			return;
		}
		if (step != 1) return;
		setState((old) => ({ ...old, loading: true, error: "" }));
		const data = await sendOtp(state.userCode);
		if (data.error) {
			setState((old) => ({ ...old, error: data.error, loading: false }));
			return;
		}
		setState((old) => ({ ...old, message: data.msg, loading: false }));
		setTimeout(() => {
			setStep(2);
		}, 500);
	};
	return (
		<div className="mt-4">
			<div style={{ ...style }}>
				<h5 className="pt-4" style={{ color: "#394657" }}>
					Change Password
				</h5>
				{step == 1 && (
					<>
						<div className="form-group pt-4 leftForm">
							<p className="p-2" style={{ textAlign: "left" }}>
								User Code
							</p>
							<input
								className="form-control"
								name="userCode"
								onChange={handleChange}
								value={state.userCode}
								placeholder="Enter User Code"
							/>
						</div>
						{state.error && (
							<p className="pt-2  text-danger">{state.error}</p>
						)}
						{state.message && (
							<p className="pt-2  text-success">
								{state.message}
							</p>
						)}
						<div className="form-group pt-4 leftForm text-center">
							<button
								className="btn btn-primary"
								onClick={handleSendOtp}
								disabled={state.loading}
							>
								{state.loading ? (
									<i className="fa fa-refresh fa-spin" />
								) : (
									"Send OTP"
								)}
							</button>
						</div>
					</>
				)}
				{step == 2 && (
					<>
						<div>
							<div className="form-group pt-4 leftForm">
								<p
									className="p-2"
									style={{ textAlign: "left" }}
								>
									Otp
								</p>
								<input
									className="form-control"
									name="otp"
									onChange={handleChange}
									value={state.otp}
									placeholder="Enter Otp"
								/>
							</div>
						</div>
						<div>
							<div className="form-group pt-4 leftForm">
								<p
									className="p-2"
									style={{ textAlign: "left" }}
								>
									New Password
								</p>
								<input
									className="form-control"
									name="password"
									onChange={handleChange}
									value={state.password}
									placeholder="Enter New Password"
								/>
							</div>
						</div>
						{state.error && (
							<p className="text-danger pt-2">{state.error}</p>
						)}
						{state.message && (
							<p className="text-success pt-2">{state.message}</p>
						)}
						<div className="form-group pt-4 leftForm text-center">
							<button
								className="btn btn-primary"
								onClick={handleSubmit}
								disabled={state.loading}
							>
								{state.loading ? (
									<i className="fa fa-refresh fa-spin" />
								) : (
									"Change Password"
								)}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Passwordchange;

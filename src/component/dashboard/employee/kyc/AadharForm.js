import React from "react";
import "../EmployeDashboard.css";
const AadharForm = ({
	state,
	handleChange,
	handleNextStep,
	handlePrevStep,
}) => {
	return (
		<div className="outer-div-aadhar">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Aadhar Details
				</h5>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Aadhar Number
					</p>
					<input
						type="text"
						name="aadharNumber"
						value={state.aadharNumber}
						className="form-control"
						onChange={handleChange}
						placeholder="Enter your Aadhar Number"
					/>
				</div>

				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Aadhar Card
					</p>
					<input
						type="file"
						name="aadharCard"
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Pan Card Number
					</p>
					<input
						type="text"
						name="panNumber"
						value={state.panNumber}
						className="form-control"
						onChange={handleChange}
						placeholder="Enter your pan card Number"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Pan Card
					</p>
					<input
						type="file"
						name="panCard"
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				{state.error && <p style={{ color: "red" }}>{state.error}</p>}
				<div className="leftForm buttons">
					<button
						className="btn btn-primary"
						onClick={handlePrevStep}
					>
						Prev Step
					</button>
					<button
						className="btn btn-primary"
						onClick={handleNextStep}
					>
						Next Step
					</button>
				</div>
			</div>
		</div>
	);
};

export default AadharForm;

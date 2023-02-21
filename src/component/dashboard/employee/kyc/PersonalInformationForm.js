import React from "react";

import "../EmployeDashboard.css";
const PersonalInformationForm = ({ state, handleChange, handleNextStep }) => {
	return (
		<div className="outer-div-aadhar">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Personal Details
				</h5>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Legal Name
					</p>
					<input
						type="text"
						name="legalName"
						value={state.legalName}
						className="form-control"
						onChange={handleChange}
						placeholder="Enter your Name"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Mother &apos;s Name
					</p>
					<input
						type="text"
						name="motherName"
						value={state.motherName}
						className="form-control"
						onChange={handleChange}
						placeholder="Mother's Name"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Father &apos;s Name
					</p>
					<input
						type="text"
						name="fatherName"
						value={state.fatherName}
						className="form-control"
						onChange={handleChange}
						placeholder="Father's Name"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Live Photo
					</p>
					<input
						type="file"
						name="livePhoto"
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				{state.error && <p style={{ color: "red" }}>{state.error}</p>}
				<div className="leftForm d-grid gap-2">
					<button
						className="btn btn-primary loginbutton"
						onClick={handleNextStep}
					>
						Next Step
					</button>
				</div>
			</div>
		</div>
	);
};

export default PersonalInformationForm;

import React from "react";
import "../EmployeDashboard.css";

const EducationForm = ({
	state,
	handleChange,
	handleNextStep,
	handlePrevStep,
	addMore,
	error,
	message,
}) => {
	let years = [];
	for (let i = 1947; i <= 2099; i++) years.push(i);
	return (
		<div className="outer-div-aadhar">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Education Details
				</h5>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Degree Name
					</p>
					<input
						type="text"
						name="degreeName"
						value={state.degreeName}
						className="form-control"
						onChange={handleChange}
						placeholder="Degree Name"
					/>
				</div>

				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Institution Name
					</p>
					<input
						type="text"
						name="institutionName"
						value={state.institutionName}
						className="form-control"
						onChange={handleChange}
						placeholder="Institution Name"
					/>
				</div>
				<div className="years">
					<div className="form-group leftForm">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							From
						</p>
						<select
							name="from"
							value={state.from}
							className="form-control"
							onChange={handleChange}
						>
							<option value="">From Year</option>
							{years.map((cur, index) => (
								<option
									key={index}
									selected={cur === state.from}
									value={cur}
								>
									{cur}
								</option>
							))}
						</select>
					</div>
					<div className="form-group leftForm">
						<p className="text-left gg" style={{ opacity: 0.7 }}>
							To
						</p>
						<select
							name="to"
							value={state.to}
							className="form-control"
							onChange={handleChange}
						>
							<option value="">To Year</option>
							{years.map((cur, index) => (
								<option
									selected={cur === state.to}
									value={cur}
									key={index}
								>
									{cur}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						CGPA
					</p>
					<input
						type="text"
						name="cgpa"
						value={state.cgpa}
						className="form-control"
						onChange={handleChange}
						placeholder="Cgpa"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="mode-text">Mode</p>
					<div className="mode">
						<label className="radio-inline radio-aadhar">
							<input
								type="radio"
								name="mode"
								value="ONLINE"
								onChange={handleChange}
								checked={state.mode == "ONLINE"}
							/>
							<span className="radio-text">Online</span>
						</label>
						<label className="radio-inline radio-aadhar">
							<input
								type="radio"
								name="mode"
								onChange={handleChange}
								value="OFFLINE"
								checked={state.mode == "OFFLINE"}
							/>
							<span className="radio-text">Offline</span>
						</label>
					</div>
				</div>
				<div className="leftForm add-more-button">
					<button
						className="btn btn-primary loginbutton"
						onClick={addMore}
					>
						Add
					</button>
				</div>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{message && <p style={{ color: "green" }}>{message}</p>}
				<div className="leftForm buttons">
					<button
						className="btn btn-primary loginbutton"
						onClick={handlePrevStep}
					>
						Prev Step
					</button>
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

export default EducationForm;

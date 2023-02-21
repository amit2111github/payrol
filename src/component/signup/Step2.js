import React from "react";
import PropTypes from "prop-types";
const Step2 = ({ state, handleChange, setState }) => {
	return (
		<>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Name
				</p>
				<input
					type="text"
					name="companyName"
					value={state.companyName}
					className="form-control"
					onChange={handleChange}
					placeholder="Enter Company Name"
				/>
			</div>
			<div className="form-group leftForm" style={{ textAlign: "left" }}>
				<p className="text-left" style={{ opacity: 0.7 }}>
					Gender
				</p>
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<label className="radio-inline">
						<input
							type="radio"
							name="gender"
							onChange={() =>
								setState((old) => ({ ...old, gender: "MALE" }))
							}
						/>
						<span style={{ paddingLeft: "10px" }}>Male</span>
					</label>
					<label className="radio-inline">
						<input
							type="radio"
							name="gender"
							onChange={() =>
								setState((old) => ({
									...old,
									gender: "FEMALE",
								}))
							}
						/>
						<span style={{ paddingLeft: "10px" }}>Female</span>
					</label>
					<label className="radio-inline">
						<input
							type="radio"
							name="gender"
							onChange={() =>
								setState((old) => ({ ...old, gender: "OTHER" }))
							}
						/>
						<span style={{ paddingLeft: "10px" }}>Other</span>
					</label>
				</div>
			</div>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Company Logo
				</p>
				<input
					type="file"
					name="logo"
					className="form-control"
					onChange={(e) => {
						console.log(e.target.files[0]);
						setState((old) => ({
							...old,
							logo: e.target.files[0],
						}));
					}}
				/>
			</div>
		</>
	);
};

Step2.propTypes = {
	state: PropTypes.any,
	handleChange: PropTypes.any,
	setState: PropTypes.any,
};
export default Step2;

import PropTypes from "prop-types";
import React from "react";
const Step1 = ({ state, handleChange }) => {
	return (
		<>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Name
				</p>
				<input
					type="text"
					name="name"
					value={state.name}
					className="form-control"
					onChange={handleChange}
					placeholder="Enter your Name"
				/>
			</div>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Email
				</p>
				<input
					type="email"
					name="email"
					value={state.email}
					className="form-control"
					onChange={handleChange}
					placeholder="Email"
				/>
			</div>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Phone Number
				</p>
				<input
					type="phone"
					name="phone"
					value={state.phone}
					className="form-control"
					onChange={handleChange}
					placeholder="Phone no."
				/>
			</div>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Password
				</p>
				<input
					value={state.password}
					type="password"
					name="password"
					className="form-control"
					onChange={handleChange}
					placeholder="password"
				/>
			</div>
		</>
	);
};

Step1.propTypes = {
	state: PropTypes.any,
	handleChange: PropTypes.any,
};
export default Step1;

import PropTypes from "prop-types";
import React from "react";
const Step2 = ({ state, handleChange }) => {
	return (
		<>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					State
				</p>
				<input
					type="text"
					name="state"
					value={state.state}
					className="form-control"
					onChange={handleChange}
					placeholder="State"
				/>
			</div>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					City
				</p>
				<input
					type="text"
					name="city"
					value={state.city}
					className="form-control"
					onChange={handleChange}
					placeholder="City"
				/>
			</div>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Pin Code
				</p>
				<input
					type="text"
					name="pincode"
					value={state.pincode}
					className="form-control"
					onChange={handleChange}
					placeholder="pin code"
				/>
			</div>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Address line
				</p>
				<input
					type="text"
					name="addressLine"
					value={state.addressLine}
					className="form-control"
					onChange={handleChange}
					placeholder="Address line"
				/>
			</div>
		</>
	);
};
Step2.propTypes = {
	state: PropTypes.any,
	handleChange: PropTypes.any,
};
export default Step2;

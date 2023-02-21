import React from "react";

const AddressForm = ({ state, handleChange, handleSubmit, handlePrevStep }) => {
	return (
		<div className="outer-div-aadhar">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Address Details
				</h5>
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
				{state.error && <p style={{ color: "red" }}>{state.error}</p>}
				{state.message && (
					<p style={{ color: "green" }}>{state.message}</p>
				)}
				<div className="leftForm buttons">
					<button
						className="btn btn-primary"
						onClick={handlePrevStep}
					>
						Prev Step
					</button>
					<button
						onClick={handleSubmit}
						className="btn btn-md btn-primary"
					>
						{state.loading ? (
							<i className="fa fa-refresh fa-spin" />
						) : (
							"Submit"
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddressForm;

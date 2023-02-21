import React from "react";
const BankAccountDetails = ({
	state,
	handleChange,
	handleNextStep,
	handlePrevStep,
}) => {
	return (
		<div className="outer-div-aadhar">
			<div className="employetypeform">
				<h5 style={{ color: "#394657" }} className="pt-4">
					Bank Details
				</h5>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Bank Name
					</p>
					<input
						type="text"
						name="bankName"
						value={state.bankName}
						className="form-control"
						onChange={handleChange}
						placeholder="Enter your Bank Name"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Branch Name
					</p>
					<input
						type="text"
						name="branchName"
						value={state.branchName}
						className="form-control"
						onChange={handleChange}
						placeholder="Enter Branch Name"
					/>
				</div>

				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Account Number
					</p>
					<input
						type="text"
						name="accountNumber"
						value={state.accountNumber}
						className="form-control"
						onChange={handleChange}
						placeholder="Enter Account Number"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						IFSC code
					</p>
					<input
						type="text"
						name="ifscCode"
						value={state.ifscCode}
						className="form-control"
						onChange={handleChange}
						placeholder="Enter IFSC code"
					/>
				</div>
				<div className="form-group leftForm">
					<p className="text-left gg" style={{ opacity: 0.7 }}>
						Passbook
					</p>
					<input
						type="file"
						name="passbook"
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

export default BankAccountDetails;

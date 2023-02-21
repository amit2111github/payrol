import React from "react";

const Step2 = ({ state, handleChange, setState, department }) => {
	console.log(department);
	return (
		<>
			<div className="form-group leftForm">
				<p className="text-left gg" style={{ opacity: 0.7 }}>
					Department
				</p>

				<select
					className="form-select gg"
					style={{ opacity: 0.7 }}
					name="department"
					onChange={handleChange}
					value={state.department}
				>
					<option>Department</option>
					{department.map((cur) => (
						<option
							value={cur.id}
							key={cur.id}
							selected={state.department === cur.id}
						>
							{cur.name}
						</option>
					))}
				</select>
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
							checked={state.gender === "MALE"}
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
							checked={state.gender === "FEMALE"}
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
							checked={state.gender === "OTHER"}
							onChange={() =>
								setState((old) => ({ ...old, gender: "OTHER" }))
							}
						/>
						<span style={{ paddingLeft: "10px" }}>Other</span>
					</label>
				</div>
			</div>
			<div className="form-group leftForm">
				<p className="text-left" style={{ opacity: 0.7 }}>
					Joning Date
				</p>
				<input
					name="joning_date"
					type="date"
					value={state.joning_date}
					className="form-control"
					onChange={handleChange}
				/>
			</div>
			<div className="form-group leftForm" style={{ textAlign: "left" }}>
				<p className="text-left" style={{ opacity: 0.7 }}>
					Tax Slab
				</p>
				<div className="taxslab-div">
					<label className="radio-inline">
						<input
							type="radio"
							name="taxSlab"
							onChange={() =>
								setState((old) => ({ ...old, taxSlab: "OLD" }))
							}
							checked={state.taxSlab === "OLD"}
						/>
						<span style={{ paddingLeft: "10px" }}>OLD</span>
					</label>
					<label className="radio-inline">
						<input
							type="radio"
							name="taxSlab"
							onChange={() =>
								setState((old) => ({
									...old,
									taxSlab: "NEW",
								}))
							}
							checked={state.taxSlab === "NEW"}
						/>
						<span style={{ paddingLeft: "10px" }}>NEW</span>
					</label>
				</div>
			</div>
		</>
	);
};

export default Step2;

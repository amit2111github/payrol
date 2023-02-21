import React from "react";
const Step1 = ({ state, handleChange, employeType }) => {
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
					placeholder="Enter Name"
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
					Employe Type
				</p>
				<select
					name="employe_type"
					className="form-select gg"
					style={{ opacity: 0.7 }}
					onChange={handleChange}
					value={state.employe_type}
				>
					<option>Employe Type</option>
					{employeType.map((cur) => (
						<option
							value={cur.id}
							key={cur.id}
							selected={cur.id === state.employe_type}
						>
							{cur.name}
						</option>
					))}
				</select>
			</div>
		</>
	);
};
export default Step1;

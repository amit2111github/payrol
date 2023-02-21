import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	minHeight: 500,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "10px",
};
export default function BasicModal({
	handleChange,
	handleSubmit,
	open,
	leave,
	handleClose,
	state,
	error,
}) {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<p className="text-center pt-2">
						{leave?.leave_type?.name}
					</p>
					<div className="form-group w-50 m-auto mb-2">
						<p className="text-secondary">From Date *</p>
						<input
							name="from"
							className="form-control"
							type="date"
							value={state?.from}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group w-50 m-auto mb-2">
						<p className="text-secondary">To Date *</p>
						<input
							name="to"
							className="form-control"
							type="date"
							onChange={handleChange}
							value={state?.to}
						/>
					</div>
					<div className="form-group w-50 m-auto mb-2">
						<p className="text-secondary">Description</p>
						<textarea
							onChange={handleChange}
							name="description"
							className="form-control"
							value={state?.description}
						/>
					</div>
					<div className="form-group w-50 m-auto mt-4">
						<input
							type="file"
							className="form-control"
							name="attachment"
							onChange={handleChange}
						/>
					</div>
					{state.message && (
						<p className="pt-2 text-success text-center">
							{state.message}
						</p>
					)}
					{error && (
						<p className="pt-2 text-danger text-center">{error}</p>
					)}
					<div className="form-group w-50 m-auto mt-4 ">
						<button
							className="btn btn-primary w-100"
							onClick={handleSubmit}
						>
							{state.loading ? (
								<i className="fa fa-refresh fa-spin" />
							) : (
								"Submit"
							)}
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}

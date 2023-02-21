import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	minHeight: 450,
	overflow: "auto",
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "10px",
};
export default function BasicModal({
	handleChange,
	handleSubmit,
	open,
	handleClose,
	state,
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
					<div className="form-group w-50 m-auto mt-4">
						<p className="pt-4">Rejection Reason</p>
						<textarea
							className="form-control"
							name="rejectionReason"
							onChange={handleChange}
							value={state.rejectionReason}
						/>
					</div>
					{state.message && (
						<p className="text-center text-secondary pt-2">
							{state.message}
						</p>
					)}
					{state.error && (
						<p className="text-center text-danger pt-2">
							{state.error}
						</p>
					)}
					<div className="form-group w-50 m-auto mt-4 d-flex justify-content-between">
						<button
							className="btn btn-danger"
							onClick={() => handleSubmit("rejected")}
						>
							Reject
						</button>
						<button
							className="btn btn-primary"
							onClick={() => handleSubmit("approved")}
						>
							Approve
						</button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}

BasicModal.propTypes = {
	handleChange: PropTypes.any,
	handleSubmit: PropTypes.any,
	open: PropTypes.any,
	handleOpen: PropTypes.any,
	handleClose: PropTypes.any,
	state: PropTypes.any,
};

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { updateKyc } from "../../../service/api/admin";
import { useContext } from "react";
import { removeUser } from "../../../service/auth/localstorage";
import { UserContext } from "../../../context/user";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	minHeight: 400,
	overflow: "auto",
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "10px",
};

const RejectionModal = ({ open, kyc, handleClose }) => {
	const [reason, setReason] = React.useState("");
	const [state, setState] = React.useState({
		error: false,
		loading: false,
		message: false,
	});

	const { user, setUser } = useContext(UserContext);
	const handleChange = (event) => {
		setReason(event.target.value);
	};
	const handleSubmit = async () => {
		if (!reason) {
			setState((old) => ({
				...old,
				error: "Rejection reason is Manadatory",
			}));
			return;
		}
		setState((old) => ({ ...old, loading: true, error: "" }));
		const data = await updateKyc(user.user, user.token, kyc.id, {
			rejection_reason: reason,
		});

		if (data.error) {
			setState((old) => ({ ...old, error: data.error, loading: false }));
			if (data.code === 1) {
				removeUser();
				setUser(null);
			}
			return;
		}
		setState((old) => ({
			...old,
			message: "Kyc rejected successfully",
			loading: false,
		}));
	};
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div className="form-group w-50 m-auto mt-4">
					<p>Rejection Reason</p>
					<textarea
						className="form-control"
						onChange={handleChange}
					/>
				</div>
				{state.error && (
					<p className="text-center text-danger">{state.error}</p>
				)}
				{state.message && (
					<p className="text-center text-success">{state.message}</p>
				)}
				<div className="form-group w-50 m-auto mt-4">
					<button
						onClick={handleSubmit}
						className="btn btn-primary w-100"
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
	);
};

export default RejectionModal;

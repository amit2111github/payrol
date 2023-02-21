import React, { useState, useEffect, useContext } from "react";
import { removeUser } from "../../../service/auth/localstorage";
import { UserContext } from "../../../context/user";
import { getAllKycDetails } from "../../../service/api/admin";
import ShowKycModal from "./ShowKycModal";
import { updateKyc } from "../../../service/api/admin";
import RejectionModal from "./RejectionModal";
const EmployeKyc = () => {
	const { user, setUser } = useContext(UserContext);
	const [kyc, setKyc] = useState([]);
	const [error, setError] = useState(false);
	console.log(error);
	const [userCode, setUserCode] = useState("");
	useEffect(() => {
		(async function () {
			const data = await getAllKycDetails(user.user, user.token);
			if (data.error) {
				setError(data.error);
				if (data.code === 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setKyc(data);
		})();
	}, []);
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const handleClose = () => setOpen(false);
	const handleSubmit = async (value) => {
		const data = await updateKyc(user.user, user.token, value, {
			rejection_reason: "",
			is_verified: true,
		});
		if (data.error) {
			alert("Failed to Approve Kyc");
			return;
		}
		alert("Approved successfully");
	};
	const handleOpen = (value) => {
		setOpen(true);
		setUserCode(value);
	};
	const [selectedKyc, setSelectedKyc] = useState("");
	const handleOpen2 = (cur) => {
		setOpen2(true);
		setSelectedKyc(cur);
	};
	const handleClose2 = () => setOpen2(false);
	return (
		<>
			<ShowKycModal
				open={open}
				handleClose={handleClose}
				handleOpen={handleOpen}
				userCode={userCode}
			/>
			<RejectionModal
				open={open2}
				handleClose={handleClose2}
				handleOpen={handleOpen2}
				kyc={selectedKyc}
			/>

			<table className="table table-hover">
				<thead className="bluebg_table">
					<tr>
						<th scope="col">#</th>
						<th scope="col">User Code</th>
						<th scope="col">Name</th>
						<th scope="col">Status</th>
						<th scope="col">View</th>
						<th scope="col">Approve</th>
						<th scope="col">Reject</th>
					</tr>
				</thead>
				<tbody>
					{kyc.map((cur, index) => {
						return (
							<tr key={index}>
								<td scope="row">{index + 1}</td>
								<td scope="row">{cur.user_id_as?.user_code}</td>
								<td>{cur?.user_id_as?.name}</td>
								<td>
									{cur.is_verified ? "Verified" : "Pending"}
								</td>
								<td>
									<button
										className="btn btn-primary"
										onClick={() =>
											handleOpen(cur.user_id_as.user_code)
										}
									>
										View
									</button>
								</td>
								<td>
									<button
										className="btn btn-primary"
										onClick={() => handleSubmit(cur.id)}
										disabled={cur.is_verified}
									>
										Approve
									</button>
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => handleOpen2(cur)}
										disabled={cur.is_verified}
									>
										Reject
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default EmployeKyc;

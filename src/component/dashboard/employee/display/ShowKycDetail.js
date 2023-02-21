import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/user";
import { removeUser } from "../../../../service/auth/localstorage";
import { getKycDetails } from "../../../../service/api/user";
import BasicModal from "./Modal";
import "../EmployeDashboard.css";
const ShowKycDetail = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [kycDetails, setKycDetails] = useState({});
	const [error, setError] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const [previewUrl, setPreviewUrl] = useState("");

	useEffect(() => {
		(async function () {
			const data = await getKycDetails(user.user, user.token);
			if (data.error) {
				setError(data.error);
				if (data.code === 1) {
					setUser(null);
					removeUser();
				}
				return;
			}
			setKycDetails(data);
		})();
	}, []);
	return (
		<div className="details-div">
			<BasicModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				url={previewUrl}
			/>
			{error && (
				<p className="pt-2" style={{ color: "red" }}>
					{error}
				</p>
			)}
			<h3 className="details-heading">Address</h3>
			{[kycDetails].map((cur, index) => {
				return (
					<div className="item-details" key={index}>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Legal Name</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.legal_name}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Father Name</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.father_name}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Mother Name</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.mother_name}</p>
							</div>
						</div>

						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Pin Number</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.pan_number}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Aadhar Number</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.aadhar_number}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Status</p>
							</div>
							<div className="ppdiv">
								<p className="pp">
									{cur.is_verified ? "Verified" : "Pending"}
								</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Aadhar Card</p>
							</div>
							<div className="ppdiv">
								<p
									onClick={() => {
										setPreviewUrl(cur.aadhar_proof);
										handleOpen();
									}}
									className="pp showbutton"
								>
									Show
								</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Pan Card</p>
							</div>
							<div className="ppdiv">
								<p
									onClick={() => {
										setPreviewUrl(cur.pan_proof);
										handleOpen();
									}}
									className="pp showbutton"
								>
									Show
								</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Photo</p>
							</div>
							<div className="ppdiv">
								<p
									onClick={() => {
										setPreviewUrl(cur.live_photo);
										handleOpen();
									}}
									className="pp showbutton"
								>
									Show
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ShowKycDetail;

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/user";
import { removeUser } from "../../../../service/auth/localstorage";
import { getBankDetails, getSignedUrl } from "../../../../service/api/user";
import BasicModal from "./Modal";
import "../EmployeDashboard.css";

const ShowBankAccountDetail = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [bankDetails, setBankDetails] = useState([]);
	const [error, setError] = useState(false);
	const [imageError, setImageError] = useState(false);
	const { user, setUser } = useContext(UserContext);
	console.log(imageError);
	useEffect(() => {
		(async function () {
			const data = await getBankDetails(user.user, user.token);
			if (data.error) {
				setError(data.error);
				if (data.code === 1) {
					setTimeout(() => {
						setUser(null);
						removeUser();
					}, 1000);
				}
				return;
			}
			const data_url = await getSignedUrl(data[0].passbook_photo);
			if (data_url.error) {
				setImageError(data_url.error);
			} else data[0].passbook_photo = data_url.url;
			setBankDetails(data.splice(0, 1));
		})();
	}, []);
	return (
		<div className="details-div">
			{error && <p>{error}</p>}
			<BasicModal
				open={open}
				handleClose={handleClose}
				handleOpen={handleOpen}
				url={bankDetails[0]?.passbook_photo}
			/>
			<h3 className="details-heading">Bank Account Details</h3>
			{bankDetails.map((cur, index) => {
				return (
					<div className="item-details" key={index}>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Account No.</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.account_number}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">IFSC code</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.ifsc_code}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Branch</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.branch_name}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Bank Name</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.bank_name}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Passbook</p>
							</div>
							<div className="ppdiv">
								<p className="pp">
									<p
										className="pp showbutton"
										onClick={handleOpen}
									>
										Show
									</p>
								</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ShowBankAccountDetail;

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Carousel from "react-material-ui-carousel";
import { useState, useEffect, useContext } from "react";
import {
	getEducationDetails,
	getKycDetails,
	getAddressDetails,
	getAccountDetails,
} from "../../../service/api/admin";
import { removeUser } from "../../../service/auth/localstorage";
import { UserContext } from "../../../context/user";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	minHeight: 600,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: "10px",
};
export default function ShowKycModal({ open, handleClose, userCode }) {
	const { user, setUser } = useContext(UserContext);
	const [education, setEducation] = useState([]);
	const [kyc, setKyc] = useState({});
	const [address, setAddress] = useState([]);
	const [account, setAccount] = useState({});
	const [error, setError] = useState({
		education: false,
		kyc: false,
		address: false,
		account: false,
	});
	useEffect(() => {
		(async function () {
			if (!userCode) return;
			const education = await getEducationDetails(
				user.user,
				user.token,
				userCode
			);
			if (education.error) {
				setError((old) => ({ ...old, education: education.error }));
				if (education.code == 1) {
					removeUser();
					setUser(null);
				}
			} else setEducation(education);
			const kyc = await getKycDetails(user.user, user.token, userCode);
			if (kyc.error) {
				setError((old) => ({ ...old, kyc: kyc.error }));
				if (kyc.code == 1) {
					removeUser();
					setUser(null);
				}
			} else setKyc(kyc);
			const address = await getAddressDetails(
				user.user,
				user.token,
				userCode
			);
			if (address.error) {
				setError((old) => ({ ...old, address: address.error }));
				if (address.code == 1) {
					removeUser();
					setUser(null);
				}
			} else setAddress(address);
			const account = await getAccountDetails(
				user.user,
				user.token,
				userCode
			);
			if (account.error) {
				setError((old) => ({ ...old, account: account.error }));
				if (account.code === 1) {
					removeUser();
					setUser(null);
				}
			} else setAccount(account);
		})();
	}, [userCode]);
	const [value, setValue] = React.useState(1);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Tabs
						className="p-3"
						value={value}
						onChange={handleChange}
						textColor="primary"
						// indicatorColor="secondary"
					>
						<Tab value={1} label="Kyc" className="h6" />
						<Tab value={2} label="Education" />
						<Tab value={3} label="Address" />
						<Tab value={4} label="Account" />
					</Tabs>
					<div className="w-75 m-auto mt-3">
						{value === 1 && (
							<div>
								{error.kyc && (
									<p className="text-danger text-center">
										{error.kyc}
									</p>
								)}
								{!error.kyc && kycTab(kyc)}
							</div>
						)}
						{value === 2 && (
							<div>
								{error.education && (
									<p className="text-danger text-center">
										{error.education}
									</p>
								)}
								{!error.education && educationTab(education)}
							</div>
						)}
						{value === 3 && (
							<div>
								{error.address && (
									<p className="text-danger text-center">
										{error.address}
									</p>
								)}
								{!error.address && addressTab(address)}
							</div>
						)}
						{value === 4 && (
							<div>
								{error.account && (
									<p className="text-danger text-center">
										{error.account}
									</p>
								)}
								{!error.account && accountTab(account)}
							</div>
						)}
					</div>
				</Box>
			</Modal>
		</div>
	);
}

const addressTab = (address) => {
	return (
		<Carousel>
			{address.map((cur, index) => {
				return (
					<div className="item-details" key={index}>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">City</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.city}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">State</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.state}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Pin Code</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.pin_code}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Address Line</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.address_line}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Address Type</p>
							</div>
							<div className="ppdiv">
								<p className="pp">Permanent</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Latitude</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.latitude}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Longitude</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.longitude}</p>
							</div>
						</div>
					</div>
				);
			})}
		</Carousel>
	);
};

const kycTab = (kyc) => {
	return [kyc].map((cur, index) => {
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
						<p className="pp">Aadhar Card</p>
					</div>
					<div className="ppdiv">
						<p
							onClick={() =>
								window.open(cur.aadhar_proof, "_blank")
							}
							className="pp showbutton"
						>
							download
						</p>
					</div>
				</div>
				<div className="details-flex">
					<div className="ppdiv">
						<p className="pp">Pan Card</p>
					</div>
					<div className="ppdiv">
						<p
							onClick={() => window.open(cur.pan_proof, "_blank")}
							className="pp showbutton"
						>
							download
						</p>
					</div>
				</div>
				<div className="details-flex">
					<div className="ppdiv">
						<p className="pp">Photo</p>
					</div>
					<div className="ppdiv">
						<p
							onClick={() =>
								window.open(cur.live_photo, "_blank")
							}
							className="pp showbutton"
						>
							download
						</p>
					</div>
				</div>
			</div>
		);
	});
};

const educationTab = (education) => {
	return (
		<Carousel>
			{education.map((cur, index) => {
				return (
					<div className="item-details" key={index}>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Degree Name</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.degree_name}</p>
							</div>
						</div>

						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Institutions Name</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.institution_name}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">From Year</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.from}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">To Year</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.to}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">Mode</p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.mode}</p>
							</div>
						</div>
						<div className="details-flex">
							<div className="ppdiv">
								<p className="pp">C.G.P.A </p>
							</div>
							<div className="ppdiv">
								<p className="pp">{cur.cgpa}</p>
							</div>
						</div>
					</div>
				);
			})}
		</Carousel>
	);
};

const accountTab = (account) => {
	return [account].map((cur, index) => {
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
								onClick={() =>
									window.open(cur.passbook_photo, "_blank")
								}
								className="pp showbutton"
							>
								download
							</p>
						</p>
					</div>
				</div>
			</div>
		);
	});
};

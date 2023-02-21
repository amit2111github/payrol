import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/user";
import { removeUser } from "../../../../service/auth/localstorage";
import { getAddressDetails } from "../../../../service/api/user";
import "../EmployeDashboard.css";
const ShowAddressDetils = () => {
	const [address, setAddress] = useState([]);
	const [error, setError] = useState(false);
	const { user, setUser } = useContext(UserContext);
	useEffect(() => {
		(async function () {
			const data = await getAddressDetails(user.user, user.token);
			if (data.error) {
				setError(data.error);
				if (data.code === 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setAddress(data.splice(0, 1));
		})();
	}, []);
	console.log(address);
	return (
		<div className="details-div">
			{error && (
				<p className="pt-2" style={{ color: "red" }}>
					{error}
				</p>
			)}
			<h3 className="details-heading">Address</h3>
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
		</div>
	);
};

export default ShowAddressDetils;

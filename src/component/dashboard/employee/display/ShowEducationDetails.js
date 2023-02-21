import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/user";
import { removeUser } from "../../../../service/auth/localstorage";
import { getEducationDetails } from "../../../../service/api/user";
import Carousel from "react-material-ui-carousel";
import "../EmployeDashboard.css";
const ShowEducationDetails = () => {
	console.log("insdie education");
	const [education, setEducation] = useState([]);
	const [error, setError] = useState(false);
	const { user, setUser } = useContext(UserContext);
	useEffect(() => {
		(async function () {
			const data = await getEducationDetails(user.user, user.token);
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
			setEducation(data);
		})();
	}, []);
	return (
		<div className="details-div">
			{error && <p>{error}</p>}
			<h3 className="details-heading">Educational Qualification</h3>
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
		</div>
	);
};

export default ShowEducationDetails;

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";
import { getEmployeOfDepartment } from "../../../service/api/manager";
const EmployeList = () => {
	const { user, setUser } = useContext(UserContext);
	const [employe, setEmploye] = useState([]);
	const [error, setError] = useState("");
	console.log(error);
	useEffect(() => {
		(async function () {
			const data = await getEmployeOfDepartment(user.user, user.token);
			console.log(data);
			if (data.error) {
				setError(data.error);
				if (data.code == 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setEmploye(data);
		})();
	}, []);

	return (
		<table className="table table-hover">
			<thead className="bluebg_table">
				<tr>
					<th scope="col">User Code</th>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th scope="col">Phone No.</th>
					<th scope="col">Role</th>
					<th scope="col">gender</th>
				</tr>
			</thead>
			<tbody>
				{employe.map((cur, index) => {
					return (
						<tr key={index}>
							<td scope="row">{cur.user_code}</td>
							<td>{cur.name}</td>
							<td>{cur.email}</td>
							<td>{cur.phone_number}</td>
							<td
								style={{
									color: cur.role == "EMPLOYEE" ? "gray" : "",
								}}
							>
								{cur.role}
							</td>
							<td>{cur.gender}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default EmployeList;

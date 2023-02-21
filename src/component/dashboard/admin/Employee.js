import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/user";
import { getAllEmployee } from "../../../service/api/admin";
import { removeUser } from "../../../service/auth/localstorage";
const Employee = () => {
	const { user, setUser } = useContext(UserContext);
	const [state, setState] = useState({
		employee: [],
		message: false,
		error: false,
		loading: false,
	});
	useEffect(() => {
		(async function () {
			setState((old) => ({
				...old,
				error: false,
				loading: true,
				message: false,
			}));
			const data = await getAllEmployee(user.user, user.token);
			if (data.error) {
				setState((old) => ({
					...old,
					error: data.error,
					loading: false,
					message: false,
				}));
				if (data.code === 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			setState((old) => ({
				...old,
				employee: data,
			}));
		})();
	}, []);
	console.log(state.employee);
	return (
		<table className="table table-hover">
			<thead className="bluebg_table">
				<tr>
					<th scope="col">User Code</th>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th scope="col">Phone No.</th>
					<th scope="col">Role</th>
					<th scope="col">Departmenr</th>
					<th scope="col">gender</th>
				</tr>
			</thead>
			<tbody>
				{state.employee.map((cur, index) => {
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
							<td>
								{cur.department_as?.name?.toUpperCase() || "NA"}
							</td>
							<td>{cur.gender}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Employee;

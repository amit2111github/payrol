import React, { useContext, useEffect, useState } from "react";
import { getAllManager } from "../../../service/api/admin";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";
const ListManager = () => {
	const { user, setUser } = useContext(UserContext);
	const [state, setState] = useState({
		error: false,
		message: false,
		manager: [],
	});
	useEffect(() => {
		(async function () {
			const data = await getAllManager(user.user, user.token);
			if (data.error) {
				if (data.code == 1) {
					setTimeout(() => {
						removeUser();
						setUser(null);
					}, 1000);
				}
				return;
			}
			setState((old) => ({ ...old, manager: data }));
		})();
	}, []);
	return (
		<table className="table table-hover">
			{state.error && (
				<p className="pt-2" style={{ color: "red" }}>
					{state.error}
				</p>
			)}
			<thead className="bluebg_table">
				<tr>
					<th scope="col">User Code</th>
					<th scope="col">Name</th>
					<th scope="col">Email</th>
					<th scope="col">Phone No.</th>
					<th scope="col">Department</th>
					<th scope="col">gender</th>
				</tr>
			</thead>
			<tbody>
				{state.manager.map((cur) => (
					<tr key={cur.id}>
						<td scope="row">{cur.user_code}</td>
						<td>{cur.name}</td>
						<td>{cur.email}</td>
						<td>{cur.phone_number}</td>

						<td>
							{cur.department_as?.name?.toUpperCase() || "NA"}
						</td>
						<td>{cur.gender}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ListManager;

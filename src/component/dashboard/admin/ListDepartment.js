import React, { useContext, useEffect, useState } from "react";
import { getAllDepartment } from "../../../service/api/admin";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";

const ListDepartment = () => {
	const { user, setUser } = useContext(UserContext);
	const [state, setState] = useState({
		error: false,
		message: false,
		department: [],
	});
	useEffect(() => {
		(async function () {
			const data = await getAllDepartment(user.user, user.token);
			console.log(data);
			if (data.error) {
				if (data.code == 1) {
					setTimeout(() => {
						removeUser();
						setUser(null);
					}, 1000);
				}
				return;
			}
			setState((old) => ({ ...old, department: data }));
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
					<th scope="col">#</th>
					<th scope="col">Department</th>
					<th scope="col">Managed By</th>
					<th scope="col">Managed Code</th>
				</tr>
			</thead>
			<tbody>
				{state.department.map((cur, index) => (
					<tr key={cur.id}>
						<td scope="row">{index + 1}</td>
						<td scope="row">{cur.name}</td>
						<td>{cur.managedBy?.name || "NA"}</td>
						<td>{cur.managedBy?.user_code || "NA"}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ListDepartment;

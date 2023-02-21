import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/user";
import {
	getAllEmployee,
	getAllDepartmentWithManager,
} from "../../../service/api/admin";
import { removeUser } from "../../../service/auth/localstorage";

const ManagerList = () => {
	const { user, setUser } = useContext(UserContext);
	const [state, setState] = useState({
		manager: [],
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
			const data = await getAllDepartmentWithManager(
				user.user,
				user.token
			);
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
				error: false,
				loading: false,
				manager: data,
			}));
		})();
	}, []);
	return <>Hello</>;
};

export default ManagerList;

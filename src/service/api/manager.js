const url = process.env.REACT_APP_AUTH_URL;
const kycUrl = process.env.REACT_APP_KYC_URL;
export const getEmployeOfDepartment = (user, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		department_id: user.department_id,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "department/user", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Ooops Something went wrong"));
};

export const getAllRequestedLeave = (user, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "manager/leave/see", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Ooops Something went wrong"));
};
export const changeLeaveStatus = (leaveId, user, token, status, rejection) => {
	var myHeaders = new Headers();

	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		requestedLeaveId: leaveId,
		status,
		rejection_reason: rejection,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "manager/leave/changestatus", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Ooops Something went wrong"));
};

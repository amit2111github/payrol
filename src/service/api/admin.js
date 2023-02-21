const url = process.env.REACT_APP_AUTH_URL;
const kycUrl = process.env.REACT_APP_KYC_URL;
export const getAllEmployee = (user, token) => {
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

	return fetch(url + "user/get/allEmployee", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Something went wrong"));
};

export const createBulkEmployee = (file, token, user) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);

	var formdata = new FormData();
	formdata.append("myFile", file, file.name);
	formdata.append("id", user.id);
	formdata.append("company_id", user.company_id);

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formdata,
		redirect: "follow",
	};
	return fetch(url + "user/create/employeeM", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong."));
};
export const createEmployeType = (name, token, user) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		name: name.toLocaleLowerCase(),
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "employetype/create", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Something went wrong."));
};

export const createDepartment = (name, token, user) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		name: name.toLocaleLowerCase(),
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "department/create", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong."));
};

export const getEmployeType = (user, token) => {
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

	return fetch(url + "employetype/getAll", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const getAllDepartment = (user, token) => {
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

	return fetch(url + "department/all", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const createEmploye = (obj, token, user) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		name: obj.name,
		email: obj.email,
		phone_number: obj.phone,
		gender: obj.gender,
		role: "EMPLOYEE",
		joning_date: obj.joning_date,
		tax_slab: obj.taxSlab,
		employee_type: obj.employe_type,
		department_id: obj.department,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "user/create/employee1", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong."));
};

export const changeDepartment = (obj, user, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		department_id: obj.selectedDepartment,
		user_code: obj.userCode,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "user/change-depatment", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong."));
};
export const getAllDepartmentWithManager = (user, token) => {
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

	return fetch(url + "department/all", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong."));
};

export const changeManager = (obj, user, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		user_id: obj.userCode,
		department_id: obj.departmentId,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	return fetch(url + "department/changemanager", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong.."));
};

export const getAllManager = (user, token) => {
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

	return fetch(url + "user/getManager", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
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

	return fetch(kycUrl + "admin/leave/see", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const changeLeaveStatus = (
	leaveId,
	user,
	token,
	status,
	rejectionReason
) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		requestedLeaveId: leaveId,
		status,
		rejection_reason: rejectionReason,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	return fetch(kycUrl + "admin/leave/changestatus", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const createLeave = (user, token, days, leaveTypeId) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		leave_id: leaveTypeId,
		days: days,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "leave/allotment", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const getAllLeaveType = (user, token) => {
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

	return fetch(url + "leave/get/leave-type", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const getAllKycDetails = (user, token) => {
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

	return fetch(kycUrl + "admin/all/kycDetails", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};
export const getEducationDetails = (user, token, userCode) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		user_code: userCode,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "admin/education", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};
export const getKycDetails = (user, token, userCode) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		user_code: userCode,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "admin/kyc", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};
export const getAddressDetails = (user, token, userCode) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		user_code: userCode,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "admin/address", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};
export const getAccountDetails = (user, token, userCode) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		user_code: userCode,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "admin/acccountDetails", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const updateKyc = (user, token, kycId, other) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		kycId,
		...other,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "admin/update/kyc", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const changeLogo = (user, token, s3link) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		s3link,
	});

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "company/change/logo", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

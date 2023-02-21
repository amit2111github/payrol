const kycUrl = process.env.REACT_APP_KYC_URL;
const imageurl = process.env.REACT_APP_IMAGE_URL;
const url = process.env.REACT_APP_AUTH_URL;
export const getCompanyName = () => {
	const list = window.location.href.split("/");
	if (list[3] === "signup" || list[3] === "dashboard") return "";
	return list[3];
};

export const getKycStatus = (user, token) => {
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

	return fetch(kycUrl + "kyc/", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const submitKyc = (obj, s3link, cords, user, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		education: obj.education.map((cur) => ({
			degree_name: cur.degreeName,
			mode: cur.mode,
			cgpa: cur.cgpa,
			institution_name: cur.institutionName,
			from: cur.from,
			to: cur.to,
		})),
		accountDetails: {
			ifsc_code: obj.ifscCode,
			branch_name: obj.branchName,
			passbook_photo: s3link[3].url,
			bank_name: obj.bankName,
			account_number: obj.accountNumber,
		},
		kyc: {
			father_name: obj.fatherName,
			legal_name: obj.legalName,
			mother_name: obj.motherName,
			pan_number: obj.panNumber,
			aadhar_number: obj.accountNumber,
			live_photo: s3link[0].url,
			pan_proof: s3link[1].url,
			aadhar_proof: s3link[2].url,
		},
		address: [
			{
				latitude: cords[0],
				longitude: cords[1],
				city: obj.city,
				state: obj.state,
				pin_code: obj.pincode,
				address_line: obj.addressLine,
				type: "PERMANENT",
			},
		],
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "kyc/create", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const getEducationDetails = (user, token) => {
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

	return fetch(kycUrl + "education/", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const getAddressDetails = (user, token) => {
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

	return fetch(kycUrl + "address", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.log("error", error));
};

export const getBankDetails = (user, token) => {
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

	return fetch(kycUrl + "accountDetails", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const getSignedUrl = (url) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		Key: url,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(imageurl + "signed-url/", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const getKycDetails = (user, token) => {
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

	return fetch(kycUrl + "kyc/", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const userLeave = (user, token) => {
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

	return fetch(kycUrl + "user/leave", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const takeLeave = (obj, leave, s3link, user, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		leave_id: leave.leave_id,
		from: obj.from,
		to: obj.to,
		description: obj.description.trim(),
		attachment: s3link,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(kycUrl + "user/leave/take", requestOptions)
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

	return fetch(kycUrl + "user/leave/requested", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch(() => alert("Oops Something went wrong"));
};

export const updateUserProfile = (user, token, s3link) => {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		id: user.id,
		company_id: user.company_id,
		profile_picture: s3link,
	});

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "user/profile/photo", requestOptions)
		.then((response) => response.json())
		.then((result) => result)
		.catch((error) => console.log(error));
};

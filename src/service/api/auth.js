const url = process.env.REACT_APP_AUTH_URL;
const imageurl = process.env.REACT_APP_IMAGE_URL;
export const getCompanyBaseUrl = (userCode) => {
	return fetch(url + "user/get-company-url/" + userCode)
		.then((data) => data.json())
		.then((data) => data)
		.catch((err) => err);
};

export const sendOtp = (userCode) => {
	var raw = JSON.stringify({
		user_code: userCode,
	});
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	return fetch(url + "user/password/forgot/s1", requestOptions)
		.then((data) => data.json())
		.then((data) => data)
		.catch((err) => alert(err));
};
export const changePassword = (otp, newPassword, userCode) => {
	var raw = JSON.stringify({
		otp,
		user_code: userCode,
		newPassword,
	});
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	return fetch(url + "user/password/forgot/s2", requestOptions)
		.then((data) => data.json())
		.then((data) => data)
		.catch((err) => alert(err));
};
export const getCompanyDetails = (name) => {
	return fetch(url + "company/get/" + name)
		.then((data) => data.json())
		.then((data) => data)
		.catch((err) => err);
};

export const userLogin = (userCode, password) => {
	var raw = JSON.stringify({
		user_code: userCode,
		password,
	});
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	return fetch(url + "user/signin", requestOptions)
		.then((data) => data.json())
		.then((data) => data)
		.catch((err) => alert(err));
};

export const getCoordinates = (placeName) => {
	return fetch(
		`https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiYW1pdDIxMTEiLCJhIjoiY2t4enYybXNuMzhsdzMycDRrYzZ4YWtqdSJ9.pK-SzZf5jFOYBF_EzpegsA`
	)
		.then((data) => data.json())
		.then((data) => data.features[0].center)
		.then((data) => data)
		.catch(() => alert("Wrong Address"));
};

export const uploadFile = (file) => {
	const formData = new FormData();
	formData.append("myFile", file);
	return fetch(imageurl + "upload", {
		method: "POST",
		body: formData,
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((err) => {
			console.log(err);
			alert("Oops  Something went wrong");
		});
};
export const uploadBulkPhotos = async (file) => {
	try {
		const formdata = file.map((cur) => {
			const formData = new FormData();
			formData.append("myFile", cur);
			return fetch(imageurl + "upload", {
				method: "POST",
				body: formData,
			});
		});
		let data = await Promise.all(formdata);
		let response = await Promise.all(data.map((cur) => cur.json()));
		return response;
	} catch (err) {
		return { error: "Failed to Upload Images" };
	}
};
export const createCompany = (obj) => {
	// console.log(obj);
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		name: obj.name,
		latitude: obj.lat,
		longitude: obj.lon,
		city: obj.city,
		state: obj.state,
		pin_code: obj.pincode,
		address_line: obj.addressLine,
		comapany_name: obj.companyName,
		email: obj.email,
		phone_number: obj.phone,
		password: obj.password,
		gender: obj.gender,
		role: "ADMIN",
		logo: obj.logo,
	});

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	return fetch(url + "company/create", requestOptions)
		.then((data) => data.json())
		.then((data) => data)
		.catch(() => alert("Something went wrong."));
};

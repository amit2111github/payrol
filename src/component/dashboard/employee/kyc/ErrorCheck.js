export const checkEducationDetails = (education, setState) => {
	if (!education.degreeName) {
		setState((old) => ({ ...old, error: "Degree Name is Manadatory" }));
		return false;
	}
	if (!education.institutionName) {
		setState((old) => ({
			...old,
			error: "Institution Name is Manadatory",
		}));
		return false;
	}
	if (!education.cgpa) {
		setState((old) => ({ ...old, error: "CGPA is Manadatory" }));
		return false;
	}
	if (!education.from) {
		setState((old) => ({ ...old, error: "from year is Manadatory" }));
		return false;
	}
	if (!education.to) {
		setState((old) => ({ ...old, error: "to year is Manadatory" }));
		return false;
	}
	if (!education.mode) {
		setState((old) => ({ ...old, error: "Mode is Manadatory" }));
		return false;
	}
	return true;
};
export const checkPersonal = (state, setState) => {
	if (!state.legalName) {
		setState((old) => ({ ...old, error: "Legal Name is required" }));
		return false;
	}
	if (!state.motherName) {
		setState((old) => ({ ...old, error: "Mother Name is required" }));
		return false;
	}
	if (!state.fatherName) {
		setState((old) => ({ ...old, error: "Father Name is required" }));
		return false;
	}
	if (!state.livePhoto) {
		setState((old) => ({ ...old, error: "Photo is required" }));
		return false;
	}
	return true;
};
export const checkAadhar = (state, setState) => {
	if (!state.aadharNumber) {
		setState((old) => ({ ...old, error: "Aadhar Number is required" }));
		return false;
	}
	if (!state.aadharCard) {
		setState((old) => ({ ...old, error: " Aadhar Photo is required" }));
		return false;
	}
	if (!state.panNumber) {
		setState((old) => ({ ...old, error: "Pan Number is required" }));
		return false;
	}
	if (!state.panCard) {
		setState((old) => ({ ...old, error: "Pan photo is required" }));
		return false;
	}
	return true;
};
export const checkBank = (state, setState) => {
	if (!state.bankName) {
		setState((old) => ({ ...old, error: "Bank Name is required" }));
		return false;
	}
	if (!state.branchName) {
		setState((old) => ({ ...old, error: "Branch Name is required" }));
		return false;
	}
	if (!state.accountNumber) {
		setState((old) => ({ ...old, error: "Account Number is required" }));
		return false;
	}
	if (!state.ifscCode) {
		setState((old) => ({ ...old, error: "IFSC code is required" }));
		return false;
	}
	if (!state.passbook) {
		setState((old) => ({ ...old, error: "Passbook Photo is required" }));
		return false;
	}
	return true;
};
export const checkAdress = (state, setState) => {
	if (!state.state) {
		setState((old) => ({ ...old, error: "State is required" }));
		return false;
	}
	if (!state.city) {
		setState((old) => ({ ...old, error: "City is required" }));
		return false;
	}
	if (!state.pincode) {
		setState((old) => ({ ...old, error: "Pincode is required" }));
		return false;
	}
	if (!state.addressLine) {
		setState((old) => ({ ...old, error: "Address Line is required" }));
		return false;
	}
	return true;
};

import React, { useState, useContext } from "react";
import AddressForm from "./AddressForm";
import EducationForm from "./EducationForm";
import AadharForm from "./AadharForm";
import PersonalInformationForm from "./PersonalInformationForm";
import BankAccountDetails from "./BankAccountDetails";
import { uploadBulkPhotos, getCoordinates } from "../../../../service/api/auth";
import { submitKyc } from "../../../../service/api/user";
import { UserContext } from "../../../../context/user";
import { removeUser } from "../../../../service/auth/localstorage";
import {
	checkEducationDetails,
	checkPersonal,
	checkAadhar,
	checkBank,
	checkAdress,
} from "./ErrorCheck";

const KycForm = ({ step, setStep }) => {
	console.log("inside");
	const { user, setUser } = useContext(UserContext);
	const [state, setState] = useState({
		legalName: "",
		motherName: "",
		fatherName: "",
		livePhoto: null,
		aadharNumber: "",
		panNumber: "",
		aadharCard: null,
		panCard: null,
		education: [],
		error: false,
		message: false,
		loading: false,
		bankName: "",
		branchName: "",
		accountNumber: "",
		ifscCode: "",
		passbook: null,
		state: "",
		city: "",
		pincode: "",
		addressLine: "",
	});
	const [education, setEducation] = useState({
		degreeName: "",
		institutionName: "",
		cgpa: "",
		mode: "",
		from: "",
		to: "",
	});
	const addMore = () => {
		let ok = checkEducationDetails(education, setState);
		if (!ok) return;
		setState((old) => ({
			...old,
			education: [...old.education, education],
			error: false,
		}));
		setEducation({
			degreeName: "",
			institutionName: "",
			cgpa: "",
			mode: "",
			from: "",
			to: "",
		});
	};
	const handleNextStep = () => {
		if (step == 1 && !checkPersonal(state, setState)) return;
		if (step == 2 && !checkAadhar(state, setState)) return;
		if (step === 3 && state.education.length === 0) {
			setState((old) => ({
				...old,
				error: "Education details is compulsory",
			}));
			return;
		}
		if (step == 4 && !checkBank(state, setState)) return;

		setStep((old) => old + 1);
		setState((old) => ({ ...old, error: false }));
	};
	const handlePrevStep = () => {
		setStep((old) => old - 1);
	};
	const handleEducation = (event) => {
		setEducation((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};

	const handleChange = (event) => {
		if (event.target.type === "file") {
			setState((old) => ({
				...old,
				[event.target.name]: event.target.files[0],
			}));
			return;
		}
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	const handleSubmit = async () => {
		if (step == 5 && !checkAdress(state, setState)) return;
		setState((old) => ({
			...old,
			error: false,
			loading: true,
			message: "",
		}));
		const s3link = await uploadBulkPhotos([
			state.livePhoto,
			state.panCard,
			state.aadharCard,
			state.passbook,
		]);
		if (s3link.error) {
			setState((old) => ({
				...old,
				error: s3link.error,
				loading: false,
			}));
			return;
		}
		const address = await getCoordinates(state.addressLine);
		const data = await submitKyc(
			{ ...state },
			s3link,
			address,
			user.user,
			user.token
		);
		if (data.error) {
			if (data.code == 1) {
				removeUser();
				setUser(null);
			} else
				setState((old) => ({
					...old,
					error: data.error,
					loading: false,
				}));
			return;
		}
		setState((old) => ({ ...old, loading: false, message: data.msg }));
		window.location.reload();
	};
	return (
		<>
			{step == 1 && (
				<PersonalInformationForm
					state={state}
					handleChange={handleChange}
					handleNextStep={handleNextStep}
				/>
			)}
			{step == 2 && (
				<AadharForm
					state={state}
					handleChange={handleChange}
					handleNextStep={handleNextStep}
					handlePrevStep={handlePrevStep}
				/>
			)}
			{step == 3 && (
				<EducationForm
					state={education}
					handleChange={handleEducation}
					handleNextStep={handleNextStep}
					handlePrevStep={handlePrevStep}
					addMore={addMore}
					error={state.error}
					message={state.message}
				/>
			)}
			{step == 4 && (
				<BankAccountDetails
					state={state}
					handleChange={handleChange}
					handlePrevStep={handlePrevStep}
					handleNextStep={handleNextStep}
				/>
			)}
			{step == 5 && (
				<AddressForm
					state={state}
					handleSubmit={handleSubmit}
					handlePrevStep={handlePrevStep}
					handleChange={handleChange}
				/>
			)}
		</>
	);
};

export default KycForm;

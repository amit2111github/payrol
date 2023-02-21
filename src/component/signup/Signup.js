import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./Signup.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import {
	getCoordinates,
	uploadFile,
	createCompany,
} from "../../service/api/auth";
const validate = (step, state, setState) => {
	if (step == 1) {
		if (!state.name) {
			setState((old) => ({ ...old, error: "Name is required" }));
			return false;
		}
		if (!state.email) {
			setState((old) => ({ ...old, error: "Email is required" }));
			return false;
		}
		let ok = state.phone.length === 10;
		for (let i = 0; i < state.phone.length && ok; i++)
			ok &= state.phone[i] >= "0" && state.phone[i] <= "9";
		if (!ok) {
			setState((old) => ({ ...old, error: "Invalid Phone Number" }));
			return false;
		}
		if (!state.password) {
			setState((old) => ({ ...old, error: "password is required" }));
			return false;
		}
		return true;
	}
	if (step == 2) {
		if (!state.companyName) {
			setState((old) => ({ ...old, error: "Company Name is required" }));
			return false;
		}
		if (!state.logo) {
			setState((old) => ({ ...old, error: "Logo is required" }));
			return false;
		}
		if (!state.gender) {
			setState((old) => ({ ...old, error: "gender is required" }));
			return false;
		}
		return true;
	}
	if (step == 3) {
		if (!state.state) {
			setState((old) => ({ ...old, error: "State is required" }));
			return false;
		}
		if (!state.city) {
			setState((old) => ({ ...old, error: "City is required" }));
			return false;
		}
		if (!state.addressLine) {
			setState((old) => ({ ...old, error: "Address Line is required" }));
			return false;
		}
		if (!state.pincode) {
			setState((old) => ({ ...old, error: "pin code is required" }));
			return false;
		}
		return true;
	}
};

const Signup = () => {
	const [state, setState] = useState({
		step: 1,
		name: "",
		email: "",
		password: "",
		phone: "",
		logo: null,
		companyName: "",
		gender: "",
		error: false,
		addressLine: "",
		pincode: "",
		city: "",
		state: "",
		message: "",
		lat: "",
		lon: "",
	});
	const item = [
		"https://orocorp.greythr.com/uas/v1/cms/asset/17042120-a978-4094-b8c9-deeed84dfe7e",
		"https://orocorp.greythr.com/uas/v1/cms/asset/9e451477-0a45-4270-a843-bc1127f792bf",
		"https://orocorp.greythr.com/uas/v1/cms/asset/5fe7bab4-8479-4266-a749-97a7208b7a40",
	];
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	const handlePrevStep = () => {
		setState((old) => ({ ...old, step: old.step - 1 }));
	};
	const handleSubmit = async () => {
		setState((old) => ({ ...old, error: false }));
		let ok = validate(state.step, state, setState);
		if (!ok) return;
		setState((old) => ({
			...old,
			error: false,
			loading: true,
		}));
		let data = await getCoordinates(state.addressLine);
		if (!data) {
			setState((old) => ({
				...old,
				error: "Something Wrong with Address",
				loading: false,
			}));
			return;
		}
		const s3link = await uploadFile(state.logo);
		// console.log(s3link);
		if (!s3link?.url) {
			setState((old) => ({
				...old,
				error: "Try uploading your file again.",
				loading: false,
			}));
			return;
		}
		// console.log(data);
		setState((old) => ({
			...old,
			error: false,
			lat: data[0],
			lon: data[1],
			logo: s3link,
		}));

		data = await createCompany({
			...state,
			logo: s3link.url,
			lat: data[0],
			lon: data[1],
		});
		console.log(data);
		if (data.error) {
			setState((old) => ({ ...old, error: data.error, loading: false }));
			return;
		}
		setState((old) => ({
			...old,
			error: false,
			message: "Company Created Successfully",
			name: "",
			state: "",
			city: "",
			logo: null,
			gender: "",
			addressLine: "",
			pincode: "",
			companyName: "",
			email: "",
			lat: "",
			lonn: "",
			phone: "",
			loading: false,
		}));
	};
	const handleNextStep = () => {
		setState((old) => ({ ...old, error: false }));
		let ok = validate(state.step, state, setState);
		if (!ok) return;
		setState((old) => ({ ...old, step: old.step + 1 }));
	};
	const url =
		"data:image/png;base64,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";
	return (
		<div className="second">
			<div className="left" style={{ paddingTop: "5px" }}>
				<img src={url} />
				<h5 style={{ color: "#394657" }} className="pt-2">
					Register your company
				</h5>
				{state.step == 1 && (
					<Step1 handleChange={handleChange} state={state} />
				)}
				{state.step == 2 && (
					<Step2
						handleChange={handleChange}
						state={state}
						setState={setState}
					/>
				)}
				{state.step == 3 && (
					<Step3
						handleChange={handleChange}
						state={state}
						setState={setState}
					/>
				)}
				{state.error && (
					<p className="pt-1" style={{ color: "red" }}>
						{state.error}
					</p>
				)}
				{state.message && (
					<p style={{ color: "green" }} className="pt-2">
						{state.message}
					</p>
				)}
				<div
					className="form-group leftForm buttons pb-4 pt-2"
					style={{
						justifyContent:
							state.step == 1 ? "center" : "space-between",
					}}
				>
					{state.step > 1 && (
						<button
							className="btn btn-md btn-primary"
							onClick={handlePrevStep}
						>
							Prev
						</button>
					)}
					{state.step < 3 && (
						<button
							className="btn btn-md btn-primary nextbutton"
							onClick={handleNextStep}
						>
							Next Step
						</button>
					)}
					{state.step == 3 && (
						<button
							className="btn btn-md btn-primary"
							onClick={handleSubmit}
						>
							{state.loading ? (
								<i className="fa fa-refresh fa-spin" />
							) : (
								"Register"
							)}
						</button>
					)}
				</div>
			</div>
			<div className="right">
				<Carousel>
					{item.map((src) => (
						<div key={src}>
							<img src={src} height={400} />
							<h4>Some text here </h4>
							<p>heoihfugkd scidhvgch soCIhj ojp </p>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default Signup;

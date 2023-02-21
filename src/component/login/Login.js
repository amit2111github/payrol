import React from "react";
import { useEffect, useState, useContext } from "react";
import { getCompanyDetails, userLogin } from "../../service/api/auth";
import Carousel from "react-material-ui-carousel";
import "./Login.css";
import { setUser } from "../../service/auth/localstorage";
import { UserContext } from "../../context/user";
import { getCompanyName } from "../../service/api/user";
import { Link } from "react-router-dom";
const Login = () => {
	const [url, setUrl] = useState("/logo.png");
	const userState = useContext(UserContext);
	const companyName = getCompanyName();
	const [initalLoading, setInitalLoading] = useState(false);
	useEffect(() => {
		(async function () {
			setInitalLoading(true);
			setState((old) => ({ ...old, error: false }));
			const data = await getCompanyDetails(companyName);

			setInitalLoading(false);
			if (!data || data.error) {
				setState((old) => ({ ...old, error: data.error }));
				setTimeout(() => {
					window.location.href = "/";
				}, 1000);
				return;
			}
			console.log(data.logo);
			if (data.logo) setUrl(data.logo);
		})();
	}, []);

	const [state, setState] = useState({
		userCode: "",
		password: "",
		loading: false,
		error: false,
		message: false,
	});
	if (userState.user) window.location.href = "/" + companyName + "/dashboard";
	else {
		if (window.location.href.indexOf("dashboard") != -1) {
			window.location.href = "/" + companyName;
		}
	}
	const handleChange = (event) => {
		setState((old) => ({
			...old,
			[event.target.name]: event.target.value,
		}));
	};
	const handleSubmit = async () => {
		if (state.loading) return;
		setState((old) => ({ ...old, loading: true }));
		const data = await userLogin(
			state.userCode.trim(),
			state.password.trim()
		);
		if (data.error) {
			setState((old) => ({
				...old,
				error: data.error,
				message: false,
				loading: false,
			}));
			return;
		}
		setState((old) => ({
			...old,
			error: false,
			loading: false,
			message: "Login Successfully done.",
		}));
		setUser(data, () => {
			userState.setUser(data);
			setTimeout(() => {
				window.location.href = window.location.href + "/dashboard";
			}, 1500);
		});
	};

	const item = [
		"https://orocorp.greythr.com/uas/v1/cms/asset/17042120-a978-4094-b8c9-deeed84dfe7e",
		"https://orocorp.greythr.com/uas/v1/cms/asset/9e451477-0a45-4270-a843-bc1127f792bf",
		"https://orocorp.greythr.com/uas/v1/cms/asset/5fe7bab4-8479-4266-a749-97a7208b7a40",
	];
	return (
		<>
			{!initalLoading && (
				<>
					<div
						className="image-container container pt-2"
						style={{ height: "80px" }}
					>
						<img src={url} width="150px" height="100%" />
					</div>
					<div className="second">
						<div className="left">
							<h5 style={{ color: "#394657" }} className="pt-3">
								Hello there!👋
							</h5>
							<div className="form-group leftForm">
								<p
									className="text-left gg"
									style={{ opacity: 0.7 }}
								>
									User Code
								</p>
								<input
									type="text"
									name="userCode"
									className="form-control"
									id="exampleInputEmail1"
									onChange={handleChange}
									aria-describedby="emailHelp"
									placeholder="user code"
								/>
							</div>
							<div className="form-group leftForm pt-3">
								<div className="d-flex justify-content-between">
									<p
										className="text-left"
										style={{ opacity: 0.7 }}
									>
										Password
									</p>
									<Link
										to="/change-password"
										className="text-decoration-none"
									>
										<p
											style={{
												color: "#388CE0",
												textAlign: "right",
												cursor: "pointer",
											}}
										>
											Forgot password?
										</p>
									</Link>
								</div>

								<input
									type="password"
									name="password"
									className="form-control"
									id="exampleInputEmail1"
									onChange={handleChange}
									aria-describedby="emailHelp"
									placeholder="password"
								/>
							</div>
							{state.error && (
								<p style={{ color: "red" }}>{state.error}</p>
							)}
							{state.message && (
								<p style={{ color: "green" }}>
									{state.message}
								</p>
							)}
							<div className="leftForm d-grid gap-2">
								<button
									className="btn btn-primary loginbutton"
									onClick={handleSubmit}
								>
									{!state.loading ? (
										"Log in"
									) : (
										<i className="fa fa-refresh fa-spin" />
									)}
								</button>
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
				</>
			)}
		</>
	);
};
export default Login;

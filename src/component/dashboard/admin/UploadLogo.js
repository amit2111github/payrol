import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/user";
import { removeUser } from "../../../service/auth/localstorage";
import { uploadFile } from "../../../service/api/auth";
import { changeLogo } from "../../../service/api/admin";
import { setUser as setUser2 } from "../../../service/auth/localstorage";
const UploadLogo = () => {
	const { user, setUser } = useContext(UserContext);
	const [file, setFile] = useState(() => null);
	const [state, setState] = useState(() => ({
		error: false,
		message: false,
		loading: false,
	}));
	const handleFile = (e) => {
		setState((old) => ({ ...old, error: false }));
		setFile(e.target.files[0]);
	};
	const handleUpload = async () => {
		if (state.error) return;
		setState((old) => ({
			...old,
			loading: true,
			message: false,
			error: false,
		}));
		const data = await uploadFile(file);
		if (data.error) {
			setState((old) => ({ ...old, error: data.error, loading: false }));
			return;
		}
		const response = await changeLogo(user.user, user.token, data.url);
		if (response.error) {
			if (response.code === 1) {
				removeUser();
				setUser(null);
			}
			setState((old) => ({
				...old,
				loading: false,
				error: response.error,
			}));
			return;
		}
		setState((old) => ({
			...old,
			loading: false,
		}));
		const g = user.user;
		const newuser = { ...g };
		newuser.company.logo = response.url;
		// consol
		setUser((old) => ({ ...old, user: newuser }));
		setUser2({ token: user.token, user: newuser }, () => {});
	};
	return (
		<div className="csv-form">
			<div className="form-group">
				<input
					type="file"
					className="form-control-file"
					onChange={handleFile}
				/>
				{state.error && (
					<p style={{ color: "red", textAlign: "center" }}>
						{state.error}
					</p>
				)}
				{state.message || (
					<p className="pt-2" style={{ color: "green" }}>
						{state.message}
					</p>
				)}
				<div className="pt-4">
					{!state.error && file && (
						<>
							<button
								className="btn btn-md w-75 btn-primary"
								onClick={handleUpload}
							>
								{state.loading ? (
									<i className="fa fa-refresh fa-spin" />
								) : (
									"Upload"
								)}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default UploadLogo;

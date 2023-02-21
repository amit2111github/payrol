import React, { useRef, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../context/user";
import { uploadFile } from "../../../service/api/auth";
import { updateUserProfile } from "../../../service/api/user";
import { removeUser } from "../../../service/auth/localstorage";
import { setUser as setUser2 } from "../../../service/auth/localstorage";
const Profile = () => {
	let { user, setUser } = useContext(UserContext);
	let token = user.token;
	user = user.user;
	const src = user.profile_picture || "/profile.png";
	const [loading, setLoading] = useState(false);
	const style = {
		borderRadius: "8px",
		boxShadow: "0 4px 10px rgb(0 0 0 / 0.2)",
		margin: "20px",
		width: "90%",
	};
	const handleChange = async () => {
		if (loading) return;
		const file = fileRef?.current?.files[0];
		if (file) {
			setLoading(true);
			let data = await uploadFile(file);
			if (data.error) {
				alert(data.error);
				return;
			}
			const response = await updateUserProfile(user, token, data.url);
			setLoading(false);
			if (response.error) {
				alert(response.error);
				if (response.code == 1) {
					removeUser();
					setUser(null);
				}
				return;
			}
			const newuser = { ...user };
			newuser.profile_picture = response.url;
			setUser((old) => ({ ...old, user: newuser }));
			setUser2({ token, user: newuser }, () => {});
			alert("Profile Pic changed successfully");
		}
	};
	const fileRef = useRef(null);
	return (
		<div className="container" style={{ overflow: "hidden", ...style }}>
			<input
				type="file"
				style={{ display: "none" }}
				ref={fileRef}
				onChange={handleChange}
			/>
			<div className="row p-4">
				<div className="col-3 text-center">
					<div className="w-100">
						<img
							className="rounded"
							src={src}
							width={200}
							height={200}
						/>
					</div>
					<button
						disabled={loading}
						className="btn btn-primary mt-4"
						onClick={() => {
							fileRef.current.click();
						}}
					>
						{loading ? (
							<i className="fa fa-refresh fa-spin" />
						) : (
							"change Profile"
						)}
					</button>
				</div>
				<div className="col-7 offset-1">
					<div className="d-flex justify-content-center">
						<p className="w-50 ml-4">Name</p>
						<p className="w-50">{user.name}</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">User Code</p>
						<p className="w-50">{user.user_code}</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">Email</p>
						<p className="w-50 text-nowrap">{user.email}</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">Gender</p>
						<p className="w-50 text-nowrap">{user.gender}</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">Phone No.</p>
						<p className="w-50 text-nowrap">{user.phone_number}</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">Department</p>
						<p className="w-50 text-nowrap">
							{user?.department_as?.name || "NA"}
						</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">Joning Date</p>
						<p className="w-50 text-nowrap">{user.joning_date}</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">Employe Type</p>
						<p className="w-50 text-nowrap">
							{user?.employee_type_as?.name || "NA"}
						</p>
					</div>
					<div className="d-flex justify-content-center">
						<p className="w-50">Role</p>
						<p className="w-50">{user.role}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

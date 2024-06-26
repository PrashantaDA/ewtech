import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../reduxtoolkit/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../reduxtoolkit/api/usersApiSlice";

const Profile = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { userInfo } = useSelector((state) => state.auth);
	const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

	useEffect(() => {
		setUsername(userInfo.username);
		setEmail(userInfo.email);
	}, [userInfo.email, userInfo.username]);

	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile updated successfully");
			} catch (error) {
				toast.error(error?.data?.message || error.message);
			}
		}
	};

	return (
		<div className="md:container mx-auto p-4 mt-[3rem]">
			<div className="w-full flex justify-center align-center  md:space-x-4">
				<div className="sm:w-3/4 md:w-1/2">
					<h2 className="text-2xl font-semibold mb-8 text-center">Profile Details</h2>

					{/* FORM ELEMENT */}
					<form onSubmit={submitHandler}>
						<div className="mb-4">
							<label
								htmlFor="username"
								className="block text-[#f8f7f4] mb-2"
							>
								Username
							</label>
							<input
								type="text"
								placeholder="Enter your username"
								className="form-input p-2 rounded-sm w-full"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-[#f8f7f4] mb-2"
							>
								Email Address
							</label>
							<input
								type="email"
								placeholder="Enter your email address"
								className="form-input p-2 rounded-sm w-full"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-[#f8f7f4] mb-2"
							>
								Password
							</label>
							<input
								type="password"
								placeholder="Enter your password"
								className="form-input p-2 rounded-sm w-full"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="confirmPassword"
								className="block text-[#f8f7f4] mb-2"
							>
								Confirm Password
							</label>
							<input
								type="text"
								placeholder="Confirm password"
								className="form-input p-2 rounded-sm w-full"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<div className="flex justify-between">
							<button
								type="submit"
								className="text-[#f8f7f4] bg-[#ea6e38] py-2 px-4 rounded hover:bg-[#d15f2e] sm:mr-2 md:mr-0
                        "
							>
								Update
							</button>
							<Link
								to="/user-orders"
								className="text-[#f8f7f4] bg-[#ea6e38] py-2 px-4 rounded hover:bg-[#d15f2e]"
							>
								My Orders
							</Link>
						</div>
					</form>
				</div>

				{loadingUpdateProfile && <Loader />}
			</div>
		</div>
	);
};

export default Profile;

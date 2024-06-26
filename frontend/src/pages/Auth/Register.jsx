import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../reduxtoolkit/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../reduxtoolkit/api/usersApiSlice";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await register({ username, email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate(redirect);
				toast.success("User registered successfully");
			} catch (error) {
				console.log(error);
				toast.error(error.data.message);
			}
		}
	};

	return (
		<section className=" w-full mx-auto md:pl-[10rem] sm:pl-[4rem] flex flex-wrap ">
			<div className="w-full mr-[4rem] lg:mt-[4rem] sm:mt-[2.5rem]">
				<h1 className="text-2xl font-semibold mb-4">Register</h1>

				<form
					onSubmit={submitHandler}
					className=" md:container md:w-[30rem] sm:w-full "
				>
					<div className="my-[2rem]">
						<label
							htmlFor="username"
							className="block text-sm font-medium "
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							className="mt-1 p-2 border rounded w-full "
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="my-[2rem]">
						<label
							htmlFor="email"
							className="block text-sm font-medium "
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 p-2 border rounded w-full "
							placeholder="Enter your email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="my-[2rem]">
						<label
							htmlFor="password"
							className="block text-sm font-medium "
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="mt-1 p-2 border rounded w-full "
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="my-[2rem]">
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium "
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							className="mt-1 p-2 border rounded w-full "
							placeholder="Confirm  password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					<button
						disabled={isLoading}
						type="submit"
						className="bg-[#ea6e38] text-[#f8f7f4] px-4 py-2 rounded cursor-pointer my-[1rem]"
					>
						{isLoading ? "Registering..." : "Register"}
					</button>
					{isLoading && <Loader />}
				</form>

				<div className="mt-2">
					<p className="text-[#f8f7f4]">
						Already have an account ? {"  "}
						<Link
							to={redirect ? `/login?redirect=${redirect}` : "/login"}
							className="text-[#ea6e38] hover:underline"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Register;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../reduxtoolkit/api/usersApiSlice";
import { setCredentials } from "../../reduxtoolkit/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
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

		try {
			const res = await login({ email, password }).unwrap();
			dispatch(setCredentials(res));
			navigate(redirect);
		} catch (error) {
			toast.error(error?.data?.message || error.message);
		}
	};

	return (
		<div>
			<section className="w-full mx-auto md:pl-[10rem] sm:pl-[4rem] flex ">
				<div className="w-full mr-[4rem] mt-[5rem]">
					<h1 className="text-2xl font-semibold mb-4">Sign In</h1>

					<form
						onSubmit={submitHandler}
						className="md:container md:w-[30rem] sm:w-full "
					>
						<div className="my-[2rem]">
							<label
								htmlFor="email"
								className="block 	text-sm
								font-medium"
							>
								Email Address
							</label>
							<input
								type="email"
								name="email"
								id="email"
								className="mt-2 p-2 border rounded w-full"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="my-[2rem]">
							<label
								htmlFor="password"
								className="block 	text-sm
								font-medium"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="mt-2 p-2 border rounded w-full"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							disabled={isLoading}
							type="submit"
							className="bg-[#ea6e38] text-[#f8f7f4] px-4 py-2 rounded cursor-pointer my-[1rem]"
						>
							{isLoading ? "Signing In..." : "Sign In"}
						</button>

						{isLoading && <Loader />}
					</form>

					<div className="mt-4">
						<p className="text-[#f8f7f4]">
							New Customer ? {"  "}
							<Link
								to={redirect ? `/register?redirect=${redirect}` : "/register"}
								className="text-[#ea6e38] hover:underline"
							>
								Create your Account
							</Link>
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;

import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart, AiOutlineShop } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./Navigation.css";

import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../reduxtoolkit/api/usersApiSlice";
import { logout } from "../../reduxtoolkit/features/auth/authSlice";

// MAIN COMPONENT
const Navigation = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const closeSidebar = () => {
		setShowSidebar(false);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			style={{ zIndex: 999 }}
			onMouseLeave={() => setDropdownOpen(false)}
			className={`${
				showSidebar ? "hidden" : "flex"
			} lg:flex sm:hidden flex-col  justify-between p-4 text-[#F8F7F4] bg-[#222] w-[4%] xxl:w-[2.5%] hover:w-[12%] xxl:hover:w-[10%] h-[100vh] fixed`}
			id="navigation-container"
		>
			{/* MENU ITEMS */}
			<div className="flex flex-col justify-center space-y-2 text-sm">
				<Link
					to="/"
					className="flex items-center transition-transform transform hover:translate-x-1"
				>
					<AiOutlineHome
						className="nav-icons mt-[3rem]"
						size={20}
					/>
					<span className="hidden nav-item-name mt-[3rem]">Home</span>
				</Link>

				<Link
					to="/shop"
					className="flex items-center transition-transform transform hover:translate-x-1"
				>
					<AiOutlineShop
						className="nav-icons mt-[3rem]"
						size={20}
					/>
					<span className="hidden nav-item-name mt-[3rem]">Shop</span>
				</Link>

				<Link
					to="/cart"
					className="flex items-center transition-transform transform hover:translate-x-1"
				>
					<AiOutlineShoppingCart
						className="nav-icons mt-[3rem]"
						size={20}
					/>
					<span className="hidden nav-item-name mt-[3rem]">Cart</span>
				</Link>

				<Link
					to="/favorite"
					className="flex items-center transition-transform transform hover:translate-x-1"
				>
					<FaHeart
						className="nav-icons mt-[3rem]"
						size={20}
					/>
					<span className="hidden nav-item-name mt-[3rem]">Favorites</span>
				</Link>
			</div>

			<div className="relative">
				<button
					onClick={toggleDropdown}
					className="flex items-center text-gray-800 focus:outline-none"
				>
					{userInfo ? (
						<>
							<CgProfile
								size={20}
								className="profile-icon"
							/>
							<span className="text-[#f8f7f4] nav-item-name">{userInfo.username}</span>
						</>
					) : (
						<></>
					)}

					{userInfo && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`nav-item-name h-4 w-4 ml-1 ${dropdownOpen ? "transform rotate-180" : ""}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="white"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
							/>
						</svg>
					)}
				</button>

				{dropdownOpen && userInfo && (
					<ul className={`absolute -right-[45px] mt-2 mr-14 space-y-2 bg-[#f8f7f4] text-gray-600 ${!userInfo.isAdmin ? "-top-[100px]" : "-top-[350px]"}`}>
						{userInfo.isAdmin && (
							<>
								<li>
									<Link
										to={"/admin/dashboard"}
										className="block px-4 py-2 hover:bg-gray-400 "
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										to={"/admin/allproductslist"}
										className="block px-4 py-2 hover:bg-gray-400 "
									>
										Products
									</Link>
								</li>
								<li>
									<Link
										to={"/admin/categorylist"}
										className="block px-4 py-2 hover:bg-gray-400 "
									>
										Category
									</Link>
								</li>
								<li>
									<Link
										to={"/admin/orderlist"}
										className="block px-4 py-2 hover:bg-gray-400 "
									>
										Orders
									</Link>
								</li>
								<li>
									<Link
										to={"/admin/userlist"}
										className="block px-4 py-2 hover:bg-gray-400 "
									>
										Users
									</Link>
								</li>
							</>
						)}
						<li>
							<Link
								to={"/profile"}
								className="block px-4 py-2 hover:bg-gray-400 "
							>
								Profile
							</Link>
						</li>
						<li>
							<button
								type="button"
								onClick={logoutHandler}
								className="block px-4 py-2 w-full hover:bg-gray-400 "
							>
								Logout
							</button>
						</li>
					</ul>
				)}
			</div>

			{/* LOGIN and REGISTER */}
			{!userInfo && (
				<ul>
					<li className="text-sm">
						<Link
							to="/login"
							className="flex items-center transition-transform transform hover:translate-x-1"
						>
							<AiOutlineLogin
								className="mr-2 mt-[3rem]"
								size={20}
							/>
							<span className="hidden nav-item-name mt-[3rem]">Login</span>
						</Link>
					</li>
					<li className="text-sm">
						<Link
							to="/register"
							className="flex items-center transition-transform transform hover:translate-x-1"
						>
							<AiOutlineUserAdd
								className="mr-2 mt-[3rem]"
								size={20}
							/>
							<span className="hidden nav-item-name mt-[3rem]">Register</span>
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
};

export default Navigation;

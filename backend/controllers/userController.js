import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/createToken.js';

// Create User

const createUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;

	// Validation
	if (!username || !email || !password) {
		throw new Error('Please fill all the fields');
	}

	// Check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) res.status(400).send('User already exists');

	// Hash Password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// New User
	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		// generateToken(res, newUser._id);

		res.status(201).json({
			_id: newUser._id,
			username: newUser.username,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
		});
	} catch (error) {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check if user exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		const isPasswordValid = await bcrypt.compare(password, existingUser.password);

		if (isPasswordValid) {
			generateToken(res, existingUser._id);

			res.status(201).json({
				_id: existingUser._id,
				username: existingUser.username,
				email: existingUser.email,
				isAdmin: existingUser.isAdmin,
			});
		}
	}
});

// Logout Current User

const logoutCurrentUser = asyncHandler(async (req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: 'User logged out successfully' });
});

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// Update Current User Profile

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = await bcrypt.hash(req.body.password, 10);
		}
		const updatedUser = await user.save();
		res.status(200).json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const deleteUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		if (user.isAdmin) {
			res.status(400);
			throw new Error('Admin User cannot be deleted');
		}
		await User.deleteOne({ _id: user._id });
		res.status(200).json({ message: 'User removed successfully' });
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const updateUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;
		user.isAdmin = Boolean(req.body.isAdmin);
		const updatedUser = await user.save();
		res.status(200).json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export {
	createUser,
	loginUser,
	logoutCurrentUser,
	getAllUsers,
	getCurrentUserProfile,
	updateCurrentUserProfile,
	deleteUserById,
	getUserById,
	updateUserById,
};

import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.ATLAS_URI);
		console.log(`Successfully connnected to mongoDB 👍`);
	} catch (err) {
		console.log(`ERROR: ${err.message}`);
		process.exit(1);
	}
};

export default connectDB;

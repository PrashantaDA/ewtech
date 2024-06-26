// eslint-disable-next-line react/prop-types
const CategoryForm = ({ value, setValue, handleSubmit, buttonText = "Submit", handleDelete }) => {
	return (
		<div className="p-3">
			<form
				onSubmit={handleSubmit}
				className="space-y-3"
			>
				<input
					type="text"
					className="py-3 px-4 border rounded-lg w-full bg-[#f8f7f4] text-[#07080b] "
					placeholder="Write category name"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>

				<div className="flex justify-between">
					<button className="bg-[#ea6e38] text-[#f8f7f4] py-2 px-4 rounded-lg hover:bg-[#af522a] focus:outline-none focus:ring-2 focus:ring-[#ea6e38] focus:ring-opacity-50">
						{buttonText}
					</button>

					{handleDelete && (
						<button
							onClick={handleDelete}
							className="bg-red-500 text-[#f8f7f4] py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
						>
							Delete
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default CategoryForm;

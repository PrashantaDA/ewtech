import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../reduxtoolkit/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../reduxtoolkit/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
	const [image, setImage] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [quantity, setQuantity] = useState("");
	const [brand, setBrand] = useState("");
	const [stock, setStock] = useState(0);
	const [imageUrl, setImageUrl] = useState(null);

	const navigate = useNavigate();

	const [uploadProductImage] = useUploadProductImageMutation();
	const [createProduct] = useCreateProductMutation();
	const { data: categories } = useFetchCategoriesQuery();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const productData = new FormData();
			productData.append("image", image);
			productData.append("name", name);
			productData.append("description", description);
			productData.append("price", price);
			productData.append("category", category);
			productData.append("quantity", quantity);
			productData.append("brand", brand);
			productData.append("countInStock", stock);

			const { data } = await createProduct(productData);

			if (data.error) {
				toast.error("Product create failed. Try Again.");
			} else {
				toast.success(`${data.name} is created`);
				navigate("/");
			}
		} catch (error) {
			console.error(error);
			toast.error("Product create failed. Try Again.");
		}
	};

	const uploadFileHandler = async (e) => {
		const formData = new FormData();
		formData.append("image", e.target.files[0]);

		try {
			const res = await uploadProductImage(formData).unwrap();
			console.log(res);
			toast.success(res.message);
			setImage(res.image);
			setImageUrl(res.image);
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<div className="md:container xl:mx-[5rem]  sm:mx-auto">
			<div className="flex flex-col md:flex-row w-full mx-auto ">
				<AdminMenu />
				<div className="md:w-3/4 p-3 mx-auto sm:w-4/5 xxl:w-4/5 ]">
					<div className="h-12 text-xl mb-8">Create Product</div>

					{imageUrl && (
						<div className="text-center mb-2">
							<img
								src={imageUrl}
								alt="product"
								className="block mx-auto max-h-[200px] max-w-[400px]"
							/>
						</div>
					)}

					<div className="mb-3">
						<label className="border text-[#f8f7f4] px-4 block w-3/4 text-center rounded-lg cursor-pointer font-bold py-11 mx-auto">
							{image ? image.name : "Upload Image"}
							<input
								type="file"
								name="image"
								accept="image/*"
								onChange={uploadFileHandler}
								className={!image ? "hidden" : "text-[#f8f7f4]"}
							/>
						</label>
					</div>

					<div className="p-3">
						<div className="flex flex-wrap justify-between md:justify-center xl:justify-evenly gap-2 sm:flex-col md:flex-row">
							<div className="one">
								<label htmlFor="name">Name</label> <br />
								<input
									type="text"
									className="mt-2 p-4 mb-3 sm:w-full md:w-[30rem] border rounded-lg bg-[#07080b] text-[#f8f7f4]"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="two ">
								<label htmlFor="name block">Price</label> <br />
								<input
									type="number"
									className="mt-2 p-4 mb-3 sm:w-full md:w-[30rem] border rounded-lg bg-[#07080b] text-[#f8f7f4]"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap justify-between md:justify-center xl:justify-evenly gap-2 sm:flex-col md:flex-row">
							<div className="one">
								<label htmlFor="name block">Quantity</label> <br />
								<input
									type="number"
									className="mt-2 p-4 mb-3 sm:w-full md:w-[30rem] border rounded-lg bg-[#07080b] text-[#f8f7f4]"
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
								/>
							</div>
							<div className="two ">
								<label htmlFor="name block">Brand</label> <br />
								<input
									type="text"
									className="mt-2 p-4 mb-3 sm:w-full md:w-[30rem] border rounded-lg bg-[#07080b] text-[#f8f7f4]"
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-col md:w-[30rem] md:mx-auto xxl:w-[80%] xl:w-full  xxl:mx-auto">
							<label
								htmlFor=""
								className=""
							>
								Description
							</label>
							<textarea
								type="text"
								className="h-14 mt-2 p-2 mb-3 bg-[#07080b]  border rounded-lg sm:w-full    text-[#f8f7f4] "
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
						</div>

						<div className="flex flex-wrap justify-between md:justify-center xl:justify-evenly gap-2 sm:flex-col md:flex-row">
							<div>
								<label htmlFor="name block">Count In Stock</label> <br />
								<input
									type="number"
									className="mt-2 p-4 mb-3 sm:w-full md:w-[30rem] border rounded-lg bg-[#07080b] text-[#f8f7f4]"
									value={stock}
									onChange={(e) => setStock(e.target.value)}
								/>
							</div>

							<div>
								<label htmlFor="">Category</label> <br />
								<select
									defaultValue={"DEFAULT"}
									className="mt-2 p-4  mb-3 sm:w-full md:w-[30rem] border rounded-lg bg-[#07080b] text-[#f8f7f4] cursor-pointer"
									onChange={(e) => setCategory(e.target.value)}
								>
									<option
										value="DEFAULT"
										disabled
									>
										Select Category
									</option>
									{categories?.map((c) => (
										<option
											key={c._id}
											value={c._id}
										>
											{c.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="flex  justify-center">
							<button
								onClick={handleSubmit}
								className="py-4 px-10 mt-6 rounded-lg text-lg font-bold bg-[#ea6e38] text-[#f8f7f4] hover:bg-[#af522a]"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;

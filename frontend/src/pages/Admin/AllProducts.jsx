import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../reduxtoolkit/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
	const { data: products, isLoading, isError } = useAllProductsQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading products</div>;
	}

	return (
		<>
			<div className="md:container sm:mx-auto xl:mx-[9rem]">
				<div className="flex flex-col lg:flex-row">
					<div className="p-3">
						<div className="ml-[2rem] text-xl font-bold h-12 mb-4">All Products ({products.length})</div>
						<div className="flex flex-wrap sm:justify-center  gap-4  xl:flex-row lg:justify-between lg:ml-20 xl:ml-auto">
							{products.map((product) => (
								<Link
									key={product._id}
									to={`/admin/product/update/${product._id}`}
									className="block mb-4 overflow-hidden"
								>
									<div className="flex sm:flex-col sm:items-start lg:items-center xl:flex-row ">
										<img
											src={product.image}
											alt={product.name}
											className="sm:w-[20rem] sm:h-[12rem]  lg:w-[18rem] xl:w-[15rem] object-contain self-center "
										/>
										<div className="p-4 flex flex-col justify-around">
											<div className="flex sm:flex-col xl:flex-row justify-between sm:mb-2 xl:mb-0">
												<h5 className="text-xl font-semibold mb-2">{product?.name}</h5>

												<p className="text-gray-400 text-xs ">{moment(product.createdAt).format("MMMM Do YYYY")}</p>
											</div>

											<p className="text-gray-400 xl:w-[22rem] lg:w-[20rem] md:w-[16rem] sm:w-[8rem] text-sm mb-4 sm:hidden lg:flex">
												{product?.description?.substring(0, 160)}...
											</p>

											<div className="flex sm:flex-col  lg:flex-row sm:items-start lg:items-center  justify-between">
												<p className="font-semibold text-xl sm:mb-4 lg:mb-0">$ {product?.price}</p>
												<div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#ea6e38] rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
													Update Product
													<svg
														className="w-3.5 h-3.5 ml-2"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 14 10"
													>
														<path
															stroke="currentColor"
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M1 5h12m0 0L9 1m4 4L9 9"
														/>
													</svg>
												</div>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
					<div className="md:w-1/4 p-3 mt-2">
						<AdminMenu />
					</div>
				</div>
			</div>
		</>
	);
};

export default AllProducts;

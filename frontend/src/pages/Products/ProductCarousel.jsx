import { useGetTopProductsQuery } from "../../reduxtoolkit/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
	const { data: products, isLoading, error } = useGetTopProductsQuery();

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	return (
		<div className="mb-4 lg:block xl:block md:block">
			{isLoading ? null : error ? (
				<Message variant="danger">{error?.data?.message || error.error}</Message>
			) : (
				<Slider
					{...settings}
					className="lg:w-[45rem] xl:w-[40rem] md:w-[56rem] sm:w-[40rem] sm:block"
				>
					{products.map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
						<div key={_id}>
							<img
								src={image}
								alt={name}
								className="w-[38rem] rounded-lg object-contain h-[20rem]"
							/>

							<div className="mt-4 flex justify-between gap-10">
								<div className="one">
									<h2>{name}</h2>
									<p> $ {price}</p> <br /> <br />
									<p className="w-[25rem] mt-[-40px]">{description.substring(0, 150)} ...</p>
								</div>

								<div className="flex justify-between w-[22rem]">
									<div className="one">
										<h1 className="flex items-center mb-6">
											<FaStore className="mr-2 text-white" /> Brand: {brand}
										</h1>
										<h1 className="flex items-center mb-6">
											<FaClock className="mr-2 text-white" /> Added: {moment(createdAt).fromNow()}
										</h1>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>
			)}
		</div>
	);
};

export default ProductCarousel;

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="fixed inset-0 bg-[#07080b] opacity-50"></div>
					<div className="absolute top-[25%] right-[50%] translate-x-[50%] translate-y-[25%] bg-[#f8f7f4] p-4 rounded-lg z-10 text-right">
						<button
							className="text-[#07080b] font-semibold hover:gray-700 focus:outline-none mr-2"
							onClick={onClose}
						>
							X
						</button>
						{children}
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;

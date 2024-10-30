import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import { assets } from "../Assests/assets";

const PopupBanner = ({isVisible, onClose}) => {
  // const [isVisible, setIsVisible] = useState(false);

	if (!isVisible) return null;

  // useEffect(() => {
  //   setIsVisible(true);
	// 	onOpen();
  // }, [onOpen]);

  // const closePopup = () => {
	// 	console.log("Close button clicked");
		
  //   setIsVisible(false);
	// 	onClose();
  // };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
			<div className="bg-transparent w-[400px] p-2 rounded-sm text-center relative">
				<button onClick={onClose}>
					<IoCloseCircle color="white" size={40} className="absolute top-2 right-2 cursor-pointer"/>
				</button>
				<img src={assets.popup_banner} alt="" style={{filter: "drop-shadow(0 0 10rem black)"}}/>
			</div>
    </div>
  )
};

export default PopupBanner;

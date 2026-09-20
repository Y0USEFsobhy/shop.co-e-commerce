import { FaArrowUp } from "react-icons/fa";
function ScrollUpBtn({onClick,showUpBtn}) {
  
  return (
    <button
      className={`${showUpBtn ? "right-6 " : "-right-40 "} duration-700 cursor-pointer fixed bottom-5  bg-black  rounded-lg text-white p-3 `}
      onClick={onClick}
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollUpBtn;

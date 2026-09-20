import { FaPlus, FaMinus } from "react-icons/fa6";
function Counter({minusBtn,plusBtn,quantityNumber,editStyel}){
    return(
        <div className={`px-5 py-2 bg-gray-200 md:w-1/3 w-1/2 flex justify-between items-center rounded-full text-lg transition ${editStyel}`}>
        <button className="cursor-pointer" onClick={minusBtn}>
          <FaMinus />
        </button>
        <span>{quantityNumber}</span>
        <button className="cursor-pointer"  onClick={plusBtn}>
          <FaPlus />
        </button>
      </div>
    )
}
export default Counter
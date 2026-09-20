import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import Counter from "../Hooks/Counter";
import { useNavigate } from "react-router-dom";

function CartItem({
  id,
  cartItemId,
  image,
  title,
  size,
  quantity,
  oldPrice,
  newPrice,
  category,
  discount,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="py-2 flex gap-2 md:gap-7 not-last:border-b-2  border-[#e6e6e6]">
      <div
        className="w-30 min-w-28 h-35 md:w-35 md:h-40 lg:w-45 lg:h-45 cursor-pointer "
        onClick={() => navigate(`../${category}/${id}`)}
      >
        <img className="rounded-lg w-full h-full" src={image} alt="img" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between">
            <h2 className="text-sm md:text-xl lg:text-2xl lg:my-1 w-[90%]">
              {title}
            </h2>
            <MdOutlineDelete
              className="text-2xl text-red-600 lg:my-2 cursor-pointer"
              onClick={() => dispatch(removeFromCart(cartItemId))}
            />
          </div>
          <p className="text-black text-sm md:text-md md:my-1">
            Size : <span className="text-gray-500 ">{size}</span>
          </p>
          <p className="text-black text-sm md:text-md md:my-1">
            quantity : <span className="text-gray-500 ">{quantity}</span>
          </p>
        </div>
        <div className="flex items-center justify-between md:text-xl font-bold">
          <div className="flex flex-col">
            {discount === "" ? (
              <div className="">{oldPrice} EGP</div>
            ) : (
              <div className="space-y-3.5 flex flex-col md:flex-row">
                <span className="line-through text-[#b3b3b3] mr-5">{oldPrice} EGP</span>
                {newPrice} EGP
              </div>
            )}
          </div>
          <Counter
            plusBtn={() => dispatch(incrementQuantity(cartItemId))}
            minusBtn={() => dispatch(decrementQuantity(cartItemId))}
            quantityNumber={quantity}
            editStyel="py-0"
          />
        </div>
      </div>
      {/* <hr className="text-gray-600 h-10"></hr> */}
    </div>
  );
}
export default CartItem;

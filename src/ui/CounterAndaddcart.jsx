import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";
import Counter from "../Hooks/Counter";
import toast from "react-hot-toast";
function CounterAndaddcart({ product, selectedSize }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const disableBtn = selectedSize === "";
  function handleAddtoCart() {
    if (disableBtn) {
      toast.error("Choose a size");
    } else {
      dispatch(
        addToCart({ ...product, size: selectedSize, quantity: quantity }),
      );
    }
  }

  return (
    <div className="flex md:gap-5 gap-2">
      <Counter
        minusBtn={() => (quantity <= 1 ? quantity : setQuantity(quantity - 1))}
        plusBtn={() => quantity < 10 && setQuantity(quantity + 1)}
        quantityNumber={quantity}
      />
      <button
        // onClick={() => dispach(addToCart({ ...product, size: selectedSize ,quantity:quantity }))}
        // disabled={disableBtn}
        type="button"
        onClick={handleAddtoCart}
        className="md:px-10 md:py-3 px-6 py-2 cursor-pointer bg-black text-white rounded-full md:w-full w-1/2 "
      >
        Add to Cart
      </button>
    </div>
  );
}
export default CounterAndaddcart;

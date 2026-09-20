import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDeliveryFee, getOrderTotal } from "../utils/orderTotals";

function OrderSummary() {
  const cart = useSelector((state) => state.cart);
  const discountValue = cart.discountValue;
  const subtotal = cart.totalPrice;
  const DeliveryFee = getDeliveryFee(cart);
  const totalOrder = getOrderTotal(cart);
  const hasItems = cart.items.length > 0;
  return (
    <div className="my-4 flex h-fit flex-col rounded-2xl border-2 border-[#e6e6e6] p-3 px-4 md:my-0 md:w-[30%]">
      <h1 className="mb-4 font-bold md:text-xl">Order Summery</h1>
      <div className="space-y-3">
        <p className="md:text-md flex justify-between py-1 text-sm font-normal text-[#666666] lg:text-lg">
          Subtotal <span className="font-bold text-black">{subtotal} EGP</span>
        </p>
        <p className="md:text-md flex justify-between py-1 text-sm font-normal text-[#666666] lg:text-lg">
          Discount
          <span className="font-bold text-black">
            {discountValue === 0 ? 0 : -discountValue.toFixed(0)} EGP
          </span>
        </p>
        {totalOrder != 0 && (
          <p className="md:text-md flex justify-between pt-1 text-sm font-normal text-[#666666] lg:text-lg">
            Delivery Fee{" "}
            <span className="font-bold text-black">{DeliveryFee} EGP</span>
          </p>
        )}
        <p className="md:text-md flex justify-between border-t border-[#e6e6e6] py-1 pt-4 text-sm font-normal text-[#666666] lg:text-lg">
          Total{" "}
          <span className="font-bold text-black">
            {totalOrder.toFixed(0)} EGP
          </span>
        </p>
      </div>
      {hasItems && (
        <Link
          to="/checkout"
          className="mt-4 w-full rounded-full bg-black py-3 text-center font-medium text-white transition-opacity hover:opacity-90"
        >
          Proceed to checkout
        </Link>
      )}
    </div>
  );
}
export default OrderSummary;

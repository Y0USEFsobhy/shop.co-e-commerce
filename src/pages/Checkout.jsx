import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart } from "../features/cart/cartSlice";
import OrderSummary from "../ui/OrderSummary";
import { getOrderTotal } from "../utils/orderTotals";

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  if (!cart.items.length && !isProcessing) {
    return <Navigate to="/cart" replace />;
  }

  const totalOrder = getOrderTotal(cart);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function formatCardNumber(value) {
    return value.replace(/\D/g, "").slice(0, 16);
  }

  function formatExpiry(value) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function formatCvv(value) {
    return value.replace(/\D/g, "").slice(0, 3);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter the cardholder name");
      return;
    }
    if (form.cardNumber.length !== 16) {
      toast.error("Card number must be 16 digits");
      return;
    }
    if (form.expiry.length !== 5) {
      toast.error("Please enter a valid expiry date (MM/YY)");
      return;
    }
    if (form.cvv.length !== 3) {
      toast.error("CVV must be 3 digits");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
      navigate("/order-success", { state: { orderId, total: totalOrder } });
      dispatch(clearCart());
    }, 2000);
  }

  return (
    <div
      className="relative z-1 my-5 w-full p-2 after:absolute after:-top-5 after:left-1/2 after:h-px after:w-[90%] after:-translate-x-1/2 after:bg-gray-400 after:content-[''] md:px-12 lg:px-24"
    >
      <div className="mb-3 ml-2 flex items-center gap-2">
        <Link
          to="/cart"
          className="text-sm text-[#666666] transition-colors hover:text-black md:text-base"
        >
          Cart
        </Link>
        <span className="text-[#666666]">/</span>
        <span className="text-sm font-medium md:text-base">Checkout</span>
      </div>

      <h1 className="mb-3 ml-2 text-2xl font-bold md:text-4xl">Checkout</h1>

      <div className="gap-5 md:flex">
        <form
          onSubmit={handleSubmit}
          className="flex h-fit flex-col rounded-2xl border-2 border-[#e6e6e6] px-4 py-5 md:w-[70%]"
        >
          <h2 className="mb-4 font-bold md:text-xl">Payment details</h2>
          <p className="mb-5 text-sm text-[#666666] md:text-base">
            This is a demo checkout. No real payment will be processed.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-[#666666]"
              >
                Cardholder name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border-2 border-[#e6e6e6] px-4 py-2.5 outline-none focus:border-black"
              />
            </div>

            <div>
              <label
                htmlFor="cardNumber"
                className="mb-1 block text-sm font-medium text-[#666666]"
              >
                Card number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                value={form.cardNumber}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    cardNumber: formatCardNumber(e.target.value),
                  }))
                }
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-xl border-2 border-[#e6e6e6] px-4 py-2.5 outline-none focus:border-black"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="expiry"
                  className="mb-1 block text-sm font-medium text-[#666666]"
                >
                  Expiry
                </label>
                <input
                  id="expiry"
                  name="expiry"
                  type="text"
                  inputMode="numeric"
                  value={form.expiry}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      expiry: formatExpiry(e.target.value),
                    }))
                  }
                  placeholder="MM/YY"
                  className="w-full rounded-xl border-2 border-[#e6e6e6] px-4 py-2.5 outline-none focus:border-black"
                />
              </div>

              <div className="w-28">
                <label
                  htmlFor="cvv"
                  className="mb-1 block text-sm font-medium text-[#666666]"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  inputMode="numeric"
                  value={form.cvv}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      cvv: formatCvv(e.target.value),
                    }))
                  }
                  placeholder="123"
                  className="w-full rounded-xl border-2 border-[#e6e6e6] px-4 py-2.5 outline-none focus:border-black"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="mt-6 w-full cursor-pointer rounded-full bg-black px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing
              ? "Processing payment..."
              : `Pay ${totalOrder.toFixed(0)} EGP`}
          </button>
        </form>

        <OrderSummary />
      </div>
    </div>
  );
}

export default Checkout;

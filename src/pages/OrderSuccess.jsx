import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";

function OrderSuccess() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { orderId, total } = location.state || {};

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f8ee] text-3xl">
        ✓
      </div>
      <h1 className="mb-2 text-2xl font-bold md:text-4xl">Payment successful!</h1>
      <p className="mb-1 text-[#666666] md:text-lg">
        Thank you for your order. This was a demo payment — no charge was made.
      </p>
      <p className="mb-1 text-sm text-[#666666] md:text-base">
        Order ID: <span className="font-medium text-black">{orderId}</span>
      </p>
      <p className="mb-8 text-sm text-[#666666] md:text-base">
        Total paid: <span className="font-bold text-black">{total} EGP</span>
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 md:text-base"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;

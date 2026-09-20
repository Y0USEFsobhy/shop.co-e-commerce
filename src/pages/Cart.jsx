import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../ui/CartItem";
import OrderSummary from "../ui/OrderSummary";

function Cart() {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="p-2 my-5 md:px-12 lg:px-24 w-full
       relative
  after:content-[''] after:absolute after:-top-5  after:left-1/2 
  after:w-[90%] after:h-px after:bg-gray-400 after:-translate-x-1/2
  z-1
 ">
      <h1 className="md:text-4xl text-2xl ml-2 font-bold my-5 ">Your cart</h1>
      <div className="md:flex gap-5  ">
        <div className="flex flex-col px-2 border-2 border-[#e6e6e6] rounded-2xl md:w-[70%] h-fit ">
          <div className="flex flex-col gap-0">
            {!cart.items || cart.items.length === 0 ? (
              <div className="min-h-50 flex flex-col gap-5 justify-center items-center">
              <div className=" p-5 text-black text-center md:text-lg flex justify-center items-center">Looks like you haven't added any items yet.</div>
              <Link to="/" className="bg-black text-white rounded-full p-3">Browse products</Link>
              </div>
            ) : (
              cart.items.map((item) => (
                <CartItem
                  key={item.cartItemId}
                  id={item.id}
                  cartItemId={item.cartItemId}
                  image={item.image}
                  title={item.title}
                  size={item.size}
                  oldPrice={item.oldPrice}
                  quantity={item.quantity}
                  newPrice={item.newPrice}
                  category={item.category}
                  discount={item.discount}
                />
              ))
            )}
          </div>
        </div>
        <OrderSummary />
      </div>
    </div>
  );
}
export default Cart;

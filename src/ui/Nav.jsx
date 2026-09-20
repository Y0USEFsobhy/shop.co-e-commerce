import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoCart,IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useSearchParams,
  useLocation,
  useParams,
} from "react-router-dom";

function Nav() {
  const cart = useSelector((state) => state.cart);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();


  const location = useLocation();

  const handelChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      if (value === "") {
        next.delete("search");
      } else {
        next.set("search", value);
      }
      next.set("page", 1);
      return next;
    });
  };
  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handelChange(e);
  }
};

  const { category, id } = useParams();

  const isCartPage =
    location.pathname === "/cart" ||
    location.pathname === "/checkout" ||
    location.pathname === `/${category}/${id}` ||
    location.pathname === `/`;

  return (
    <div>
      <div>
        <div className="flex  bg-white flex-row items-center justify-between px-3 pt-1 pb-1.5 md:px-24 md:py-4">
          <div className="flex items-center">
            <IoMenu
              onClick={() => setMobileMenu(!mobileMenu)}
              className={`${mobileMenu ? "rotate-90 duration-300 " : ""} mr-4 block text-3xl duration-300 md:hidden`}
            />
            <h1 className="text-2xl font-bold uppercase md:text-3xl">
              <Link to={"/"}>Shop.co</Link>
            </h1>

          </div>
                      <ul className={`text-md hidden list-none gap-6 md:flex`}>
              <li>
                <NavLink className={({ isActive }) => isActive ? "font-bold underline" : "normal-text"} to={"/men"}>Men</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "font-bold underline" : "normal-text"} to={"/women"}>Women</NavLink>
              </li>

              <li>
                <NavLink className={({ isActive }) => isActive ? "font-bold underline" : "normal-text"} to={"/boys"}>Boys</NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "font-bold underline" : "normal-text"} to={"/girls"}>Girls</NavLink>
              </li>
            </ul>
          <div>
            <div className="relative h-[60px] flex items-center gap-4">
              {!isCartPage && (
                <div className=" m-2 hidden w-60 items-center rounded-l-full rounded-r-full bg-[#f0f0f0] px-2 py-0 duration-300 focus-within:w-70 focus-within:duration-300 lg:flex">
                  <IoIosSearch className="block w-7 text-4xl" />
                  <input
                    className="mx-2 w-[100%] outline-none"
                    aria-label="Search products"
                    type="text"
                    placeholder="Search shirts, jeans, shoes..."
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    onChange={handelChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              )}

              <p className="absolute right-1.5 bottom-9 text-gray-700 md:bottom-9">
              {/* <p className="absolute top-0 right-0 bottom-4 text-gray-700"> */}
                {cart.totalQuantity === 0 ? "" : cart.totalQuantity}
              </p>
              <Link to={"/cart"} aria-label="View cart">
                <IoCart className="text-2xl " />
              </Link>
              {/* <IoPersonCircleOutline className="text-2xl" /> */}
            </div>
          </div>
        </div>
        <div>
          {!isCartPage && (
            <div className="m-2 flex items-center rounded-l-full rounded-r-full bg-[#f0f0f0] px-2 py-0 duration-300 md:hidden">
              <IoIosSearch className="block w-7 text-4xl" />
              <input
                className="mx-2 w-full outline-none"
                aria-label="Search products"
                type="text"
                placeholder="Search shirts, jeans, shoes..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={handelChange}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`${mobileMenu ? "top-15" : "-top-35"} absolute z-100 flex w-full flex-col items-center border-b border-black bg-black py-1 text-white duration-300`}
      >
        <ul className="flex justify-center gap-10 p-5">
          <li>
            <Link to={"/men"} onClick={() => setMobileMenu(false)}>
              Men
            </Link>
          </li>
          <li>
            <Link to={"/women"} onClick={() => setMobileMenu(false)}>
              Women
            </Link>
          </li>
          <li>
            <Link to={"/boys"} onClick={() => setMobileMenu(false)}>
              Boys
            </Link>
          </li>
          <li>
            <Link to={"/girls"} onClick={() => setMobileMenu(false)}>
              Girls
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;

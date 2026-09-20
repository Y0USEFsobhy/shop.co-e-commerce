import { useLoaderData } from "react-router-dom";
import { productLoader } from "../service/getSingleProduct";
import ChooseSize from "../ui/ChooseSize";
import CounterAndaddcart from "../ui/CounterAndaddcart";
import { useState } from "react";
import { useEffect } from "react";

function ProductDetailPage() {
  const product = useLoaderData();
  const { title, image, oldPrice, newPrice, discount, brand ,inStock } = product;

  const [selectedSize, setSelectedSize] = useState("");

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="md:px-12 lg:px-24 px-3 py-8 flex md:gap-10 gap-4
     relative
  after:content-[''] after:absolute after:top-0 after:left-1/2 
  after:w-[90%] after:h-px after:bg-gray-400 after:-translate-x-1/2
     flex-col md:flex-row
    "
    >
      <div className=" md:w-fit w-full md:max-w-87.5 flex justify-center ">
        <img loading="lazy" src={image} alt="product" />
      </div>
      <div className="w-full ">
        <p className="lg:text-5xl md:text-4xl text-2xl">{title}</p>
        <p className="md:text-xl text-sm text-gray-500 md:my-5 my-2">{brand}</p>

        {discount ? (
          <div className="flex items-center gap-5 text-2xl">
            {newPrice} EGP
            <p className="text-[#b3b3b3] line-through">{oldPrice} EGP</p>{" "}
            <span className="text-[#ff3333] rounded-full px-3 py-2 bg-[#ffebeb] md:text-lg text-sm">
              -{discount}
            </span>{" "}
          </div>
        ) : (
          <p className="text-2xl">{oldPrice} EGP</p>
        )}

        <hr className="text-gray-200 my-7"></hr>
        {inStock && <ChooseSize
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          />
        }
        <hr className="text-gray-200 my-7"></hr>
        {!inStock ? <h2 className="bg-black uppercase text-white text-center p-2 rounded-full">out of stock</h2> : 
        <CounterAndaddcart product={product} selectedSize={selectedSize} />
        }
      </div>
    </div>
  );
}
export default ProductDetailPage;

export async function loader({ params }) {
  const validCategories = ["men", "women", "boys", "girls"];
  if (!validCategories.includes(params.category)) {
    throw new Response("Not Found", { status: 404 });
  }
  const product = await productLoader(params.id);
  return product;
}

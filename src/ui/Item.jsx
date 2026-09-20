import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useState, useMemo } from "react";

function Item({ id, image, title, oldPrice, newPrice, category, inStock }) {
  const [loaded, setLoaded] = useState(false);

  const priceBlock = useMemo(() => {
    if (newPrice) {
      return (
        <div className="flex gap-5">
          <p className="line-through">{oldPrice} EGP</p>
          <p>{newPrice} EGP</p>
        </div>
      );
    }
    return <p>{oldPrice} EGP</p>;
  }, [oldPrice, newPrice]);

  return (
    <Link
      key={id}
      className={`h-fit ${!inStock ? "cursor-default" : "cursor-pointer "}   space-y-1 rounded-lg p-1 pb-2 duration-300 hover:scale-105`}
      to={!inStock ? "#" : `/${category}/${id}`}
      onClick={(e) => {
        if (!inStock) e.preventDefault();
      }}
    >
      {!loaded && (
        <div>
          <div className="hidden md:block">
            <Skeleton height={350} width={200} />
          </div>
          <div className="block h-[200px] w-[150px] md:hidden">
            <Skeleton height={200} width={150} />
          </div>
        </div>
      )}

      <div className={`relative rounded-lg bg-[#f0eeed68]   `}>
        {!inStock && <div className="absolute w-full text-center z-10  py-1.5 bg-black text-white top-1/2 left-1/2 -translate-1/2">OUT OF STOCK</div>}
        <img
          className={`${loaded ? "opacity-100" : "opacity-0"} ${!inStock ? "grayscale-75 " : ""}   rounded-lg duration-500 hover:shadow-sm`}
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      {!loaded ? (
        <Skeleton count={1} />
      ) : (
        <div className="ml-1 flex h-16 flex-col">
          <h2 className="max-w-[240px] text-sm font-medium">{title}</h2>
          {priceBlock}
        </div>
      )}
    </Link>
  );
}

export default React.memo(Item);

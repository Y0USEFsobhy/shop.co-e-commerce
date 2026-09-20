import { useSearchParams } from "react-router-dom";
import { CgOptions } from "react-icons/cg";
import Slider from "./Slider";
import DropDown from "./DropDown";
import { useState } from "react";

function FilterPanel({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryData = {
    men: {
      filters: [
        "Printed",
        "Linen",
        "Formal",
        "Jeans",
        "Striped",
        "Loose",
        "Swimwear",
        "Shorts",
        "Regular",
        "Trousers",
        "Cotton",
        "Basic",
        "Shoes",
        "T-shirt",
        "Slim",
        "Jacket",
        "Sneakers",
        "Polo",
        "Shirt",
      ],
      brands: [
        "LCW BUSINESS",
        "LCW Jeans",
        "LCW STEPS",
        "LCW SWIMWEAR",
        "LCW Vision",
        "LCWAIKIKI Classic",
        "SOUTHBLUE",
        "XSIDE",
      ],
    },

    women: {
      filters: [
        "knit",
        "polo",
        "printed",
        "linen",
        "regular",
        "formal",
        "coat",
        "trousers",
        "cardigan",
        "t-shirt",
        "dress",
        "jeans",
        "striped",
        "slim",
        "jacket",
        "loose",
        "shirt",
      ],
      brands: [
        "LCW Comfort",
        "LCW EVERYDAY",
        "LCW Modest",
        "LCW STEPS",
        "LCW STUDIO",
        "LCW Vision",
        "LCWAIKIKI Basic",
        "LCWAIKIKI Classic",
        "XSIDE",
      ],
    },

    boys: {
      filters: [
        "sweatshirt",
        "polo",
        "printed",
        "linen",
        "regular",
        "basic",
        "coat",
        "trousers",
        "t-shirt",
        "jeans",
        "slim",
        "striped",
        "jacket",
        "shirt",
        "swimwear",
        "shorts",
      ],
      brands: ["LC WAIKIKI", "LCW Kids", "LCW baby"],
    },

    girls: {
      filters: [
        "sweatshirt",
        "sneakers",
        "printed",
        "linen",
        "polo",
        "regular",
        "trousers",
        "cardigan",
        "t-shirt",
        "dress",
        "jeans",
        "striped",
        "slim",
        "jacket",
        "knit",
        "shirt",
        "leggings",
        "shorts",
      ],
      brands: ["LCW Girls Studio", "LCW Kids", "LCW STEPS", "LCW baby"],
    },
  };
  const filterByCategory = categoryData[category]?.filters || [];
  const brandsByCategory = categoryData[category]?.brands || [];

  const handleSingleFilter = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      if (next.get(key) === value) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      next.set("page", 1);
      return next;
    });
  };

  const isActive = (key, value) => {
    const existing = searchParams.get(key);
    return existing ? existing.split(",").includes(value) : false;
  };
  const [OpenSlide, SetOpenSlide] = useState(false);
  return (
    <div className="">
      <div className="relative md:hidden">
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent lg:hidden" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent lg:hidden" />
        <div className="category-scroll flex w-full items-center gap-2 overflow-x-scroll px-2 py-2 lg:overflow-hidden">
          {filterByCategory.map((filter) => (
            <span
              key={filter}
              className={`w-fit min-w-fit cursor-pointer rounded-full border-2 bg-transparent p-1 px-2 text-center text-black duration-300 hover:duration-300 lg:min-w-22 ${
                isActive("search", filter)
                  ? "border-black font-bold"
                  : "border-gray-300 font-medium hover:bg-gray-300 hover:duration-300"
              }`}
              onClick={() => handleSingleFilter("search", filter)}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-2 md:mt-5 md:mb-3 md:px-10 lg:px-24">
        <button
          onClick={() => SetOpenSlide(true)}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black py-1.5 font-bold duration-300 hover:bg-white hover:duration-300 md:ml-4 md:w-[15%]"
        >
          <CgOptions className="text-xl" />
          <span className="block md:hidden">Filter & Sort</span>
          <span className="hidden md:block">Filter</span>
        </button>
        <DropDown />
      </div>
      <Slider
        OpenSlide={OpenSlide}
        SetOpenSlide={SetOpenSlide}
        filterByCategory={filterByCategory}
        brandsByCategory={brandsByCategory}
      />
    </div>
  );
}

export default FilterPanel;

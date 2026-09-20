import { useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Slider({
  OpenSlide,
  SetOpenSlide,
  filterByCategory,
  brandsByCategory,
}) {
  const [SearchParams, setSearchParams] = useSearchParams();
  const sort = SearchParams.get("sort");
  const discount = SearchParams.get("discount")
  const handleSortBtn = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === "Newest") {
        next.delete("sort");
      } else {
        next.set("sort", value);
      }
      next.set("page", "1");
      return next;
    });
  };

  const handleSingleFilter = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.set(key, value);
      next.set("page", 1);
      return next;
    });
  };

  const deleteFilter = (key) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.delete(key);
      next.set("page", 1);
      return next;
    });
  };

  const isActive = (key, value) => {
    const existing = SearchParams.get(key);
    return existing ? existing.split(",").includes(value) : false;
  };

  return (
    <>
      {OpenSlide && (
        <div
          onClick={() => SetOpenSlide(false)}
          className="fixed inset-0 z-40 overflow-y-scroll bg-black/60"
        />
      )}

      <div
        className={`${OpenSlide ? "left-0 " : "-left-full"} fixed top-0 z-50 h-dvh w-2/3 overflow-y-scroll bg-white duration-500 md:w-1/4`}
        // className={`${OpenSlide ? "top-50" : "top-full"} fixed  rounded-t-3xl z-50 h-full overflow-y-scroll w-full left-0 bg-white duration-300`}
      >
        <div className="flex items-center justify-between border-b-2 border-black px-5 py-3.5">
          <p>Filters</p>
          <button onClick={() => SetOpenSlide(false)}>
            <IoClose className="cursor-pointer text-xl" />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-5 md:hidden">
          <h2 className="mb-1 font-bold">Sort By</h2>

          <label className="font-medium">
            <input
              className="mr-2"
              name="order"
              checked={!sort}
              type="radio"
              onChange={() => handleSortBtn("Newest")}
            />
            Newest
          </label>
          <label className="font-medium">
            <input
              className="mr-2"
              name="order"
              checked={sort === "price_asc"}
              type="radio"
              onChange={() => handleSortBtn("price_asc")}
            />
            Price: Low to High
          </label>
          <label className="font-medium">
            <input
              className="mr-2"
              name="order"
              checked={sort === "price_desc"}
              type="radio"
              onChange={() => handleSortBtn("price_desc")}
            />
            Price: High to Low
          </label>
        </div>

        <div className="hidden flex-col gap-3 p-5 font-medium md:flex">
          <p className="font-bold">Filter By Items</p>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              name="category"
              className="mx-2"
              onClick={() => deleteFilter("search")}
            />
            Clear Filters
          </label>
          {filterByCategory.map((filter) => (
            <label
              className={`w-fit cursor-pointer ${isActive("search", filter) ? "font-bold" : ""}`}
              key={filter}
            >
              <input
                checked={isActive("search", filter)}
                type="checkbox"
                name="category"
                className="mx-2"
                onChange={() => handleSingleFilter("search", filter)}
              />
              {filter}
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-3 p-5 font-medium">
          <p className="font-bold">Filter By Brands</p>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              name="brand"
              className="mx-2"
              onClick={() => deleteFilter("brand")}
            />
            Clear Filters
          </label>
          {brandsByCategory.map((filter) => (
            <label
              className={`w-fit cursor-pointer ${isActive("brand", filter) ? "font-bold" : ""}`}
              key={filter}
            >
              <input
                checked={isActive("brand", filter)}
                type="checkbox"
                name="brand"
                className="mx-2"
                onChange={() => handleSingleFilter("brand", filter)}
              />
              {filter}
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-3 p-5 font-medium">
          <p className="font-bold">Discount Filter</p>
          
          <label className="flex">
            <input
              checked={discount}
              type="radio"
              name="discount"
              className="mx-2"
              onChange={() => handleSingleFilter("discount", "true")}
            />
          Discounted Items
          </label>
          <label>
            <input
              checked={!discount}
              type="radio"
              name="discount"
              className="mx-2"
              onChange={() => deleteFilter("discount")}
            />
            Non-Discounted Items
          </label>
        </div>
      </div>
    </>
  );
}

export default Slider;

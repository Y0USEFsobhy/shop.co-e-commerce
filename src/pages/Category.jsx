import Item from "../ui/Item";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import ScrollUpBtn from "../ui/ScrollUpBtn";
import FilterPanel from "../ui/FilterPanel";
import axios from "axios";
import NoProductFound from "../ui/NoProductFound";

function Category() {
  const { products, count, page, errorPlus } = useLoaderData();
  const [, setSearchParams] = useSearchParams();
  const { category } = useParams();

  const totalPages = Math.ceil(count / 24);

  const handleChange = (event, value) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.set("page", value);
      return next;
    });
  };

  const [showUpBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY >= 1400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#f4f1ec]">
      <div className="flex w-full flex-col">
        <FilterPanel category={category} />
        {errorPlus && (
          <NoProductFound
            category={category}
            setSearchParams={setSearchParams}
          />
        )}
        <div className="relative grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))] justify-center justify-items-center gap-x-1 gap-y-5 px-1 py-5 pt-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-10 md:px-10 lg:px-24">
          {!errorPlus &&
            products.map((product) => (
              <Item
                title={product.title}
                key={product.id}
                id={product.id}
                image={product.image}
                oldPrice={product.oldPrice}
                newPrice={product.newPrice}
                discount={product.discount}
                category={product.category}
                inStock={product.inStock}
              />
            ))}
        </div>
      </div>
      {!errorPlus && (
        <div className="m-auto flex justify-center py-5">
          <Pagination
            // size="large"
            // siblingCount={1}
            count={totalPages}
            page={Number(page)}
            onChange={handleChange}
            shape="rounded"
          />
        </div>
      )}
      <ScrollUpBtn showUpBtn={showUpBtn} onClick={() => scrollToTop()} />
    </div>
  );
}

export default Category;

export async function categoryLoader({ params, request }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiAuthorization = import.meta.env.VITE_API_Authorization;

  const validCategories = ["men", "women", "boys", "girls"];
  if (!validCategories.includes(params.category)) {
    throw new Response("Not Found", { status: 404 });
  }

  const { category } = params;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;

  const brand = url.searchParams.get("brand") || "";
  const discount = url.searchParams.get("discount") || "";
  const search = url.searchParams.get("search") || "";
  // const oldPrice = url.searchParams.get("order")
  // const minPrice = url.searchParams.get("minPrice") || ""
  // const maxPrice = url.searchParams.get("maxPrice") || ""
  const sortPrice = url.searchParams.get("sort");

  let order_by;

  if (sortPrice === "price_asc") {
    order_by = "oldPrice";
  } else if (sortPrice === "price_desc") {
    order_by = "-oldPrice";
  }

  try {
    if (order_by) {
      params.order_by = order_by;
    }

    const response = await axios.get(apiUrl, {
      params: {
        user_field_names: true,
        page: page,
        size: 24,
        order_by,
        filter__field_9145270__equal: category,
        filter__field_9145268__equal: brand || undefined,
        filter__field_9145267__not_empty: discount || undefined,
        filter__field_9145276__contains: search, //keywords
        filter_type: "AND",
        // filter__field_8708196__contains: search, //tages
        // filter__field_9145264__contains_word: search, //title
        // filter_type: "OR",
        // search: search,
      },

      headers: {
        Authorization: apiAuthorization,
        "Content-Type": "application/json",
      },
    });

    if (response.data.results.length == 0) {
      return { products: [], count: 0, page, errorPlus: true, category }
    }


    return {
      products :response.data.results,
      count: response.data.count,
      page,
      category,
    };
  } catch (error) {
    console.error("Error fetching row:", error);
    return { products: [], count: 0, page, errorPlus: true, category }
  }
}

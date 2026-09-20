import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const options = [
  { label: "Newest", value: "Newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function SortDropdown() {
  const [open, setOpen] = useState(false);

  const [SearchParams, setSearchParams] = useSearchParams();

  const current = SearchParams.get("sort") || "Newest";
  const currentLabel =
    options.find((o) => o.value === current)?.label ?? "Newest";

  const handleSortBtn = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === "Newest") {
        next.delete("sort");
      } else {
        next.set("sort", value);
      }
      next.delete("page");
      return next;
    });
  };

  return (
    <div className="mr-4 hidden items-center gap-3 md:flex">
      <span className="text-sm text-gray-500">Sort by</span>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-full border-2 border-black bg-transparent px-4 py-1.5 font-bold transition-colors duration-700 hover:bg-gray-50"
        >
          {currentLabel}
          <RiArrowDropDownLine
            className={`text-2xl transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 z-10 mt-1.5 w-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {options.map((option) => (
              <button
                key={option.label}
                onClick={() => {
                  setOpen(false);
                  handleSortBtn(option.value);
                }}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50"
              >
                {option.label}
                {current === option.value && (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

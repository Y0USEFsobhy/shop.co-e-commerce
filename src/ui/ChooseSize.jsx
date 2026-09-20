
export default function SizeSelector({selectedSize,setSelectedSize,product}) {
  const { sizes } = product;
  
  return (
    <div>
      <h2 className="mb-3 text-md text-[#6a7282]">Choose Size</h2>

      <div className="flex md:gap-4 gap-2.5">
        {sizes.split("|").map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`md:px-6 md:py-3 px-3 flex flex-1/2 justify-center py-2  rounded-full md:text-lg transition cursor-pointer 
              ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

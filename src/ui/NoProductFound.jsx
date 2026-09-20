import { Link } from "react-router-dom";

function NoProductFound({category,setSearchParams}){
  return (
  <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4">
    <span className="text-5xl">🙁</span>
    <h2 className="text-xl font-semibold">No products found</h2>
    <p className="text-gray-500 text-sm max-w-xs">
      Try adjusting your filters or search term to find what you're looking for.
    </p>
    <div className="flex flex-wrap gap-3 justify-center mt-2">
      <button
        onClick={() => setSearchParams({})}
        className="border border-black px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
      >
        Reset Filters
      </button>
      <Link
        to={`/${category}`}
        className="border border-black px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
      >
        Browse All {category}
      </Link>
      <Link
        to="/"
        className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  </div>
  );
};

export default NoProductFound;
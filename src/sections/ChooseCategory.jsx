import { Link } from "react-router-dom";
import boys from "../assets/images/boys.webp";
import man from "../assets/images/man.webp";
import girls from "../assets/images/girls.webp";
import woman from "../assets/images/woman.webp";

function ChooseCategory() {
  return (
      <div id="main" className="grid grid-cols-2 sm:grid-cols-4">
        <div className="relative h-auto w-fit overflow-hidden">
          <Link
            to={`/women`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={woman} className="duration-150 hover:scale-120" alt="woman category" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white uppercase">
              Woman
            </p>
          </Link>
        </div>

        <div className="relative h-auto w-fit overflow-hidden">
          <Link
            to={`/men`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={man} className="duration-150 hover:scale-120" alt="man category" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white uppercase">
              man
            </p>
          </Link>
        </div>

        <div className="relative h-auto w-fit overflow-hidden">
          <Link
            to={`/girls`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={girls} className="duration-150 hover:scale-120" alt="girls category" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white uppercase">
              girls
            </p>
          </Link>
        </div>

        <div className="relative h-auto w-fit overflow-hidden">
          <Link
            to={`/boys`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={boys} className="duration-150 hover:scale-120" alt="boys category" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-white uppercase">
              boys
            </p>
          </Link>
        </div>
      </div>
  );
}

export default ChooseCategory;

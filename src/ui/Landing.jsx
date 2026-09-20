import CountUp from "react-countup";
import LogosBar from "./LogosBar";
import star from "../assets/images/star.svg";
import heroN from "../assets/images/heroN.jfif";

function Landing() {
  return (
    <div>
      <div className="min-h-screen flex-row justify-between bg-[#f2f0f1] from-[#494444d4] from-0% to-transparent to-20% px-3 pt-5 md:flex md:bg-linear-to-l/decreasing md:px-12 md:pt-0 md:pb-0 lg:px-22">
        <div className="flex flex-col items-start justify-center md:w-1/2">
          <h1 className="mb-2 text-4xl font-black lg:text-7xl lg:leading-15 lg:tracking-tight">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="my-1 text-[12px] text-[#616060] md:text-[0.9rem]">
            Browse through our diverse range Of meticulously crafted garments.
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start">
            <div className="flex w-fit flex-col border-r border-[#616060] px-4 text-[2rem]">
              <div>
                <CountUp end={200} duration={5} delay={1} />+
              </div>
              <span className="text-[12px] font-medium text-[#616060]">
                International Brands
              </span>
            </div>
            <div className="flex w-fit flex-col border-[#616060] px-4 text-[2rem] sm:border-r">
              <div>
                <CountUp end={2000} duration={3} delay={1} />+
              </div>
              <span className="text-[12px] font-medium text-[#616060]">
                High Quality Products
              </span>
            </div>
            <div className="flex w-fit flex-col px-4 text-[2rem]">
              <div>
                <CountUp end={30000} duration={1.5} delay={1} />+
              </div>
              <span className="text-[12px] font-medium text-[#616060]">
                Happy customers
              </span>
            </div>
            <butto
              onClick={() => {
                document.getElementById("main")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="my-5 w-full cursor-pointer rounded-l-full rounded-r-full border border-black bg-black p-4 text-center text-white duration-300 hover:bg-white hover:text-black hover:duration-300 md:w-1/2"
            >
              Shop Now
            </butto>
          </div>
        </div>
        <div className="relative flex justify-center overflow-hidden sm:justify-center lg:h-dvh lg:justify-end">
          <img
            className="absolute top-10 right-10 z-10 h-15"
            src={star}
            alt="hero"
          />
          <img
            className="absolute top-40 left-4 z-10 h-11"
            src={star}
            alt="hero"
          />
          <img
            className="mask-y-from-70% mask-x-from-85% mask-x-to-100% mask-radial-from-black mask-radial-to-white bg-cover md:mask-y-from-100%"
            height={100}
            src={heroN}
            alt="hero"
          />
        </div>
      </div>
      <LogosBar />
    </div>
  );
}
export default Landing;

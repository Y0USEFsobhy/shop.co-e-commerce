import { ThreeDots } from 'react-loader-spinner'
function Loading() {
  return (
    <div className="bg-white w-full h-lvh overflow-y-hidden text-white flex justify-center items-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#111111"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;

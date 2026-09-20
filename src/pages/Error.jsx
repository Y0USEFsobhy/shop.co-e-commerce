import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NotFound from "./NotFound";
function Error() {
  const error = useRouteError();
  
    if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />; 
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Something went wrong</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default Error;
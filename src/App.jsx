import { createHashRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
// import Lenis from "lenis";

import store from "./store";
import Layout from "./ui/Layout";

import Homepage from "./pages/Homepage";

const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const Category = lazy(() => import("./pages/Category"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Error = lazy(() => import("./pages/Error"));
const NotFound = lazy(() => import("./pages/NotFound"));
import Loading from "./pages/Loading"

import { loader as getSingleProduct } from "./pages/ProductDetailPage";
import { categoryLoader } from "./pages/Category";

const router = createHashRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/:category/:id",
        element: <ProductDetailPage />,
        loader: getSingleProduct,
      },
      {
        path: "/:category",
        element: <Category />,
        loader: categoryLoader,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  //   useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.1,
  //     smoothWheel: true,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);
  
  return (
    <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <Suspense fallback={<Loading/>}>
      <RouterProvider router={router} fallbackElement={<Loading/>} />
        </Suspense>
    </Provider>
  );
}
export default App;

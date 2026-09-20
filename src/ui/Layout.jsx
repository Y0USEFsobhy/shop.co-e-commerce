import { Outlet, useNavigation } from "react-router-dom";
import Nav from "./Nav";
import Loading from "../pages/Loading";
import { ScrollRestoration } from "react-router-dom";

function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      <Nav />
      <ScrollRestoration
      getKey={(location) => location.pathname + location.search}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}
export default Layout;

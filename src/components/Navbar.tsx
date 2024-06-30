import { Link, useLocation } from "react-router-dom";
import { storageKey, userData } from "../userData";

const Navbar = () => {
  const { pathname } = useLocation();
  const onLogout = () => {
    localStorage.removeItem(storageKey);
    setTimeout(() => {
      location.replace(pathname);
    }, 1000);
  };
  return (
    <nav className="w-full md:max-w-[700px] max-md:px-10 max-sm:px-5 max-lg:px-3 flex items-center justify-between pt-10 mx-auto">
      <Link
        className="font-medium text-xl"
        to={"/"}>
        Home
      </Link>
      {userData ? (
        <div className="flex gap-5 items-center">
          <Link
            className="font-semibold text-blue-600 text-[17 px]"
            to={"/todos"}>
            Todos
          </Link>
          <Link
            className="font-semibold text-blue-600 text-[17 px]"
            to={"/profile"}>
            Profile
          </Link>
          <button
            onClick={onLogout}
            className="text-white font-medium bg-blue-500 rounded-md px-3 py-2 duration-300 transition-all hover:bg-blue-600">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link
            className="text-white font-medium bg-blue-500 rounded-md px-2 py-2 duration-300 transition-all hover:bg-blue-600"
            to={"/register"}>
            Register
          </Link>
          <Link
            className="text-white font-medium bg-blue-500 rounded-md px-2 py-2 duration-300 transition-all hover:bg-blue-600"
            to={"/login"}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

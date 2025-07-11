import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {token ? (
          <>
            <NavLink to="/" className="flex flex-col items-center gap-1">
              <p>Home</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col items-center gap-1"
            >
              <p>Collection</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
              <p>About</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink
              to="/contact"
              className="flex flex-col items-center gap-1 "
            >
              <p>Contact</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </>
        ) : (
          <NavLink to="/login" className="flex flex-col items-center gap-1 ">
            <p>Sign In</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        )}
      </ul>
      {token ? (
        <>
          <div className="flex items-center gap-6">
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            <div className="hidden md:block group relative">
              {" "}
              <img
                onClick={token ? null : navigate("/login")}
                src={assets.profile_icon}
                className="w-5 cursor-pointer hidden md:block"
                alt=""
              />
              {/* profile code */}
              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                    <p
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer hover:text-black"
                    >
                      Orders
                    </p>
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* cart */}
            <Link to="/cart" className="relative">
              <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            </Link>
            <img
              onClick={() => setVisible(!visible)}
              src={assets.menu_icon}
              className="w-5 cursor-pointer sm:hidden"
            />
          </div>
          {/* sidebar menu for small screens */}
          <div
            className={`z-9999 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
              visible ? "w-full" : "w-0"
            }`}
          >
            <div className="flex flex-col text-gray-600 ">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center cursor-pointer gap-4 p-3"
              >
                <img
                  src={assets.dropdown_icon}
                  className="h-4 rotate-180"
                  alt=""
                />
                <p>Back</p>
              </div>
              <NavLink
                className="py-2 pl-6 border"
                onClick={() => setVisible(false)}
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className="py-2 pl-6 border"
                onClick={() => setVisible(false)}
                to="/collection"
              >
                Collection
              </NavLink>
              <NavLink
                className="py-2 pl-6 border"
                onClick={() => setVisible(false)}
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                className="py-2 pl-6 border"
                onClick={() => setVisible(false)}
                to="/constct"
              >
                Contact
              </NavLink>
              <NavLink
                className="py-2 pl-6 border  bg-white"
                onClick={() => {
                  setVisible(false);
                  logout();
                }}
                to="/login"
              >
                Logout
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 sm:hidden ${
              isActive ? "text-gray-700" : ""
            }`
          }
        >
          <p>Sign In</p>
          <hr className="w-2/4 border-none h-[1.5px] hidden" />
        </NavLink>
      )}
    </div>
  );
};

export default NavBar;

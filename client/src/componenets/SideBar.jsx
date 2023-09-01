import React from "react";
import { Link, NavLink } from "react-router-dom";
import { navlinks } from "../utils/userNavlinks";
import navImage from "../assets/icons8-cake-100.png";
import { useAppContext } from "../context/appContext";

const SideBar = () => {
  const { logoutUser, isToggleMenu, toggleMenu } = useAppContext();
  return (
    <header className="border-b shadow-sm lg:hidden relative">
      <nav className="flex justify-between max-w-7xl mx-auto items-center py-4">
        <div className="flex items-center justify-center gap-x-2">
          <img src={navImage} width="60px" alt="logo" />
          <h2 className="text-thulian-pink">Shake&Bake</h2>
        </div>
        {isToggleMenu ? (
          <ul className="text-base z-10 text-center flex flex-col gap-y-14 items-center gap-x-14 absolute top-[110px]  h-[100vh] bg-white w-full" >
            {navlinks.map((navlink) => {
              const { id, text, link } = navlink;
              return (
                <NavLink
                  key={id}
                  to={link}
                  className={({ isActive }) =>
                    isActive
                      ? "hover:text-thulian-pink active"
                      : "hover:text-thulian-pink "
                  }
                  end
                  onClick={toggleMenu}
                >
                  {text}
                </NavLink>
              );
            })}
            <Link
              to="/"
              className="text-lg text-thulian-pink border-2 border-transparent font-semibold capitalize  hover:border-2 hover:border-solid hover:rounded-3xl hover:border-thulian-pink px-4 py-2"
              onClick={logoutUser}
            >
              Sign out
            </Link>
          </ul>
        ) : null}
        <button type="button" onClick={toggleMenu} className="text-secondary text-2xl">
          {isToggleMenu ? <span>&#10005;</span> : <span> &#9776;</span>}
        </button>
      </nav>
    </header>
  );
};

export default SideBar;

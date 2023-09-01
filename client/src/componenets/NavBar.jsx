import React from "react";
import { useAppContext } from "../context/appContext";
import { Link, NavLink } from "react-router-dom";
import { navlinks } from "../utils/userNavlinks";

const NavBar = () => {
  const { user, logoutUser } = useAppContext();
  return (
    <header className="border-b shadow-sm 2xl:hidden">
      <nav className="flex justify-between max-w-7xl mx-auto items-center py-4">
        <h2 className="text-xl text-thulian-pink uppercase font-semibold">
          Welcome &nbsp;{user?.name.firstName}👋
        </h2>
        <ul className="text-base flex justify-center items-center gap-x-14">
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
              >
                {text}
              </NavLink>
            );
          })}
        </ul>
          <Link
            to="/"
            className="text-lg text-thulian-pink border-2 border-transparent font-semibold capitalize  hover:border-2 hover:border-solid hover:rounded-3xl hover:border-thulian-pink px-4 py-2"
            onClick={logoutUser}
          >
            Sign out
          </Link>
      </nav>
    </header>
  );
};

export default NavBar;

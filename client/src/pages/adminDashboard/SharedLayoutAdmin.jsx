import React from "react";
import AdminNavBar from "../../componenets/AdminNavBar";
import { Outlet } from "react-router-dom";

const SharedLayoutAdmin = () => {
  return (
    <>
      <AdminNavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayoutAdmin;

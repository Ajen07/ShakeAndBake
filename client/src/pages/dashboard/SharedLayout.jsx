import React from "react";
import NavBar from "../../componenets/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../../context/appContext";

const SharedLayout = () => {
  const { showAlert } = useAppContext();
  return (
    <>
      <ToastContainer />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;

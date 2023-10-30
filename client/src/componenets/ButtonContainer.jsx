import React from "react";
import { useAppContext } from "../context/appContext";

const ButtonContainer = () => {
  const { totalPages, changePage,page } = useAppContext();
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <section className="max-w-7xl mx-auto flex gap-x-4">
      {pages.map((pageNo,index) => {
        return <span key={index} onClick={()=>changePage(pageNo)} className={pageNo===page?"bg-thulian-pink text-white btn":"bg-white btn"}>{pageNo}</span>;
      })}
    </section>
  );
};

export default ButtonContainer;

import React from "react";
import { Outlet } from "react-router-dom";

const SharedLayoutOrdersPage = () => {
  return (
    <main >
      <section className="max-w-7xl mx-auto mt-8">
        <h1 className="text-3xl font-bold uppercase">
          Your Orders
        </h1>
        <section className="mt-8">
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default SharedLayoutOrdersPage;

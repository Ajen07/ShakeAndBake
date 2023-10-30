import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Alert from "../componenets/Alert";
import ProductConatiner from "../componenets/ProductConatiner";
import ButtonContainer from "../componenets/ButtonContainer";
import FormRowSelect from "../componenets/FormRowSelect";

const AllProducts = () => {
  const {
    getAllProducts,
    isLoading,
    showAlert,
    handleInputChange,
    search,
    categoryOptions,
    typeOptions,
    category,
    type,
    page
  } = useAppContext();
  useEffect(() => {
    getAllProducts();
  }, [page,search]);
  const handleSubmit = (e) => {
    e.preventDefault();
    getAllProducts();
  };
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    handleInputChange({ name, value });
  };
  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleInputChange({ name, value });
  };
  if (isLoading) {
    return (
      <h1 className="min-h-screen grid place-content-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </h1>
    );
  } else if (showAlert) {
    return <Alert />;
  }
  return (
    <>
      <main className="lg-grid mt-6">
        <form className="max-w-4xl mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              name="search"
              class="block w-full p-4 pl-10 text-sm text-gray-900  border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search Milkshakes and Cakes ...."
              value={search}
              onChange={handleSearch}
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-thulian-pink hover:bg-thulian-pink-md focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </form>
        <div className="max-w-7xl mx-auto text-end mt-4">
          <button
            className="btn btn-secondary"
            onClick={() => window.my_modal_1.showModal()}
          >
            Filters
          </button>
        </div>
        <dialog id="my_modal_1" className="modal ">
          <form method="dialog" className="modal-box">
            <FormRowSelect
              name="category"
              labelText="Categories"
              value={category}
              list={categoryOptions}
              handleChange={handleChange}
            />
            <FormRowSelect
              name="type"
              labelText="Type"
              value={type}
              list={typeOptions}
              handleChange={handleChange}
            />
            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-success"
                onClick={getAllProducts}
              >
                Apply Fiters
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={() => window.my_modal_1.close()}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>

        <ProductConatiner />
        <ButtonContainer />
      </main>
    </>
  );
};

export default AllProducts;

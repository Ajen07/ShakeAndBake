import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import FormTextArea from "../componenets/FormTextArea";
import carticon from "../assets/icon-cart.svg";
import FormRow from "../componenets/FormRow";
import FormRowSelect from "../componenets/FormRowSelect";
import ReviewContainer from "../componenets/ReviewContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = () => {
  const { productId } = useParams();
  const {
    getSingleProduct,
    isLoading,
    product,
    title,
    comment,
    rating,
    handleInputChange,
    createReview,
    getSingleProductReview,
    addToCart,
    showAlert,
    isEdit,
    editReview,
    reviewEditId,
  } = useAppContext();
  useEffect(() => {
    getSingleProduct(productId);
    getSingleProductReview(productId);
  }, [productId]);
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    handleInputChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      editReview(reviewEditId);
      return;
    }
    createReview(productId);
  };
  if (isLoading) {
    return (
      <h1 className="text-3xl text-center text-thulian-pink font-bold">
        Loading ....
      </h1>
    );
  }
  return (
    <main>
      {showAlert && <ToastContainer />}
      <section className="max-w-7xl sm:mx-auto grid grid-cols-1 sm:grid-cols-2 mt-4 mx-5 bg-thulian-pink-very-light">
        <img
          src={product?.image}
          alt="image-product-desktop"
          className="w-full sm:block h-full"
        />
        <img
          src={product?.image}
          alt="product image"
          className="w-full sm:hidden block"
        />

        <div className="flex flex-col px-6 justify-between   bg-cwhite pb-6">
          <h2 className="text-sm text-grayish-blue mb-4 mt-2 uppercase tracking-widest">
            {product?.type}
          </h2>
          <h1 className="text-5xl mb-8">{product?.name}</h1>
          <p className="text-grayish-blue mb-5">
            A floral, solar and voluptuous interpretation composed by Olivier
            Polge, Perfumer-Creator for the House of CHANEL. A floral, solar and
            voluptuous interpretation composed by Olivier Polge,
            Perfumer-Creator for the House of CHANEL. A floral, solar and
            voluptuous interpretation composed by Olivier Polge,
            Perfumer-Creator for the House of CHANEL. A floral, solar and
            voluptuous interpretation composed by Olivier Polge,
            Perfumer-Creator for the House of CHANEL. A floral, solar and
            voluptuous interpretation composed by Olivier Polge,
            Perfumer-Creator for the House of CHANEL. A floral, solar and
            voluptuous interpretation composed by Olivier Polge,
            Perfumer-Creator for the House of CHANEL. A floral, solar and
            voluptuous interpretation composed by Olivier Polge,
            Perfumer-Creator for the House of CHANEL.
          </p>
          <div className="flex  gap-x-8 mb-8">
            <h1 className="text-4xl text-Dark-cyan">Rs {product?.price}</h1>
          </div>
          <button
            className="bg-thulian-pink text-white flex items-center justify-center gap-x-4 text-xl px-3 py-3 rounded-md hover:bg-thulian-pink-light"
            type="button"
            onClick={() => {
              addToCart(productId);
            }}
          >
            <img src={carticon} alt="cart" />
            <p>Add to Cart</p>
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto mt-8">
        <h2 className="text-2xl lg:text-3xl text-center font-bold">
          Customer Reviews
        </h2>
        <div className="flex w-full justify-center mt-4">
          <button
            className="btn btn-secondary  mx-auto "
            onClick={() => {
              window.my_modal_1.showModal();
            }}
          >
            Write a review
          </button>
        </div>
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
            <FormRow
              type="text"
              name="title"
              labelText="Title"
              value={title}
              handleChange={handleChange}
            />
            <FormTextArea
              type="text"
              name="comment"
              labelText="Review"
              value={comment}
              handleChange={handleChange}
            />
            <FormRowSelect
              type="text"
              labelText="Rating"
              value={rating}
              list={[1, 2, 3, 4, 5]}
              handleChange={handleChange}
              name="rating"
            />
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-error"
                onClick={() => window.my_modal_1.close()}
              >
                Close
              </button>
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </dialog>
        <ReviewContainer />
      </section>
    </main>
  );
};

export default SingleProduct;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Alert from "../componenets/Alert";
import carticon from "../assets/icon-cart.svg";

const SingleProductMobile = () => {
    const { productId } = useParams();
    const { getSingleProduct, isLoading, showAlert, product } = useAppContext();
    useEffect(() => {
      getSingleProduct(productId);
    }, []);
    if (isLoading) {
      return (
        <h1 className="text-3xl text-center text-thulian-pink font-bold">
          Loading ....
        </h1>
      );
    } else if (showAlert) {
      return <Alert />;
    }
    return (
      <main>
        <section className="max-w-3xl sm:mx-auto grid grid-cols-1 sm:grid-cols-2 mt-4 mx-5 bg-thulian-pink-very-light">
          <img
            src={product.image}
            alt="image-product-desktop"
            className="w-full hidden sm:block h-full"
          />
          <img
            src={product.image}
            alt="product image"
            className="w-full sm:hidden block"
          />
  
          <div className="flex flex-col px-6 justify-between   bg-cwhite pb-6">
            <h2 className="text-sm text-grayish-blue mb-4 mt-2 uppercase tracking-widest">
              {product.type}
            </h2>
            <h1 className="text-5xl mb-8">{product.name}</h1>
            <p className="text-grayish-blue mb-5">
              A floral, solar and voluptuous interpretation composed by Olivier
              Polge, Perfumer-Creator for the House of CHANEL.
            </p>
            <div className="flex  gap-x-8 mb-8">
              <h1 className="text-4xl text-Dark-cyan">$149.99</h1>
              <h5 className="line-through decoration-1 text-grayish-blue">
                $169.99
              </h5>
            </div>
            <button className="bg-thulian-pink text-white flex items-center justify-center gap-x-4 text-xl px-3 py-3 rounded-md hover:bg-thulian-pink-light">
              <img src={carticon} alt="cart" />
              <p>Add to Cart</p>
            </button>
          </div>
        </section>
        <section>
          <h2>Customer Reviews</h2>
        </section>
      </main>
    );
}

export default SingleProductMobile

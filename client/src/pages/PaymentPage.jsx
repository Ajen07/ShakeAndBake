import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Stripe from "stripe";
import "./payment.css";

import CheckoutForm from "./CheckOutForm";
import { useAppContext } from "../context/appContext";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51MMwrGSCHTDseoBwJeUGiRYFFtBeciNm0mY00Bm4cND8P9r2i4zD7YNHgxMk4RleYgpFGvIsyosjxYzOoyYo3zJl00MLXWGVwj"
);

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const {  createOrder, isError } = useAppContext();
  useEffect(() => {
    async function fetchClientSecret() {
      const  clientSecret  = await createOrder();
      console.log(clientSecret);
      setClientSecret(clientSecret);
    }
    fetchClientSecret();
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      fontWeightNormal: "500",
      borderRadius: "2px",
      colorPrimary: "#f360a6",
      colorIconTabSelected: "#fff",
      spacingGridRow: "16px",
    },
    rules: {
      ".Tab, .Input, .Block, .CheckboxInput, .CodeInput": {
        boxShadow: "0px 3px 10px rgba(18, 42, 66, 0.08)",
      },
      ".Block": {
        borderColor: "transparent",
      },
      ".BlockDivider": {
        backgroundColor: "#ebebeb",
      },
      ".Tab, .Tab:hover, .Tab:focus": {
        border: "0",
      },
      ".Tab--selected, .Tab--selected:hover": {
        backgroundColor: "#f360a6",
        color: "#fff",
      },
    },
  };
  const stripe = Stripe(
    "pk_test_51MMwrGSCHTDseoBwJeUGiRYFFtBeciNm0mY00Bm4cND8P9r2i4zD7YNHgxMk4RleYgpFGvIsyosjxYzOoyYo3zJl00MLXWGVwj"
  );
  const options = {
    clientSecret,
    appearance,
  };
  if (isError) {
    return <h1>Something went wrong ,please try again later</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-thulian-pink-very-light">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

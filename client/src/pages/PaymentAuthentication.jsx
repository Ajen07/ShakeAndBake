import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const PaymentAuthentication = () => {
  const { updateOrder } = useAppContext();
  const [query] = useSearchParams();
  const paymentIntentId = query.get("payment_intent");
  const navigate=useNavigate()
  useEffect(() => {
    async function order() {
      if (paymentIntentId) {
        await updateOrder(paymentIntentId);
        navigate('/checkoutsuccess')
      }
    }
    order();
  }, []);
  return (
    <div className="text-2xl font-bold text-center mt-10">
      Your payment is being processed....
    </div>
  );
};

export default PaymentAuthentication;

import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Link, useLocation } from "react-router-dom";
import Alert from "../componenets/Alert";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EmailVerification = () => {
  const { verifyEmail, isLoading,isError} = useAppContext();
  const query = useQuery();
  useEffect(() => {
    verifyEmail({
      verificationCode: query.get("verificationCode"),
      email: query.get("email"),
    });
  }, []);
  if (isLoading) {
    return <div>Loading....</div>
  }
  if (isError) {
    return <div>Verification failed !!..... please try again later</div>
  }
  return <main>
    <h1>Verification Successfull!!</h1>
    <Link to='/register'>Login</Link>
  </main>;
};

export default EmailVerification;

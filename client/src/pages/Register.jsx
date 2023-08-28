import React, { useEffect, useState } from "react";
import FormRow from "../componenets/FormRow";
import Alert from "../componenets/Alert";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
    isMember: true,
  });
  const navigate = useNavigate();
  const { isLoading, showAlert, displayAlert, loginUser, registerUser, user } =
    useAppContext();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    const {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      password,
      isMember,
    } = values;

    e.preventDefault();
    if (
      !email ||
      !password ||
      (!values.isMember &&
        (!firstName || !lastName || !address || !phoneNumber))
    ) {
      displayAlert();
    }
    const currentUser = {
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      password,
    };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };
  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        navigate("/dashboard");
      } else {
        navigate("/admin-home");
      }
    }
  }, [user, navigate]);
  return (
    <>
      <section className=" mt-2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-thulian-pink-md rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-center text-white">
                Sign Up
              </h1>
              {showAlert && <Alert />}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {!values.isMember && (
                  <>
                    <FormRow
                      type="text"
                      name="firstName"
                      placeholder="Arman"
                      labelText="First Name"
                      value={values.firstName}
                      handleChange={handleChange}
                    />
                    <FormRow
                      type="text"
                      name="lastName"
                      placeholder="Jena"
                      labelText="Last Name"
                      value={values.lastName}
                      handleChange={handleChange}
                    />
                    <FormRow
                      type="text"
                      name="phoneNumber"
                      placeholder="8280243072"
                      labelText="Phone Number"
                      value={values.phoneNumber}
                      handleChange={handleChange}
                    />
                    <FormRow
                      type="text"
                      name="address"
                      placeholder="dhsbvyubsduvi"
                      labelText="Address"
                      value={values.address}
                      handleChange={handleChange}
                    />
                  </>
                )}

                <FormRow
                  type="text"
                  name="email"
                  placeholder="foo@company.com"
                  labelText="Email"
                  value={values.email}
                  handleChange={handleChange}
                />
                <FormRow
                  type="password"
                  name="password"
                  placeholder="password"
                  labelText="Password"
                  value={values.password}
                  handleChange={handleChange}
                />

                <button
                  type="submit"
                  className="w-full text-thulian-pink bg-white hover:bg-thulian-pink-very-light focus:ring-4 focus:outline-none focus:ring-thulian-pink font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={isLoading}
                >
                  {values.isMember ? "Sign In" : "Sign Up"}
                </button>
                <p className="text-sm font-light">
                  {values.isMember
                    ? "Dont have an account ?  "
                    : "Already have an account ? "}
                  <button
                    type="button"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={toggleMember}
                  >
                    {values.isMember ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

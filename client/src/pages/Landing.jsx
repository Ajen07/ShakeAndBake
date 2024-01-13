import React, { useState } from "react";
import navImage from "../assets/icons8-cake-100.png";
import heroImage1 from "../assets/Cakes/hero1.jpg";
import heroImage3 from "../assets/Cakes/hero3.jpg";
import heroImage2 from "../assets/Cakes/hero2.jpg";
import heroImage4 from "../assets/shakes/hero4.jpg";
import milkshake from "../assets/shakes/mk20.jpg";
import ck6 from "../assets/Cakes/ck6.jpg";
import ck3 from "../assets/Cakes/ck3.jpg";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import colton from "../assets/images/image-colton.jpg";
import irene from "../assets/images/image-irene.jpg";
import anne from "../assets/images/image-anne.jpg";

const Landing = () => {
  const { user } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="">
        <section className="bg-white sticky w-full z-10 top-0  shadow-xl mb-10">
          <article className="text-3xl flex justify-between items-center max-w-6xl mx-auto p-3">
            <div className="flex items-center justify-center gap-x-2">
              <img src={navImage} width="60px" alt="logo" />
              <h2 className="text-thulian-pink">Shake&Bake</h2>
            </div>

            <nav className="2xl:hidden">
              <ul className="list-none flex  text-base capitalize gap-x-6">
                <li className="hover:text-thulian-pink p-2">
                  <a href="#categories">categories</a>
                </li>
                <li className="hover:text-thulian-pink p-2">
                  <a href="#reviews">reviews</a>
                </li>
                <li className="hover:text-thulian-pink p-2">top selling</li>
                <li className="hover:text-thulian-pink p-2">about</li>
              </ul>
            </nav>
            <div className="2xl:hidden">
              {user ? (
                <Link
                  to="/dashboard"
                  className="text-xl text-thulian-pink px-2 py-2 capitalize"
                >
                  DashBoard
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="text-xl text-thulian-pink px-2 py-2 capitalize"
                >
                  sign in
                </Link>
              )}
            </div>
            <button
              className="2xl:block lg:hidden text-secondary"
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <span>&#10005;</span> : <span> &#9776;</span>}
            </button>
          </article>
        </section>
        <section
          className={
            isOpen
              ? "bg-white absolute h-[95vh] w-full z-10 top-[80px] 2xl:block lg:hidden  mb-10"
              : "hidden"
          }
        >
          <article className="text-3xl flex flex-col-reverse justify-between place-content-between items-center max-w-6xl mx-auto p-3 border-none">
            <nav onClick={() => setIsOpen((prev) => !prev)}>
              <ul className="list-none flex flex-col text-base capitalize gap-x-6">
                <li className="hover:text-thulian-pink p-2">
                  <a href="#categories">categories</a>
                </li>
                <li className="hover:text-thulian-pink p-2">
                  <a href="#reviews">reviews</a>
                </li>
                <li className="hover:text-thulian-pink p-2">top selling</li>
                <li className="hover:text-thulian-pink p-2">about</li>
              </ul>
            </nav>
            {user ? (
              <Link
                to="/dashboard"
                className="text-xl text-thulian-pink px-2 py-2 capitalize"
              >
                DashBoard
              </Link>
            ) : (
              <Link
                to="/register"
                className="text-xl text-thulian-pink px-2 py-2 capitalize"
              >
                sign in
              </Link>
            )}
          </article>
        </section>
        <section className="mt-4">
          <article className="max-w-6xl mx-auto">
            <div className="carousel w-full h-[32rem]">
              <div id="slide1" className="carousel-item relative w-full">
                <img src={heroImage1} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide2" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img src={heroImage2} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img src={heroImage3} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide4" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide4" className="carousel-item relative w-full">
                <img src={heroImage4} className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
          </article>
        </section>
      </header>
      <main className="mt-8 lg:mt-24 lg:mb-24">
        <section className="max-w-6xl mx-auto 2xl:px-4" id="categories">
          <h1 className="text-3xl text-center mt-8 text-secondary font-bold uppercase lg:mb-5">
            Our Tasty Categories
          </h1>
          <div className="flex flex-wrap flex-col sm:flex-row justify-between  mt-8 items-center gap-y-8">
            <article className="card  bg-base-100 shadow-md w-[300px] h-[600px] hover:-translate-y-4 hover:shadow-2xl transition-all ">
              <figure>
                <img src={ck6} alt="ShakeandBake" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Wedding Cakes</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                  magni sint voluptatibus exercitationem obcaecati? Numquam
                  corrupti eius maiores. Est temporibus aliquam ex quibusdam
                  fuga eos nulla doloremque
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary">Eat Now</button>
                </div>
              </div>
            </article>
            <article className="card  bg-base-100 shadow-md w-[300px] h-[600px] hover:-translate-y-4 hover:shadow-2xl transition-all">
              <figure>
                <img src={ck3} alt="ShakeandBake" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Pastries</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                  magni sint voluptatibus exercitationem obcaecati? Numquam
                  corrupti eius maiores. Est temporibus aliquam ex quibusdam
                  fuga eos nulla doloremque
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary">Eat Now</button>
                </div>
              </div>
            </article>
            <article className="card  bg-base-100 shadow-md w-[300px] h-[600px] hover:-translate-y-4 hover:shadow-2xl transition-all">
              <figure>
                <img src={milkshake} alt="ShakeandBake" height="300px" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">MikShakes</h2>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                  magni sint voluptatibus exercitationem obcaecati? Numquam
                  corrupti eius maiores. Est temporibus aliquam ex quibusdam
                  fuga eos nulla doloremque
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary">Eat Now</button>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="max-w-6xl mx-auto mt-8" id="reviews">
          <h1 className="font-bold text-secondary uppercase text-3xl text-center">
            Our Happy Customers
          </h1>
          <article className="grid grid-cols-1 sm:grid-cols-3 sm:gap-x-4 mt-10 gap-y-4 2xl:px-5">
            <div className="px-4 py-8 rounded-lg border shadow-md hover:-translate-y-6 transition-all hover:shadow-2xl">
              <div className="flex mb-6 gap-x-4 items-center">
                <img src={colton} alt="avatar" className="rounded-full w-10 h-10" />
                <div>
                  <h3 className="text-White">Colton Smith</h3>
                  <h5 className="text-secondary">Verified Buyer</h5>
                </div>
              </div>
              <p className="text-sm">
                "We needed the same printed design as the one we had ordered a
                week prior. Not only did they find the original order, but we
                also received it in time."
              </p>
            </div>
            <div className="relative">
              <div className="px-4 py-8  sm:h-236 rounded-lg border shadow-md hover:-translate-y-6 transition-all hover:shadow-2xl">
                <div className="flex mb-6 gap-x-4 items-center">
                  <img
                    src={irene}
                    alt="avatar"
                    className="rounded-full w-10 h-10"
                  />
                  <div>
                    <h3 className="text-White">Irene Roberts</h3>
                    <h5 className="text-secondary">Verified Buyer</h5>
                  </div>
                </div>
                <p className="text-sm">
                  "Customer service is always excellent and very quick turn
                  around. Completely delighted with the simplicity of the
                  purchase and the speed of delivery."
                </p>
              </div>
            </div>
            <div className="relative">
              <div className=" px-4 py-8 sm:h-236 rounded-lg border shadow-md hover:-translate-y-6 transition-all hover:shadow-2xl">
                <div className="flex mb-6 gap-x-4 items-center">
                  <img src={anne} alt="avatar" className="rounded-full w-10 h-10" />
                  <div>
                    <h3 className="text-White">Anne Wallace</h3>
                    <h5 className="text-secondary">Verified Buyer</h5>
                  </div>
                </div>
                <p className=" text-sm">
                  "Put an order with this company and can only praise them for
                  the very high standard. Will definitely use them again and
                  recommend them to everyone!"
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
      <footer className="footer p-10 bg-base-300 text-base-content mt-8">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-blue-400"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-error"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-blue-600"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;

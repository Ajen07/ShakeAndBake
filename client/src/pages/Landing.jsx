import React from "react";
import navImage from "../assets/icons8-cake-100.png";
import heroImage1 from "../assets/Cakes/hero1.jpg";
import heroImage3 from "../assets/Cakes/hero3.jpg";
import heroImage2 from "../assets/Cakes/hero2.jpg";
import heroImage4 from "../assets/Shakes/hero4.jpg";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <>
      <header className="">
        <section className="bg-white sticky z-10 top-0  lg:block">
          <article className="text-3xl flex justify-between items-center max-w-6xl mx-auto p-3">
            <div className="flex items-center justify-center gap-x-2">
              <img src={navImage} width="60px" alt="logo" />
              <h2 className="text-thulian-pink">Shake&Bake</h2>
            </div>
            <nav>
              <ul className="list-none flex  text-base capitalize gap-x-6">
                <li className="hover:text-thulian-pink p-2">categories</li>
                <li className="hover:text-thulian-pink p-2">reviews</li>
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
      <main>
        <section className="">
          <h1 className="text-3xl text-center mt-8">Our Categories</h1>
        </section>
      </main>
    </>
  );
};

export default Landing;

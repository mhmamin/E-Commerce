import React from "react";
import { ShoppingCart } from "lucide-react";

import heroImage from "../assete/i/assets (2)/assets/bg.png";

const Hero = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900
       text-white flex items-center"
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col-reverse md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
            مع أفضل التخفيضات اكتشف أحدث المنتجات <br />
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-xl">
            تسوق الآن واستمتع بعروض لا تُفوت على الإلكترونيات، الأزياء،
            والمنتجات المميزة، احصل على خصومات تصل حتى 50% لفترة محدودة!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
            <button
              onClick={() => handleScroll("shop")}
              className="flex items-center gap-3 bg-cyan-400 hover:bg-indigo-900 text-white font-bold px-8 py-4 
              rounded-2xl text-lg shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6" />
              تسوق الآن
            </button>

            <button
              onClick={() => handleScroll("categories")}
              className="flex items-center gap-3 bg-cyan-400 hover:bg-indigo-900 text-white font-bold px-8 py-4 
              rounded-2xl text-lg shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
            >
              تصفح الفئات
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-lg">
          {/* الصورة المستدعاة محلياً */}
          <img
            src={heroImage}
            className="w-full h-auto object-cover rounded-3xl shadow-2xl"
            alt="Shopping Hero"
          />

          <div className="absolute top-6 left-6 bg-red-500 text-white px-5 py-3 rounded-full font-bold shadow-lg animate-pulse text-lg">
            خصم حتى 50%
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-32"
        >
          <path
            d="M0,0V46.29c47.19,22.1,23.29,158.5,17.33,158.5C251,48.21,317.2,8.22,384,1.13c60.86-6.46,118.91,12.88,176,31.49,59.45,20.15,118.85,39.69,179.25,36.62,47-14.92,123-50.71,185-65.92C997,16,1061,23,1120,38.09c61.63,15.83,119.72,37.38,180,51.4V0Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

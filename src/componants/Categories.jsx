import React, { useState, useContext } from "react";
import { ShoppingBag } from "lucide-react";
import { ShopContext } from "./Context/ShopContext";
import { useNavigate } from "react-router-dom"; // تأكد من وجود مكتبة الراوتر

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart, url, products } = useContext(ShopContext);
  const navigate = useNavigate();

  // 1. استخراج الأقسام الفريدة تلقائياً من قائمة المنتجات
  const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];

  // 2. تصفية المنتجات بناءً على القسم المختار
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section
      className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900
     to-pink-900 text-white py-24 px-6 sm:px-10"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative z-10 max-max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12">
          تسوق حسب الفئة
        </h2>

        {/* أزرار الفئات - تظهر تلقائياً بدون تكرار */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all shadow-lg ${
                selectedCategory === cat
                  ? "bg-linear-to-r from-cyan-400 to-blue-500 text-white shadow-cyan-400/50 scale-105"
                  : "bg-white/10 hover:bg-white/20 text-gray-200"
              }`}
            >
              {cat === "All" ? "All" : cat}
            </button>
          ))}
        </div>

        {/* عرض المنتجات المصفاة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl
               hover:scale-105 hover:shadow-cyan-400/30 transition-all duration-500"
            >
              {/* الضغط على الصورة ينقلك لصفحة المنتج */}
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                className="relative w-full h-64 flex items-center justify-center bg-linear-to-b from-purple-800/40
                 to-transparent cursor-pointer"
              >
                <img
                  src={`${url}/images/` + product.image}
                  className="object-contain w-56 h-56 hover:scale-110 transition-transform duration-500"
                  alt={product.name}
                />
              </div>

              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-cyan-400">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="flex items-center gap-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
                    px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-all text-white shadow-lg active:scale-95"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

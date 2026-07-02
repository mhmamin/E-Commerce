import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../componants/Context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const { cartItems, products, getTotalCartAmount, url, token } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const total = getTotalCartAmount();

  const cartProducts = Object.keys(cartItems)
    .map((id) => {
      const product = products.find((p) => p._id === id);
      return product ? { ...product, quantity: cartItems[id] } : null;
    })
    .filter(Boolean);

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // 1. التحقق من ملء الحقول أولاً
    if (
      !shipping.name ||
      !shipping.address ||
      !shipping.city ||
      !shipping.phone
    ) {
      alert("⚠️ يرجى ملء جميع بيانات الشحن");
      return;
    }

    // 2. تجهيز معرفات المنتجات فقط (Strings) لتتوافق مع الـ Schema في السيرفر
    let orderItems = [];
    products.map((item) => {
      if (cartItems[item._id] > 0) {
        // نرسل الـ _id الخاص بالمنتج فقط لأن السيرفر يتوقع String
        orderItems.push(item._id);
      }
    });

    // 3. بناء بيانات الطلب
    let orderData = {
      address: shipping,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let res = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (res.data.success) {
        alert("✅ تم إرسال الطلب بنجاح! جاري التوجيه للدفع...");

        if (res.data.session_url) {
          window.location.replace(res.data.session_url);
        } else {
          navigate("/");
        }
      } else {
        alert("خطأ من السيرفر: " + (res.data.message || "لم يتم حفظ الطلب"));
      }
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء تنفيذ الطلب");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <section
      className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900
     text-white py-24 px-6 sm:px-10"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">
          إتمام الطلب
        </h2>

        {cartProducts.length === 0 ? (
          <div className="text-center text-gray-300 mt-20 space-y-6">
            <p className="text-xl">السلة فارغة الآن</p>
            <button
              onClick={() => navigate("/")}
              className="bg-linear-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-2xl font-semibold text-white hover:opacity-90 transition-all"
            >
              العودة للتسوق
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Section 1: Cart Items Summary */}
            <div className="space-y-6">
              {cartProducts.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl shadow-lg border border-white/20"
                >
                  <img
                    src={item.image}
                    className="w-20 h-20 object-contain rounded-xl"
                    alt={item.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-300">
                      الكمية: {item.quantity}
                    </p>
                    <p className="text-cyan-400 font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="text-xl font-bold mt-6">
                المجموع الكلي:
                <span className="text-cyan-400 ml-2">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Section 2: Shipping Form */}
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                بيانات الشحن
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  value={shipping.name}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none 
                  focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="العنوان الكامل"
                  value={shipping.address}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none
                   focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="المدينة"
                  value={shipping.city}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none
                   focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="رقم الهاتف"
                  value={shipping.phone}
                  onChange={handleChange}
                  className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none 
                  focus:ring-2 focus:ring-cyan-400"
                />

                <button
                  onClick={placeOrder}
                  className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white 
                  font-semibold py-3 rounded-xl hover:opacity-90 transition-all mt-4"
                >
                  تأكيد الطلب 🚀
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ShopContext } from "./Context/ShopContext";

import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("register");
  const { url, setToken } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("كلمة المرور غير متطابقة ! ");
      return;
    }
    let newUrl = url + "/api/user/register";

    try {
      const res = await axios.post(newUrl, formData);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/", { replace: true });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <section
      className="relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900
     text-white py-24 px-6 sm:px-10 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm p-10 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
          إنشاء حساب جديد
        </h2>

        <form className="flex flex-col gap-6" onSubmit={onSignUp}>
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            value={formData.name}
            onChange={onChangeHandler}
            required
            className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={onChangeHandler}
            required
            className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={onChangeHandler}
            required
            className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="تأكيد كلمة المرور"
            value={formData.confirmPassword}
            onChange={onChangeHandler}
            required
            className="w-full bg-white/15 text-white placeholder-gray-300 px-4 py-3 rounded-xl outline-none 
            focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="submit"
            className="bg-linear-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-2xl font-semibold text-white
             hover:opacity-90 transition-all shadow-lg"
          >
            إنشاء الحساب
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          لديك حساب؟{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 font-semibold cursor-pointer hover:underline"
          >
            تسجيل الدخول
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignUp;

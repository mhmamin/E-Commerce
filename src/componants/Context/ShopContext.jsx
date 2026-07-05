import { createContext, useState, useEffect } from "react";
export const ShopContext = createContext();
import axios from "axios";

const ShopContextProvider = ({ children }) => {
  // 1. تعريف الـ States داخل المكون (Scope)
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const fetchProductsList = async () => {
    try {
      const res = await axios.get(`${url}/api/product/list`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  // 3. جلب بيانات السلة المرتبطة بحساب المستخدم
  const loadCartData = async (userToken) => {
    try {
      const res = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token: userToken } },
      );
      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.log("Error loading cart data:", err);
    }
  };

  // 4. إضافة منتج للسلة
  const addToCart = async (id, quantity = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + quantity,
    }));
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId: id }, // تأكد أن الباكيند يتوقع itemId
          { headers: { token } },
        );
      } catch (err) {
        console.log("Error adding to cart:", err);
      }
    }
  };

  // 5. حذف منتج من السلة
  const removeFromCart = async (id, removeAll = false) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (removeAll || updated[id] <= 1) {
        delete updated[id];
      } else {
        updated[id]--;
      }
      return updated;
    });
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId: id },
          { headers: { token } },
        );
      } catch (err) {
        console.log("Error removing from cart:", err);
      }
    }
  };

  // 6. مسح السلة بالكامل
  const clearCart = async () => {
    if (!token) return;
    try {
      await axios.post(`${url}/api/cart/clear`, {}, { headers: { token } });
      setCartItems({});
    } catch (err) {
      console.log("Error clearing cart:", err);
    }
  };

  // 7. حساب المجموع الكلي
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // 8. حفظ السلة في localStorage (اختياري لو أردت استمرارها بدون تسجيل دخول)
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // 9. التأثير الرئيسي عند تحميل التطبيق (Init)
  useEffect(() => {
    async function initApp() {
      // جلب المنتجات أولاً
      await fetchProductsList();

      // التحقق من التوكن واستعادة السلة
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      } else {
        // إذا لم يوجد توكن، حاول جلب السلة المحلية
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    }
    initApp();
  }, []);

  // 10. القيم التي سيتم مشاركتها في التطبيق
  const value = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    url,
    setToken,
    clearCart,
    setCartItems,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

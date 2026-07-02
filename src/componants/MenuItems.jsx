import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  FolderOpen,
  ShoppingBag,
  Mail,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { useContext } from "react";
import { ShopContext } from "./Context/ShopContext";

export const menuItemsData = [
  { to: "home", label: "Home", Icon: Home },
  { to: "categories", label: "Categories", Icon: FolderOpen },
  { to: "shop", label: "Shop", Icon: ShoppingBag },
  { to: "contact", label: "Contact", Icon: Mail },
];

const MenuItems = ({ setSidbarOpen, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, token, setToken } = useContext(ShopContext);

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setSidbarOpen && setSidbarOpen(false);
    window.location.href = "/login";
  };

  return (
    <div className="flex md:justify-center lg:justify-end">
      <div
        className={
          isMobile
            ? "flex-col space-y-6 items-center px-4 gap-y-2"
            : "flex flex-row w-full items-center justify-center gap-4"
        }
      >
        {menuItemsData.map(({ to, label, Icon }) => (
          <ScrollLink
            key={to}
            to={to}
            smooth={true}
            duration={500}
            offset={-80}
            spy={true}
            onClick={() => {
              // إذا كنت في صفحة تانية غير الرئيسية (مثل السلة أو اللوجن) يرجعك للرئيسية
              if (location.pathname !== "/") {
                navigate("/");
              }
              setSidbarOpen && setSidbarOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all flex-shrink-0 w-auto 
            min-w-[80px] text-gray-200 hover:bg-white/10 hover:text-white hover:shadow-md cursor-pointer"
            activeClass="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg"
          >
            <Icon className="w-6 h-6" />
            <span className="font-semibold text-base">{label}</span>
          </ScrollLink>
        ))}

        {/* زر السلة */}
        <button
          onClick={() => {
            navigate("/cart");
            setSidbarOpen && setSidbarOpen(false);
          }}
          className="relative flex items-center gap-2 px-4 py-3 rounded-lg transition-all text-gray-200
           hover:bg-white/10 hover:text-white hover:shadow-md"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 text-xs font-bold text-white bg-red-500
             rounded-full flex items-center justify-center"
            >
              {totalItems}
            </span>
          )}
        </button>

        {/* التعديل هنا: Login / Logout مع فحص المسار لمنع التضارب بصفحة الـ Login */}
        {!token ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ? (
          <button
            onClick={() => {
              navigate("/login");
              setSidbarOpen && setSidbarOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 text-white 
            font-semibold hover:bg-cyan-500 transition-all"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 text-white" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white
               font-semibold hover:bg-red-600 transition-all"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItems;

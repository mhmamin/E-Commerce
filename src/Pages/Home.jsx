import Hero from "../componants/Hero";
import Features from "../componants/Features";
import Categories from "../componants/Categories";
import Offer from "../componants/Offer";
import Footer from "../componants/Footer";

const Home = () => {
  return (
    <div>
      {/* قسم الهيرو 🟢 */}
      <section id="home">
        <Hero />
      </section>

      {/* قسم المميزات 🟣 */}
      <section id="features">
        <Features />
      </section>

      {/* قسم التصنيفات 🟠 */}
      <section id="categories">
        <Categories />
      </section>

      <section id="shop">
        <Offer />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Home;

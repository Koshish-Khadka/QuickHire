import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Herosection from "../components/Herosection";

const Home = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="pt-18">
        <Herosection />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;

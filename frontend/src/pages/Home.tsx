import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Herosection from "../components/Herosection";
import Category from "../components/Category";
import Workflow from "../components/Workflow";


const Home = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="pt-18">
        <Herosection />
        <Category />
        <Workflow />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;

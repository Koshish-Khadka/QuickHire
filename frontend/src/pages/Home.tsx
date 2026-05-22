import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Herosection from "../components/Herosection";
import Category from "../components/Category";
import Workflow from "../components/Workflow";
// import type { RootState } from "store/store";
// import { useSelector } from "react-redux";

const Home = () => {
  // const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="pt-18">
        <Herosection />
        <Category />
        <Workflow />
        {/* {user?.role === "WORKER" && (
          <div className="pt-18 fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur z-50">
            <Profilesetup />
          </div>
        )} */}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;

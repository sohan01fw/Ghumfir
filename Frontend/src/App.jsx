import { Routes, Route } from "react-router-dom";
import { TripFormProvider } from "./Store/ItineriesContext";
import Footer from "./Components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import TripDetails from "./pages/TripDetails/TripDetails";
import Home from "./pages/Home/Home";
import Trips from "./pages/Trips/Trips";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isTripDetailsPage = location.pathname.includes("/tripDetails");
  const displaySidebar = isTripDetailsPage;
  console.log(displaySidebar);
  return (
    <div className="app-container">
      <div className="main-content">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/trips" exact element={<Trips />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/tripDetails/:itiId" exact element={<TripDetails />} />
          <Route path="/Blog" exact element={<Blog />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
      <Footer displaySidebar={isTripDetailsPage} />
    </div>
  );
}

export default App;

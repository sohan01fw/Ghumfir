import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import TripDetails from "./pages/TripDetails/TripDetails";
import Home from "./pages/Home/Home";
import Trips from "./pages/Trips/Trips";
import About from "./pages/About/About";
import Blog from "./pages/Blog/Blog";
import { useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import TripPlaces from "./pages/TripPlaces/TripPlaces";
import "./App.css";
import Footer from "./Components/Footer/Footer";


function App() {
  const location = useLocation();
  const isTripDetailsPage = location.pathname.includes("/tripDetails");
  const displaySidebar = isTripDetailsPage;
  console.log(displaySidebar);
  return (
    <div className="app-container">
      <div className="">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/trips" exact element={<Trips />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/tripPlaces/:pId" exact element={<TripPlaces />} />
          <Route
            path="/tripDetails/:pId/:itiId"
            exact
            element={<TripDetails />}
          />

          <Route path="/Blog" exact element={<Blog />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

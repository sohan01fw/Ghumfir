import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trips from "./Components/TipsDetails/Trips";
import MainNavigation from "./Components/Navigation/MainNavigation";
import About from "./pages/Home/About";
import { TripFormProvider } from "./Contexts/TripFormContext";
import Footer from "./Components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import Blog from "./pages/Home/Blog";
import TripDetails from "./Components/TipsDetails/TripDetails";
import MapView from "./pages/Home/MapView";

function App() {
  return (
    <div className="app-container">
      <TripFormProvider>
        <Router>
          <MainNavigation />
          <div className="main-content">
            <Routes>
              <Route path="/" exact element={<Trips />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/tripDetails" exact element={<TripDetails />} />
              <Route path="/Blog" exact element={<Blog />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/map" element={<MapView />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </TripFormProvider>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";
import MainNavigation from "./Components/Navigation/MainNavigation";
import About from "./pages/About";
// import GoogleMap from "./Components/map/GoogleMap";
import TripDetails from "./pages/TripDetails";
import { TripFormProvider } from "./Contexts/TripFormContext";
import Footer from "./Components/Footer/Footer";
import Auth from "./pages/Auth";
import Blog from "./pages/Blog";

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
            </Routes>
          
          </div>
          <Footer />
        </Router>
      
      </TripFormProvider>
      </div>
  );
}

export default App;

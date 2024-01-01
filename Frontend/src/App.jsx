import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trips from "./Components/TipsDetails/Trips";
import MainNavigation from "./Components/Navigation/MainNavigation";
import About from "./pages/Home/About";
import { TripFormProvider } from "./Store/ItineriesContext";
import Footer from "./Components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import Blog from "./pages/Home/Blog";
import TripDetails from "./Components/TipsDetails/TripDetails";
import { useParams } from "react-router-dom";

function App() {
  let { itiId } = useParams();
  return (
    <div className="app-container">
      <TripFormProvider>
        <Router>
          <MainNavigation />
          <div className="main-content">
            <Routes>
              <Route path="/" exact element={<Trips />} />
              <Route path="/about" exact element={<About />} />
              <Route
                path="/tripDetails/:itiId"
                exact
                element={<TripDetails />}
              />
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

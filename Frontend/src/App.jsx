import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Trips from "./Components/TipsDetails/Trips";
import MainNavigation from "./Components/Navigation/MainNavigation";
import About from "./pages/Main/About";
import { TripFormProvider } from "./Store/ItineriesContext";
import Footer from "./Components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import Blog from "./pages/Main/Blog";
import TripDetails from "./Components/TipsDetails/TripDetails";
import { useParams } from "react-router-dom";
import Home from "./pages/Main/Home";

function App() {
  let { itiId } = useParams();
  // const location = useLocation();

  // const isTripDetailsPage = location.pathname.includes("/tripDetails");
  return (
    <div className="app-container">
      <TripFormProvider>
        {/* <Router> */}
        {/* {!isTripDetailsPage && <MainNavigation /> } */}
        {/* <MainNavigation /> */}
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
        <Footer />
        {/* </Router> */}
      </TripFormProvider>
    </div>
  );
}

export default App;

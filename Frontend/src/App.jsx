import { Routes, Route, useNavigate } from "react-router-dom";
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
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { useAppState } from "./utils/Hooks/useAppState";
import AiRecommend from "./pages/AiRecommend/AiRecommend";

function App() {
  const location = useLocation();
  const isTripDetailsPage = location.pathname.includes("/tripDetails");
  const displaySidebar = isTripDetailsPage;
  const { state, dispatch } = useAppState();
  const navigate = useNavigate(); // Get the navigate function

  return (
    <div className="app-container">
      <div className="">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/trips" exact element={<Trips />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/airecommend" exact element={<AiRecommend />} />
          <Route path="/tripPlaces/:pId" exact element={<TripPlaces />} />
          <Route
            path="/tripDetails/:pId/:itiId"
            exact
            element={<TripDetails />}
          />
          <Route path="/Blog" exact element={<Blog />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";
import MainNavigation from "./Components/Navigation/MainNavigation";
import About from "./pages/About";
// import GoogleMap from "./Components/map/GoogleMap";
import TripDetails from "./pages/TripDetails";
import { TripFormProvider } from "./Contexts/TripFormContext";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <TripFormProvider>
        <Router>
          <MainNavigation />
          <main>
            <Routes>
              <Route path="/" exact element={<Trips />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/tripDetails" exact element={<TripDetails />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </TripFormProvider>
    </>
  );
}

export default App;

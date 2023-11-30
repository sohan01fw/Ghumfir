import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";
import MainNavigation from "./Components/Navigation/MainNavigation";
import About from "./pages/About";
import GoogleMap from "./Components/map/GoogleMap";

function App() {
  return (
    <>
      <Router>
          <MainNavigation />

      <main>
      <Routes>
          <Route path="/" exact element={<Trips />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/tripDetails" exact element={<GoogleMap />} />

        </Routes>
      </main>
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";
import MainNavigation from "./Components/Navigation/MainNavigation";
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        {/*   <MainNavigation /> */}
        <Routes>
          <Route path="/" exact element={<Trips />} />
          <Route path="/about" exact element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

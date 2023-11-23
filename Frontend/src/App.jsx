
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trips from './trip/pages/Trips';
import MainNavigation from './shared/components/Navigation/MainNavigation';


function App() {

  return (
  <Router>
    
    <MainNavigation />
    <Routes>          
    <Route path='/' exact Component={Trips}>
    </Route>
    </Routes>
  </Router>    
  );
}

export default App

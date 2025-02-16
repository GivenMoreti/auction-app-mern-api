import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import CreateAuction from './pages/auctions/CreateAuction';
import Auctions from './pages/auctions/auctions';
import Nav from './components/Nav';
import Details from './pages/auctions/Details';
import Footer from './components/Footer';

function App() {
  
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route element={<Auctions />} path='/' />
          <Route element={<Details />} path='/auctions/:id' />
          <Route element={<CreateAuction/> } path='/create-auction' />
          <Route element={<NotFound/>} path='*' />
        </Routes>
        <Footer/>
        
     </Router>
      
    </>
  )
}

export default App

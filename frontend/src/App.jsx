import './App.css'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import CreateAuction from './pages/auctions/CreateAuction';
import Auctions from './pages/auctions/auctions';
import Nav from './components/Nav';
import Details from './pages/auctions/Details';
import Footer from './components/Footer';
import Bids from "./pages/bids/Bids";
import Items from "./pages/items/Items";
import EditItem from './pages/items/EditItem';


function App() {
  
  return (
    <>
      <Router>
        <Nav/>
        <Routes>
           <Route element={<Auctions />} path='/' />
          <Route element={<Bids />} path='/bids' />
         
          <Route element={<Items />} path='/items' />
          <Route element={<EditItem />} path='/items/:id' />
          <Route element={<Details />} path='/auctions/:id' />
          
          <Route element={<CreateAuction/> } path='/create-auction/:id' />
          <Route element={<NotFound/>} path='*' />
        </Routes>
        <Footer/>
        
     </Router>
      
    </>
  )
}

export default App

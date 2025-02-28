import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import CreateAuction from "./pages/auctions/CreateAuction";
import Auctions from "./pages/auctions/auctions";
import Nav from "./components/Nav";
import Details from "./pages/auctions/Details";
import Footer from "./components/Footer";
import Bids from "./pages/bids/Bids";
import Items from "./pages/items/Items";
import EditItem from "./pages/items/EditItem";
import CreateItem from "./pages/items/CreateItem";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route element={<Auctions />} path="/" />
          <Route element={<Login />} path="/login" />
           <Route element={<Register />} path="/register" />
          
          <Route
            element={
              <ProtectedRoute>
                <Bids />
              </ProtectedRoute>
            }
            path="/bids"
          />

          <Route
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
            path="/items"
          />
          <Route
            element={
              <ProtectedRoute>
                <CreateItem />
              </ProtectedRoute>
            }
            path="/add-new-item"
          />
          <Route
            element={
              <ProtectedRoute>
                <EditItem />
              </ProtectedRoute>
            }
            path="/items/:id"
          />
          <Route
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
            path="/auctions/:id"
          />

          <Route
            element={
              <ProtectedRoute>
                <CreateAuction />
              </ProtectedRoute>
            }
            path="/create-auction/:id"
          />
          <Route element={<NotFound />} path="*" />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

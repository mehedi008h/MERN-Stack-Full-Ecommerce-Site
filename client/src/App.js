import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/header/Navbar";
import Login from "./pages/auth/login/Login";
import Products from "./pages/products/Products";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/products" component={Products} exact />
      </Router>
    </div>
  );
}

export default App;

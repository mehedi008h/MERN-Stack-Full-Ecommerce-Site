import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/header/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route path="/" component={Home} exact />
      </Router>
    </div>
  );
}

export default App;

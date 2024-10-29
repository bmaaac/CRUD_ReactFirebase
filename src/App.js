import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Footer } from "./components/Layout";
import Home from "./components/Home";
import Write from "./components/Write";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

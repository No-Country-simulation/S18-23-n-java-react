import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterPropertyPage from "./pages/Register-property/RegisterPropertyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register-property" element={<RegisterPropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;

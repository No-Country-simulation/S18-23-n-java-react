import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { AlertProvider } from "./context/Alert/AlertProvider";
import AlertElement from "./components/Alert/AlertElement";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <AlertElement />
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;

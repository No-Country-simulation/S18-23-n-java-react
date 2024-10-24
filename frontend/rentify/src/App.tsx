import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import "./App.css";
import RegisterPropertyPage from "./pages/Register-property/RegisterPropertyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register-property" element={<RegisterPropertyPage />} />
        
      </Routes>
    </Router>
=======
import { AuthProvider } from "./context";
import LandingPage from "./pages/Landing/LandigPage";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { AlertProvider } from "./context/Alert/AlertProvider";
import AlertElement from "./components/Alert/AlertElement";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            <AlertElement />
          </Router>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
>>>>>>> d2ca3f191a6e7d819ba0de0be16394c3fc1f6891
  );
}

export default App;

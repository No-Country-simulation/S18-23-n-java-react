import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context";
import LandingPage from "./pages/Landing/LandigPage";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { AlertProvider } from "./context/Alert/AlertProvider";
import AlertElement from "./components/Alert/AlertElement";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import RegisterPropertyPage from "./pages/Register-property/RegisterPropertyPage";
import MyListProperty from "./components/MyListProperty/MyListProperty";

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
              <Route path="/register-property" element={<RegisterPropertyPage />} />
              <Route path="/mylistproperty" element={<MyListProperty />} />

            </Routes>
            <AlertElement />
          </Router>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

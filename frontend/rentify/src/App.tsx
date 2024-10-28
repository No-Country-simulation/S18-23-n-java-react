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
import ExplorePage from "./pages/Explore/ExplorePage";

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
              <Route path="/explore" element={<ExplorePage />} />
            </Routes>
            <AlertElement />
          </Router>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

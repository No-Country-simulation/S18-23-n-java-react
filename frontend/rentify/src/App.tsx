import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import ExplorePage from "./pages/Explore/ExplorePage";
import { AuthProvider, AlertProvider } from "./context";
import AlertElement from "./components/Alert/AlertElement";
import PropertyInfoPage from "./pages/PropertyInfo/PropertyInfoPage";

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
              <Route path="/property/:propertyId" element={<PropertyInfoPage />} />
            </Routes>
            <AlertElement />
          </Router>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

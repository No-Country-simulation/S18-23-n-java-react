import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AlertProvider } from "./context";
import { ThemeProvider } from "@emotion/react";
import AlertElement from "./components/Alert/AlertElement";
import Navbar from "./components/Navbar/Navbar";
import { LandingPage, LoginPage, ExplorePage, PropertyInfoPage, AuthPage, ProfilePage, RegisterPropertyPage, ModifyPropertyPage } from "./pages";
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
              <Route path="/explore" element={<ExplorePage />} />
              <Route
                path="/property/:propertyId"
                element={<PropertyInfoPage />}
              />
              <Route element={<AuthPage />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/register-property"
                  element={<RegisterPropertyPage />}
                />
                <Route
                  path="/modify-property/:propertyId"
                  element={<ModifyPropertyPage />}
                />
              </Route>
              <Route path="*" element={<Navigate to={"/"}/>}></Route>
            </Routes>
            <AlertElement />
          </Router>
        </AlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

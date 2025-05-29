import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import ActualHome from "./pages/ActualHome";
import Footer from "./components/Footer";
import SignUpPage from "./pages/Singup";
import LoginPage from "./pages/Login";
import VerifyEmail from "./pages/otp";
import EnterOTP from "./pages/enterotp";
import MyProfile from "./pages/profile";

import NavigationHeader from "./components/header";

function App() {
  const { user, setUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // Paths where global header should NOT show
  const noHeaderPaths = ["/", "/dashboard", "/login", "/signup", "/verify", "/verify-otp"];

  const showGlobalHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col">
      {showGlobalHeader && <NavigationHeader />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/verify-otp" element={<EnterOTP />} />
          <Route path="/profile" element={<MyProfile />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={user ? <ActualHome /> : <HomePage />}
          />

          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer visible on every page */}
      <Footer />

      {/* Global Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;

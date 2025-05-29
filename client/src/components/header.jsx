import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, FilePlus, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import UserMenu from "./UserMenu"; // your existing UserMenu component

export default function NavigationHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Home className="w-6 h-6 text-blue-600 mr-2" />
          <span className="font-bold text-xl text-blue-600">Avocation</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <button
            onClick={() => navigate("/jobs")}
            className="hover:text-blue-600 transition"
          >
            Find Jobs
          </button>
          <button
            onClick={() => navigate("/freelancers")}
            className="hover:text-blue-600 transition"
          >
            Find Freelancers
          </button>
          <button
            onClick={() => navigate("/post-job")}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
          >
            <FilePlus className="w-4 h-4" /> Post a Job
          </button>
          <button
            onClick={() => navigate("/blog")}
            className="hover:text-blue-600 transition"
          >
            Blog
          </button>
          <button
            onClick={() => navigate("/about")}
            className="hover:text-blue-600 transition"
          >
            About Us
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-blue-600 transition"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-700 hover:text-blue-600 transition flex items-center gap-1"
              >
                <LogIn className="w-5 h-5" /> Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition flex items-center gap-1"
              >
                <UserPlus className="w-5 h-5" /> Sign Up
              </button>
            </>
          ) : (
            <UserMenu user={user} />
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-medium text-gray-700">
          {[
            ["jobs", "Find Jobs"],
            ["freelancers", "Find Freelancers"],
            ["post-job", "Post a Job"],
            ["blog", "Blog"],
            ["about", "About Us"],
            ["contact", "Contact"],
          ].map(([route, label]) => (
            <button
              key={route}
              onClick={() => {
                navigate(`/${route}`);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left"
            >
              {label}
            </button>
          ))}
          {!user && (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

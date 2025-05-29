import { useState } from "react";
import { Input } from "../components/ui/Input";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData,
      { withCredentials: true }
    );

    toast.success(response.data.message || "Logged in successfully!");

    setUser(response.data.user);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Save the token here (add this line)
    localStorage.setItem("token", response.data.token);

    navigate("/dashboard");
  } catch (err) {
    const errorMessage =
      err.response?.data?.message ||
      err.message ||
      "Something went wrong. Please try again.";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 font-sans text-white">
      <header className="px-8 py-4 flex justify-between items-center shadow-lg bg-black/80">
        <h1 className="text-3xl font-bold">
          Freelance<span className="text-blue-400">Pro</span>
        </h1>
        <nav className="space-x-8 text-lg">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/signup" className="hover:text-blue-400">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center pt-24 px-4">
        <h2 className="text-4xl font-bold mb-2 text-center">
          Welcome Back to <span className="text-blue-400">Avocation</span>
        </h2>
        <p className="text-gray-300 mb-8 text-center">Log in to continue</p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white/10 p-10 rounded-xl shadow-lg backdrop-blur-md"
        >
          <Input
            type="text"
            name="emailOrUsername"
            placeholder="Email or Username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            autoComplete="username"
            required
            className="bg-white/10 text-white placeholder-gray-400 border border-gray-500"
          />

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="bg-white/10 text-white placeholder-gray-400 border border-gray-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-400 px-5 py-2 text-white font-medium rounded-lg transition"
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </div>

          <p className="text-sm text-center text-gray-300">
            Don’t have an account?{" "}
            <Link to="/signup" className="hover:text-blue-400 text-blue-300">
              Sign Up
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;

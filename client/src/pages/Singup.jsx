import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        { withCredentials: true }
      );
      alert(res.data.message || "Registered successfully!");
      navigate("/verify-otp?email=" + formData.email);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white font-sans">
      <header className="flex justify-between items-center px-8 py-5 backdrop-blur bg-black/30 shadow-md border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-wide">
          Freelance<span className="text-blue-400">Pro</span>
        </h1>
        <nav className="space-x-6 text-lg font-medium text-gray-300">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/login" className="hover:text-blue-400 transition">Log In</Link>
        </nav>
      </header>

      <main className="flex justify-center items-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl bg-slate-800/70 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-10"
        >
          <h2 className="text-4xl font-bold text-center mb-2 text-white">
            Create Your <span className="text-blue-400">Profile</span>
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Start your freelancing journey with us
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-400 text-center font-medium">{error}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FloatingInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <FloatingInput
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <FloatingInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              {/* Password input with toggle */}
              <div className="relative">
                <FloatingInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[55%] transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Select Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-md bg-slate-700 text-white border border-white/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="freelancer">Freelancer</option>
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>

              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-60"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <p className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

const FloatingInput = ({ label, type = "text", name, value, onChange }) => (
  <div className="relative w-full">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="peer w-full px-4 pt-6 pb-2 rounded-md bg-slate-700 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={label}
    />
    <label
      htmlFor={name}
      className="absolute left-4 top-2 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"
    >
      {label}
    </label>
  </div>
);

export default SignUpPage;

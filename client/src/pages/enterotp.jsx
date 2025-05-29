import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const EnterOTP = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setResendMessage("");

    if (!otp) return setError("Please enter the OTP.");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/verify-email", {
        email,
        otp,
      });

      alert(res.data.message || "Email verified successfully!");
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid OTP or something went wrong.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setResendMessage("");
    try {
      const res = await axios.post("http://localhost:3000/api/auth/resend-otp", { email });
      setResendMessage(res.data.message || "OTP resent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
      <p className="mb-6 text-gray-300 text-center">
        An OTP has been sent to <span className="text-blue-400">{email}</span>
      </p>

      <form onSubmit={handleVerify} className="w-full max-w-md space-y-4">
        {error && <p className="text-red-400 text-center">{error}</p>}
        {resendMessage && <p className="text-green-400 text-center">{resendMessage}</p>}

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 rounded-lg text-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-400 px-4 py-2 text-white rounded-lg transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-4">
          <p>Didn't receive OTP?</p>
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-blue-400 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnterOTP;

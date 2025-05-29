import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sendVerificationEmail = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/verify-email", { email });
        setStatus("success");
        setMessage(res.data.message || "Verification email sent. Please check your inbox.");
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Failed to send verification email.");
      }
    };

    if (email) sendVerificationEmail();
    else {
      setStatus("error");
      setMessage("No email provided.");
    }
  }, [email]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-lg text-center max-w-xl">
        {status === "loading" && "Sending verification email..."}
        {status !== "loading" && message}
      </p>

      <button
        className="mt-8 px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition"
        onClick={() => navigate("/login")}
      >
        Back to Login
      </button>
    </div>
  );
};

export default VerifyEmail;

// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom"; // Correctly importing the navigate function
import VideoBackground from "../components/VideoBackground";
import { Button } from "../components/ui/button";
import { AuroraText } from "../components/magicui/aurora-text";
import bg1 from "../assets/bg1.jpg";
import CategoryCardsOverlay from "../components/cardCom.jsx";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";

const companyNames = ["Google", "Amazon", "Netflix", "Meta", "OpenAI"];

const HomePage = () => {
  const navigate = useNavigate(); // Using the useNavigate hook to get the navigate function

  return (
    <div>
      <div className="relative min-h-screen text-white font-sans">
        {/* 🎥 Background Video */}
        <div className="h-[30px]">
          <VideoBackground />
        </div>

        {/* 🖤 Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* 🔝 Header */}
        <header className="absolute top-0 left-0 w-full bg-gradient-to-r from-black/50 via-black/30 to-black/50 px-8 py-4 flex justify-between items-center z-50 shadow-lg">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Freelance<span className="text-blue-400">Pro</span>
          </h1>

          <div className="flex items-center space-x-6">
            <a
              href="#find-talent"
              className="relative text-white font-medium tracking-wide hover:text-blue-400 transition duration-300 group"
            >
              Find Talent
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="#post-job"
              className="relative text-white font-medium tracking-wide hover:text-blue-400 transition duration-300 group"
            >
              Post a Job
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href="#how-it-works"
              className="relative text-white font-medium tracking-wide hover:text-blue-400 transition duration-300 group"
            >
              How It Works
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            {/* Buttons... */}
            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-400 text-white px-6 py-2 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:scale-105 transition-all duration-300 font-semibold backdrop-blur-md"
            >
              Sign Up
            </button>

            <button
              onClick={(e) => {
                navigate("/login");
              }}
              className="bg-gradient-to-tr from-gray-700 via-gray-600 to-gray-800 text-white px-6 py-2 rounded-full shadow-inner hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold backdrop-blur-md border border-white/20"
            >
              Login
            </button>
          </div>
        </header>

        {/* 🌟 Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 pt-24">
          <AuroraText className="text-5xl sm:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Crafting Digital Solutions for Your Business
          </AuroraText>

          <p className="text-xl sm:text-2xl max-w-2xl drop-shadow-md">
            I help startups and entrepreneurs build fast, responsive, and scalable web applications. Specializing in React, Node.js, and UI/UX design.
          </p>
          <Button asChild className="bg-blue-300 mt-8 px-6 py-3 text-black font-semibold rounded-full hover:bg-blue-400">
            <a href="#contact">Let's Work Together</a>
          </Button>
        </main>
      </div>

      {/* 🖼️ Background Image Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <img src={bg1} alt="Background" className="w-full h-full object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Horizontal Scroll Logos */}
        <div className="absolute top-0 w-full mt-2 overflow-hidden z-10">
          <VelocityScroll defaultVelocity={3} numRows={1}>
            <div className="flex items-center gap-8 px-8">
              {companyNames.map((name, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm hover:bg-white/20 transition duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
                    {name[0]}
                  </div>
                  <span className="text-white text-lg font-medium">{name}</span>
                </div>
              ))}
            </div>
          </VelocityScroll>
        </div>

        {/* ✨ Promotional Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-0 mt-40">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Turn Ambition Into Reality with <span className="text-blue-400">Avocation</span>
          </h1>

          {[ 
            ["Top Talent, Right Here", "Discover expert freelancers, explore their portfolios, and read genuine client feedback. Your perfect project partner is just a few clicks away."],
            ["Lightning-Fast Responses", "Get offers within seconds. No delays, no commitments—just skilled freelancers ready to bring your vision to life."],
            ["Work That Speaks for Itself", "Join a global community of over 60 million professionals. From startups to scale-ups, we've got your back with top-tier talent."],
            ["Stay in Charge", "Manage projects seamlessly—chat live, receive updates, and stay on track from anywhere with our intuitive mobile app."],
            ["Take the Leap", "Great ideas deserve great execution. Start your journey today with Avocation."]
          ].map(([title, content], i) => (
            <p key={i} className="text-lg md:text-xl text-white max-w-3xl mb-6">
              <strong className="text-blue-300">{title}</strong><br />
              {content.includes("Avocation") ? (
                <>
                  {content.replace("Avocation", "")}
                  <span className="text-blue-400 font-semibold">Avocation</span>.
                </>
              ) : content}
            </p>
          ))}
        </div>
      </div>

      {/* 🗂️ Category Cards */}
      <div className="relative w-full h-screen overflow-hidden">
        <CategoryCardsOverlay />
      </div>
    </div>
  );
};

export default HomePage;

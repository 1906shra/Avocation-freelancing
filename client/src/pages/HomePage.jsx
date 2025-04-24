// src/pages/HomePage.jsx
import VideoBackground from "../components/VideoBackground";
import { Button } from "../components/ui/button";
import { AuroraText } from "../components/magicui/aurora-text";
import bg1 from "../assets/bg1.jpg";
import  bg21 from "../assets/bg21.jpeg"
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";
import CategoryCardsOverlay from "../components/cardCom.jsx";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";




const companyNames = ["Google", "Amazon", "Netflix", "Meta", "OpenAI"];


const HomePage = () => {
 
  return (
    <div>

    <div className="relative min-h-screen text-white font-sans">
      {/* Background Video */}
      <div className="h-[30px]">

      <VideoBackground />

      </div>
      {/* 🔳 Transparent Black Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* 🔝 Header (on top of overlay) */}
      <header className="absolute top-0 left-0 w-full bg-gradient-to-r from-black/50 via-black/30 to-black/50 px-8 py-4 flex justify-between items-center z-10 shadow-lg">
  <h1 className="text-3xl font-extrabold text-white tracking-wide">
    Freelance<span className="text-blue-400">Pro</span>
  </h1>
  <nav className="space-x-8 text-lg flex items-center">
    <a href="#services" className="text-white hover:text-blue-400 transition duration-300">
      Services
    </a>
    <a href="#portfolio" className="text-white hover:text-blue-400 transition duration-300">
      Portfolio
    </a>
    <a href="#contact" className="text-white hover:text-blue-400 transition duration-300">
      Contact
    </a>
    <InteractiveHoverButton className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 text-base rounded-md shadow-md hover:from-blue-600 hover:to-blue-500 transition duration-300">
  Sign Up
</InteractiveHoverButton>
<InteractiveHoverButton className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 text-base rounded-md shadow-md hover:from-gray-800 hover:to-gray-700 transition duration-300">
  Log In
</InteractiveHoverButton>
  </nav>
</header>


      {/* 🧾 Intro Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
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
    <div className="relative w-full h-screen overflow-hidden">
  {/* Background Image */}
  <img src={bg1} alt="Background" className="w-full h-full object-cover" />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Horizontal Scroll Bar */}
  <div className="absolute top-0 w-full mt-2 overflow-hidden z-10">
    <VelocityScroll defaultVelocity={3} numRows={1}>
      <div className="flex items-center gap-8 px-8">
        {companyNames.map((name, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm hover:bg-white/20 transition duration-300"
          >
            {/* Circle with First Letter */}
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
              {name[0]}
            </div>

            {/* Company Name */}
            <span className="text-white text-lg font-medium">{name}</span>
          </div>
        ))}
      </div>
    </VelocityScroll>
  </div>

  {/* Promotional Text Content */}
 {/* Promotional Text Content */}
 <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-0 mt-40">
  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
    Turn Ambition Into Reality with <span className="text-blue-400">Avocation</span>
  </h1>

  <p className="text-lg md:text-xl text-white max-w-3xl mb-6">
    <strong className="text-blue-300">Top Talent, Right Here</strong><br />
    Discover expert freelancers, explore their portfolios, and read genuine client feedback. Your perfect project partner is just a few clicks away.
  </p>

  <p className="text-lg md:text-xl text-white max-w-3xl mb-6">
    <strong className="text-blue-300">Lightning-Fast Responses</strong><br />
    Get offers within seconds. No delays, no commitments—just skilled freelancers ready to bring your vision to life.
  </p>

  <p className="text-lg md:text-xl text-white max-w-3xl mb-6">
    <strong className="text-blue-300">Work That Speaks for Itself</strong><br />
    Join a global community of over 60 million professionals. From startups to scale-ups, we've got your back with top-tier talent.
  </p>

  <p className="text-lg md:text-xl text-white max-w-3xl mb-6">
    <strong className="text-blue-300">Stay in Charge</strong><br />
    Manage projects seamlessly—chat live, receive updates, and stay on track from anywhere with our intuitive mobile app.
  </p>

  <p className="text-lg md:text-xl text-white max-w-3xl">
    <strong className="text-blue-300">Take the Leap</strong><br />
    Great ideas deserve great execution. Start your journey today with <span className="text-blue-400 font-semibold">Avocation</span>.
  </p>
</div>


</div>


<div className="relative w-full h-screen overflow-hidden">
 
  <CategoryCardsOverlay />
</div>


    </div>
  );
};

export default HomePage;

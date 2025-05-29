import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

import {
  Home,
  FilePlus,
  LogIn,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import UserMenu from "@/components/userMenu";
import { Marquee } from "@/components/magicui/marquee";
import { AuroraText } from "@/components/magicui/aurora-text";

const dummyCategories = [
  "Design", "Development", "Marketing", "Writing", "Data", "Customer Support",
];

const dummyFreelancers = [
  {
    id: 1,
    name: "Alice Johnson",
    skill: "Graphic Designer",
    rating: 4.8,
    bio: "Creative and detail-oriented designer with 5 years of experience.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    skill: "Full Stack Developer",
    rating: 4.9,
    bio: "Passionate developer building scalable web applications.",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 3,
    name: "Carla Green",
    skill: "Content Writer",
    rating: 4.7,
    bio: "Engaging writer who crafts compelling content for brands.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const dummyJobs = [
  {
    id: 1,
    title: "React Developer for SaaS Platform",
    company: "Tech Solutions",
    location: "Remote",
  },
  {
    id: 2,
    title: "Logo Design Needed for Startup",
    company: "Creative Co.",
    location: "New York, USA",
  },
  {
    id: 3,
    title: "SEO Content Writer",
    company: "Marketing Experts",
    location: "Remote",
  },
];

const dummyTestimonials = [
  {
    id: 1,
    name: "Daniel Lee",
    role: "Client",
    feedback:
      "This platform helped me find amazing freelancers quickly and easily!",
  },
  {
    id: 2,
    name: "Jessica Brown",
    role: "Freelancer",
    feedback: "Great place to find quality gigs and clients!",
  },
];

const dummyTrustedBy = [
  "https://dummyimage.com/100x40/ccc/000&text=Company+1",
  "https://dummyimage.com/100x40/ccc/000&text=Company+2",
  "https://dummyimage.com/100x40/ccc/000&text=Company+3",
  "https://dummyimage.com/100x40/ccc/000&text=Company+4",
];

const ActualHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Home className="w-6 h-6 text-blue-600 mr-2" />
            <span className="font-bold text-xl text-blue-600">Avocation</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
            <button onClick={() => navigate("/jobs")} className="hover:text-blue-600 transition">Find Jobs</button>
            <button onClick={() => navigate("/freelancers")} className="hover:text-blue-600 transition">Find Freelancers</button>
            <button onClick={() => navigate("/post-job")} className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition flex items-center gap-1">
              <FilePlus className="w-4 h-4" /> Post a Job
            </button>
            <button onClick={() => navigate("/blog")} className="hover:text-blue-600 transition">Blog</button>
            <button onClick={() => navigate("/about")} className="hover:text-blue-600 transition">About Us</button>
            <button onClick={() => navigate("/contact")} className="hover:text-blue-600 transition">Contact</button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {!user ? (
              <>
                <button onClick={() => navigate("/login")} className="text-gray-700 hover:text-blue-600 transition">
                  <LogIn className="inline w-5 h-5 mr-1" /> Login
                </button>
                <button onClick={() => navigate("/signup")} className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-600 hover:text-white transition">
                  <UserPlus className="inline w-5 h-5 mr-1" /> Sign Up
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
            {["jobs", "freelancers", "post-job", "blog", "about", "contact"].map(route => (
              <button key={route} onClick={() => { navigate(`/${route}`); setIsMobileMenuOpen(false); }} className="block w-full text-left">
                {route.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
              </button>
            ))}
            {!user && (
              <>
                <button onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }} className="block w-full text-left">Login</button>
                <button onClick={() => { navigate("/signup"); setIsMobileMenuOpen(false); }} className="block w-full text-left">Sign Up</button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-24">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="font-extrabold mb-6 leading-tight text-center text-4xl sm:text-[clamp(1.75rem,5vw,3.5rem)]">
  <AuroraText>
    Hire Top Talent or Find Your Dream Gig
  </AuroraText>
</h1>

          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            Connecting clients and freelancers quickly and easily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button onClick={() => navigate("/signup")} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">Get Started</button>
            <button onClick={() => navigate("/post-job")} className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition">Post a Job</button>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: "For Freelancers", color: "text-blue-600", steps: ["Sign up", "Create profile", "Get hired"] },
              { title: "For Clients", color: "text-green-600", steps: ["Post job", "Browse freelancers", "Hire easily"] }
            ].map(({ title, color, steps }, i) => (
              <div key={i} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className={`text-xl font-semibold mb-4 ${color}`}>{title}</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {steps.map((step, idx) => <li key={idx}>{step}</li>)}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {dummyCategories.map((cat) => (
              <div key={cat} className="bg-blue-50 text-blue-700 font-semibold rounded-lg py-4 px-6 text-center cursor-pointer hover:bg-blue-100 transition">
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* Top Freelancers */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Top Freelancers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {dummyFreelancers.map((fl) => (
              <div key={fl.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                <img src={fl.avatar} alt={fl.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <h3 className="text-xl font-semibold">{fl.name}</h3>
                <p className="text-blue-600 font-medium">{fl.skill}</p>
                <p className="text-gray-600 mt-2">{fl.bio}</p>
                <p className="mt-3 font-semibold text-yellow-500">
                  {"⭐".repeat(Math.floor(fl.rating))}
                  <span className="text-gray-400 ml-1">{fl.rating.toFixed(1)}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Jobs */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Recent Jobs Posted</h2>
          <ul className="max-w-4xl mx-auto space-y-4 px-2 sm:px-0 text-gray-800">
            {dummyJobs.map((job) => (
              <li key={job.id} className="border border-gray-300 rounded-lg p-4 hover:shadow-md cursor-pointer transition" onClick={() => navigate(`/jobs/${job.id}`)}>
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company} - {job.location}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Testimonials */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>
          <Marquee pauseOnHover className="bg-gray-50 rounded-xl border shadow-inner p-4">
            {dummyTestimonials.map(({ id, name, role, feedback }) => (
              <blockquote key={id} className="bg-white p-6 rounded-xl shadow-md min-w-[75vw] sm:min-w-[300px] mx-4 flex-shrink-0 italic text-gray-800 border">
                <p>"{feedback}"</p>
                <footer className="mt-4 font-semibold text-right text-sm">
                  — {name}, <span className="text-gray-500">{role}</span>
                </footer>
              </blockquote>
            ))}
          </Marquee>
        </section>

        {/* Trusted By */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-8">Trusted By</h2>
          <div className="flex flex-wrap justify-center items-center gap-10 max-w-6xl mx-auto">
            {dummyTrustedBy.map((logoUrl, i) => (
              <img key={i} src={logoUrl} alt={`Company ${i + 1}`} className="h-8 sm:h-10 object-contain" />
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-blue-600 rounded-lg text-white py-8 sm:py-12 px-4 sm:px-8 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to find your next opportunity or talent?
          </h2>
          <button onClick={() => navigate("/signup")} className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </section>
      </main>
    </div>
  );
};

export default ActualHome;

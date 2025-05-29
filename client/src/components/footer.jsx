import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div>
          <h3 className="text-white font-semibold mb-2">Freelancer</h3>
          <ul className="space-y-1">
            <li>Categories</li>
            <li>Projects</li>
            <li>Contests</li>
            <li>Freelancers</li>
            <li>Enterprise</li>
            <li>Innovation Challenges</li>
            <li>AI Development</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Membership</h3>
          <ul className="space-y-1">
            <li>Preferred Freelancer Program</li>
            <li>Project Management</li>
            <li>Local Jobs</li>
            <li>Photo Anywhere</li>
            <li>Showcase</li>
            <li>API for Developers</li>
            <li>Get Verified</li>
            <li>Desktop App</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">About</h3>
          <ul className="space-y-1">
            <li>About us</li>
            <li>How it Works</li>
            <li>Security</li>
            <li>Investor</li>
            <li>Sitemap</li>
            <li>Stories</li>
            <li>News</li>
            <li>Team</li>
            <li>Awards</li>
            <li>Press Releases</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Terms</h3>
          <ul className="space-y-1">
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Copyright Policy</li>
            <li>Code of Conduct</li>
            <li>Fees and Charges</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Partners</h3>
          <ul className="space-y-1">
            <li>Escrow.com</li>
            <li>Loadshift</li>
            <li>Warrior Forum</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Apps</h3>
          <div className="flex space-x-4 text-2xl mt-2">
            <a href="#" aria-label="Apple Store"><FaApple className="hover:text-white" /></a>
            <a href="#" aria-label="Google Play"><FaGooglePlay className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 py-6 text-center space-y-2 text-xs text-gray-500">
        <p>
          80,523,911 Registered Users &nbsp;|&nbsp; 24,652,511 Total Jobs Posted
        </p>
        <p>
          Freelancer® is a registered Trademark of Freelancer Technology Pty Limited (ACN 142 189 759)
        </p>
        <p>
          © {new Date().getFullYear()} Freelancer Technology Pty Limited
        </p>
      </div>
    </footer>
  );
};

export default Footer;

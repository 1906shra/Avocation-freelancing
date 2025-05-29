import React, { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  Settings,
  HelpCircle,
  Folder,
  Star,
  BadgeCheck,
  BarChart,
  DollarSign,
  Wallet,
  Palette,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Make sure the path is correct

const UserMenu = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 Access user from AuthContext

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItem = (label, Icon, onClick) => (
    <button
      onClick={() => {
        onClick();
        setOpen(false);
      }}
      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 gap-2 whitespace-nowrap"
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition font-medium focus:outline-none"
      >
        <User className="w-6 h-6" />
        {user?.name || user?.username || "User"} {/* 👈 Show actual name or fallback */}
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-64 max-w-[90vw] bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="py-1">
            {menuItem("View Profile", User, () => navigate("/profile"))}
            {menuItem("Projects", Folder, () => navigate("/projects"))}
            {menuItem("Membership", BadgeCheck, () => navigate("/membership"))}
            {menuItem("Ranking", Star, () => navigate("/ranking"))}
            {menuItem("Account Analytics", BarChart, () => navigate("/analytics"))}
            {menuItem("Bid Insights", Users, () => navigate("/insights"))}
          </div>

          <hr className="border-t border-gray-200" />

          <div className="py-1">
            {menuItem("Settings", Settings, () => navigate("/settings"))}
            {menuItem("Theme: Light", Palette, () => {/* theme logic */})}
            {menuItem("Support", HelpCircle, () => navigate("/support"))}
          </div>

          <hr className="border-t border-gray-200" />

          <div className="py-1">
            {menuItem("Balance ₹0.00", DollarSign, () => navigate("/wallet"))}
            {menuItem("Add Funds", Wallet, () => navigate("/wallet/add"))}
            {menuItem("Withdraw Funds", Wallet, () => navigate("/wallet/withdraw"))}
            {menuItem("Transaction History", Wallet, () => navigate("/wallet/transactions"))}
            {menuItem("Financial Dashboard", LayoutDashboard, () => navigate("/dashboard/finance"))}
            {menuItem("Payment Sharing", DollarSign, () => navigate("/wallet/sharing"))}
          </div>

          <hr className="border-t border-gray-200" />

          <div className="py-1">
            {menuItem("Logout", LogOut, () => {
              if (onLogout) onLogout();
              else navigate("/logout");
            })}
          </div>

          <div className="text-xs text-gray-400 px-4 py-2 break-words">
            App: <span className="font-mono">5ef649e</span> <br />
            Build: 1747690725 / 2025-05-20
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

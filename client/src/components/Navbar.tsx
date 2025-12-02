"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";

/**
 * Navbar Component
 * Responsive navigation bar with mobile menu
 */
export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!user;

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
  ];

  const authLinks = isAuthenticated
    ? [{ href: "/dashboard", label: "Dashboard" }]
    : [
        { href: "/login", label: "Login" },
        { href: "/register", label: "Register" },
      ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">🏪 MarketPlace</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex space-x-4">
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    link.label === "Dashboard"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Logout button when authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout();
                    router.replace('/login');
                  }}
                  className="ml-2 px-3 py-1 rounded-md bg-red-100 text-red-700 text-sm hover:bg-red-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col space-y-1.5"
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-transform ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-transform ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-2 pt-2 border-t">
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition ${
                    link.label === "Dashboard"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

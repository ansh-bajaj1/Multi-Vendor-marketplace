"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthContext";

/**
 * Dashboard Page
 * Protected dashboard placeholder for vendors/admin/users
 */
export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <p className="text-xl text-gray-600 mb-4">
              {user ? `Welcome, ${user.name}` : "🔐 Protected Dashboard (Authentication Required)"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: "📊", title: "Analytics", desc: "View your sales data" },
                { icon: "📦", title: "Products", desc: "Manage your inventory" },
                { icon: "👥", title: "Customers", desc: "Track customer orders" },
              ].map((item, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05 }}>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-12 text-gray-600 text-lg">
            Coming Soon: Full dashboard functionality with real data
          </p>
        </motion.div>
      </div>
    </div>
  );
}

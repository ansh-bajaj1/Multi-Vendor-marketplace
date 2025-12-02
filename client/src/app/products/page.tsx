"use client";

import { motion } from "framer-motion";

/**
 * Products Page
 * Placeholder for product listing
 */
export default function Products() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Product Listing
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            🚧 Product Listing Coming Soon
          </p>

          <div className="inline-block bg-blue-50 rounded-lg p-12 border-2 border-blue-200">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg">
              We're working on bringing you amazing products from our vendors.
              <br />
              Check back soon!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

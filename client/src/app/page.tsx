"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HealthCard from "@/components/HealthCard";

/**
 * Home Page
 * Hero section with API health status and call-to-action
 */
export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
        >
          Mini Multi-Vendor
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Marketplace
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Connect vendors and customers. Shop from multiple sellers in one
          place. Fast, secure, and reliable.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition text-lg"
            >
              Explore Products →
            </motion.button>
          </Link>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition text-lg"
            >
              Join as Vendor
            </motion.button>
          </Link>
        </motion.div>

        {/* API Health Card */}
        <motion.div variants={itemVariants}>
          <HealthCard />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast & Reliable",
                desc: "Lightning-fast performance with 99.9% uptime",
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "Industry-standard encryption for safe transactions",
              },
              {
                icon: "🌍",
                title: "Global Reach",
                desc: "Connect with vendors and customers worldwide",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 text-center bg-gray-50 rounded-lg hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

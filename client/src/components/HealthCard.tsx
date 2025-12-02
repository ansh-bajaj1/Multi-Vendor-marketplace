"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchHealth, HealthResponse } from "@/utils/api";

/**
 * HealthCard Component
 * Displays API health status with visual indicator
 */
export default function HealthCard() {
  const { data, isLoading, error } = useQuery<HealthResponse>({
    queryKey: ["health"],
    queryFn: fetchHealth,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  const isHealthy = data?.success ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              API Status
            </h3>
            {isLoading ? (
              <p className="text-gray-600">Checking health...</p>
            ) : error ? (
              <p className="text-red-600 font-medium">
                ✗ Connection Failed
              </p>
            ) : (
              <p
                className={`font-medium ${
                  isHealthy ? "text-green-600" : "text-red-600"
                }`}
              >
                {isHealthy ? "✓ API Healthy" : "✗ API Offline"}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {data?.message || "http://localhost:5000"}
            </p>
          </div>

          {/* Status Indicator */}
          <motion.div
            animate={{
              scale: isHealthy ? [1, 1.2, 1] : 1,
            }}
            transition={{ repeat: isHealthy ? Infinity : 0, duration: 2 }}
            className={`w-4 h-4 rounded-full ${
              isLoading
                ? "bg-yellow-500"
                : isHealthy
                  ? "bg-green-500"
                  : "bg-red-500"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

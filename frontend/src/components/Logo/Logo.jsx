import { motion } from "framer-motion"; // For animations

export default function Logo() {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      {/* Logo Text with Animation */}
      <motion.div
        className="flex"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h1 className="text-4xl font-bold text-blue-700">Os</h1>
        <h1 className="text-4xl font-bold text-green-700">tri</h1>
        <h1 className="text-4xl font-bold text-red-700">ch</h1>
      </motion.div>

      {/* Optional Icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        whileHover={{ rotate: 15 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </motion.svg>

      {/* Optional Tagline */}
      <p className="text-sm text-gray-600 ml-2">Bid. Win. Celebrate.</p>
    </div>
  );
}
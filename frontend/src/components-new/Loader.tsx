import { motion } from 'framer-motion';

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50">
      {/* Spinner */}
      <motion.div
        className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Loading text */}
      <motion.p
        className="mt-4 text-sm text-gray-600 font-medium"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading
      </motion.p>
    </div>
  );
};
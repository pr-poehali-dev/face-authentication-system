
import React from "react";
import { motion } from "framer-motion";

type LivenessActionType = "blink" | "smile" | "turn-left" | "turn-right" | "nod" | "completed";

interface LivenessActionIndicatorProps {
  action: LivenessActionType;
}

export const LivenessActionIndicator: React.FC<LivenessActionIndicatorProps> = ({ action }) => {
  const renderActionIndicator = () => {
    switch (action) {
      case "blink":
        return (
          <div className="relative">
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-32 h-8 border-2 border-yellow-500 rounded-lg"
            />
            <div className="absolute top-2 left-0 right-0 text-center text-xs text-white bg-black/60 rounded px-1">
              Моргните
            </div>
          </div>
        );
        
      case "smile":
        return (
          <div className="relative">
            <div className="w-32 h-32 border-2 border-yellow-500 rounded-full flex flex-col items-center justify-center">
              <motion.div
                animate={{ 
                  d: ["M 10,20 Q 25,10 40,20", "M 10,10 Q 25,30 40,10"],
                  x: 0
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="smile-animation"
              >
                <svg width="50" height="30" viewBox="0 0 50 30">
                  <path
                    d="M 10,20 Q 25,10 40,20"
                    stroke="yellow"
                    strokeWidth="2"
                    fill="transparent"
                  />
                </svg>
              </motion.div>
            </div>
            <div className="absolute top-0 left-0 right-0 text-center text-xs text-white bg-black/60 rounded px-1">
              Улыбнитесь
            </div>
          </div>
        );
        
      case "turn-right":
        return (
          <div className="relative">
            <div className="flex items-center">
              <div className="w-32 h-32 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ x: [0, 15] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="w-10 h-20 bg-yellow-500/30 rounded-full"
                />
              </div>
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-8 h-8 bg-yellow-500/50 rounded-full ml-4"
              />
            </div>
            <div className="absolute top-0 left-0 right-0 text-center text-xs text-white bg-black/60 rounded px-1">
              Поверните вправо
            </div>
          </div>
        );
        
      case "turn-left":
        return (
          <div className="relative">
            <div className="flex items-center">
              <motion.div
                animate={{ opacity: [0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-8 h-8 bg-yellow-500/50 rounded-full mr-4"
              />
              <div className="w-32 h-32 border-2 border-yellow-500 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ x: [0, -15] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="w-10 h-20 bg-yellow-500/30 rounded-full"
                />
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 text-center text-xs text-white bg-black/60 rounded px-1">
              Поверните влево
            </div>
          </div>
        );
        
      case "nod":
        return (
          <div className="relative">
            <div className="w-32 h-32 border-2 border-yellow-500 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ y: [0, 10] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="w-10 h-20 bg-yellow-500/30 rounded-full"
              />
            </div>
            <div className="absolute top-0 left-0 right-0 text-center text-xs text-white bg-black/60 rounded px-1">
              Кивните головой
            </div>
          </div>
        );
        
      case "completed":
        return (
          <div className="w-32 h-32 border-2 border-green-500 rounded-full flex items-center justify-center">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 13L9 17L19 7"
                stroke="green"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="liveness-action-indicator">
      {renderActionIndicator()}
    </div>
  );
};

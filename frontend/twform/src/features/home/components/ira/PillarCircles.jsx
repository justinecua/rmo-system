import React from "react";
import { pillarsData } from "./pillarsData";
import smcLogo from "../../../../../src/assets/images/smcLogo.png";
import education from "../../../../../src/assets/images/Area1.png";
import health from "../../../../../src/assets/images/Area2.png";
import economics from "../../../../../src/assets/images/Area3.png";
import environment from "../../../../../src/assets/images/Area4.png";
import governance from "../../../../../src/assets/images/Area5.png";

const pillarLogos = {
  education: education,
  health: health,
  economics: economics,
  environment: environment,
  governance: governance,
};

const PillarCircles: React.FC = () => {
  const total = pillarsData.length;
  const radius = 180;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-96 mb-20 mt-10">
      {/* Center circle with theme - updated to match target design */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center p-4 text-center text-white font-medium text-sm z-10">
          <img
            src={smcLogo}
            alt="SMC Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Surrounding circles with images - updated class names */}
      {pillarsData.map((pillar, index) => {
        const angle = index * 72 - 90; // Fixed angle for 5 items (360/5=72)
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div
            key={pillar.id}
            className="absolute w-32 h-32 rounded-full shadow-lg flex items-center justify-center text-white font-medium text-center text-sm p-3 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <img
              src={pillarLogos[pillar.id]}
              alt={pillar.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}

      {/* Connecting lines - updated to match target design */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {pillarsData.map((_, index) => {
          const angle1 = index * 72 - 90;
          const angle2 = ((index + 1) % 5) * 72 - 90;
          const radius = 50;
          const x1 = 50 + Math.cos((angle1 * Math.PI) / 180) * radius;
          const y1 = 50 + Math.sin((angle1 * Math.PI) / 180) * radius;
          const x2 = 50 + Math.cos((angle2 * Math.PI) / 180) * radius;
          const y2 = 50 + Math.sin((angle2 * Math.PI) / 180) * radius;

          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#8884d8"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default PillarCircles;

import React, { useState, useRef } from "react";
import { pillarsData } from "./ira/pillarsData";

// Import logos
import smcLogo from "../../../assets/images/smcLogo.png";
import educationLogo from "../../../assets/images/Area1.png";
import healthLogo from "../../../assets/images/Area2.png";
import economicsLogo from "../../../assets/images/Area3.png";
import environmentLogo from "../../../assets/images/Area4.png";
import governanceLogo from "../../../assets/images/Area5.png";

const pillarLogos = {
  education: educationLogo,
  health: healthLogo,
  economics: economicsLogo,
  environment: environmentLogo,
  governance: governanceLogo,
};

const PillarCircles = ({ activePillar, setActivePillar }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto h-[400px] mb-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-38 h-38 rounded-full bg-white shadow-sm flex items-center justify-center p-1 z-10">
          <img
            src={smcLogo}
            alt="SMC Logo"
            className="w-full h-full object-contain p-4"
          />
        </div>
      </div>

      {pillarsData.map((pillar, index) => {
        const angle = index * 72 - 90;
        const radius = 180;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const isActive = activePillar === pillar.id;

        return (
          <button
            key={pillar.id}
            onClick={() => setActivePillar(pillar.id)}
            className={`absolute w-32 h-32 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
              isActive
                ? "bg-white shadow-md ring-1 ring-indigo-200 z-20"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={pillarLogos[pillar.id]}
                alt={pillar.title}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-70"
                }`}
              />
            </div>
          </button>
        );
      })}

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {pillarsData.map((_, index) => {
          const angle1 = index * 72 - 90;
          const angle2 = ((index + 1) % 5) * 72 - 90;
          const x1 = 50 + Math.cos((angle1 * Math.PI) / 180) * 45;
          const y1 = 50 + Math.sin((angle1 * Math.PI) / 180) * 45;
          const x2 = 50 + Math.cos((angle2 * Math.PI) / 180) * 45;
          const y2 = 50 + Math.sin((angle2 * Math.PI) / 180) * 45;

          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="0"
            />
          );
        })}
      </svg>
    </div>
  );
};

const ResearchPillarCard = ({ pillar, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-6 justify-center items-center text-center border rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
        isActive
          ? "shadow-sm bg-white"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex justify-center items-center p-2">
          <img
            src={pillarLogos[pillar.id]}
            alt={`${pillar.title} logo`}
            className="h-15 w-15 object-contain"
          />
        </div>

        <div>
          <h3
            className={`text-lg font-medium ${isActive ? "" : "text-gray-800"}`}
          >
            {pillar.title}
          </h3>
        </div>
      </div>

      {isActive && (
        <div className="flex flex-col border-t border-gray-100 gap-6 mt-4">
          <div className="px-5 py-4">
            <p className="text-sm text-gray-700">{pillar?.description}</p>
          </div>

          <div className="border-t border-gray-100 px-5 pb-4">
            <h4 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
              Key Topics / Priority Areas
            </h4>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pillar.themes.map((theme, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-4 w-full">
                  <h5 className="text-sm font-medium text-gray-800 mb-2">
                    {theme.name}
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {theme.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HomeInstitutionalAgenda = () => {
  const [activePillar, setActivePillar] = useState(pillarsData[0].id);
  const pillarRefs = useRef({});

  const setRef = (id) => (el) => {
    if (el) {
      pillarRefs.current[id] = el;
    }
  };

  const handlePillarClick = (id) => {
    setActivePillar(id);
    setTimeout(() => {
      const el = pillarRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Institutional Research Agenda
        </h1>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 font-medium">
            "Inspiring National and Global Leadership through Ignacian-Marian
            Transformative Education, Social Empowerment, and Innovative
            Partnerships"
          </p>
        </div>
      </section>

      <section className="mb-20">
        <PillarCircles
          activePillar={activePillar}
          setActivePillar={handlePillarClick}
        />
      </section>

      <section className="mb-16">
        <h2 className="text-lg font-semibold text-center text-gray-500 mb-8">
          There are five research areas that form the foundation of a
          comprehensive research agenda
        </h2>
        <div className="flex flex-col gap-6">
          {pillarsData.map((pillar) => (
            <div key={pillar.id} ref={setRef(pillar.id)}>
              <ResearchPillarCard
                pillar={pillar}
                isActive={activePillar === pillar.id}
                onClick={() => handlePillarClick(pillar.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeInstitutionalAgenda;

const HomeCollegeAgenda = ({ collegeAgenda }) => {
  // Organized research agenda data by college
  const colleges = {
    "Arts and Sciences": [
      "Language, Identity, and Pedagogy (Mother tongue education, Inclusive instruction)",
      "Literary and Cultural Inquiry (Postcolonial narratives, Devotional writing)",
      "Digital Literacy and Innovation (AI-enhanced teaching, Online learning)",
      "Ethics and Servant Leadership (Filipino virtue ethics, Marian values)",
      "Mental Health and Wellbeing (Faith-integrated trauma support, Resilience studies)",
    ],
    "Computer Studies": [
      "Software Development and Intelligent Systems (Educational apps, Decision-support tools)",
      "Artificial Intelligence and Data Science (Healthcare image recognition, Sentiment analysis)",
      "Multimedia and E-Learning Systems (Game-based learning, Interactive platforms)",
      "Cybersecurity and Risk Management (Threat detection, Vulnerability analysis)",
      "Human-Centered Computing (Adaptive interfaces, Emotion-aware systems)",
    ],
    "Hospitality and Tourism": [
      "Sustainable Hospitality (Eco-friendly practices, Post-pandemic recovery)",
      "Culinary Arts and Food Safety (Heritage preservation, Food innovation)",
      "Event Tourism and Conference Management (Community festivals, MICE tourism)",
      "Human Resource Management (Staff motivation, Training programs)",
      "Adventure and Recreational Tourism (Safety protocols, Nature-based development)",
    ],
    Engineering: [
      "Sustainable Infrastructure (Green construction, Energy-efficient designs)",
      "Climate-Resilient Systems (Earthquake-resistant buildings, Flood adaptation)",
      "Smart Transportation (Urban planning, AI traffic management)",
      "Water Resource Management (Harvesting tech, Flood control systems)",
      "Robotics and Intelligent Systems (Industrial automation, Computer vision)",
    ],
    "Nursing and Health Sciences": [
      "Disease Management (NCDs, Communicable diseases, Urban health)",
      "Health Technology (AI in healthcare, Precision medicine)",
      "Mental Health (Workplace programs, Student interventions)",
      "Maternal and Child Care (Service accessibility, Immunization programs)",
      "Health Systems Strengthening (Governance, Service delivery models)",
    ],
    "Business and Accountancy": [
      "Entrepreneurial Innovation (MSME development, Women-led startups)",
      "Business Ethics (Corporate governance, Transparent reporting)",
      "Strategic Management (Sustainability integration, Resilience planning)",
      "Financial Inclusion (SME literacy, Poverty alleviation)",
      "Digital Transformation (Blockchain reporting, AI in auditing)",
    ],
    Criminology: [
      "Crime Prevention (Juvenile diversion, Community safety)",
      "Law Enforcement (Ethical policing, Crisis response)",
      "Criminal Justice (Restorative programs, Inmate education)",
      "Victimology (Gender-based violence, Human rights)",
      "Forensic Science (Digital forensics, Crime scene investigation)",
    ],
  };

  // Color mapping for each college
  const collegeColors = {
    "Arts and Sciences": "bg-indigo-600",
    "Computer Studies": "bg-blue-600",
    "Hospitality and Tourism": "bg-emerald-600",
    Engineering: "bg-green-600",
    "Nursing and Health Sciences": "bg-red-600",
    "Business and Accountancy": "bg-purple-600",
    Criminology: "bg-amber-600",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="mb-6 md:mb-0">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            University Research Agendas
          </h1>
          <p className="text-gray-600 font-light">
            2025-2030 Strategic Research Priorities by College
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          <span className="text-sm text-gray-500">
            Scroll horizontally to explore
          </span>
        </div>
      </div>

      <div className="overflow-x-auto pb-6">
        <div
          className="flex space-x-6"
          style={{ minWidth: `${Object.keys(colleges).length * 320}px` }}
        >
          {Object.entries(colleges).map(([college, items]) => (
            <div key={college} className="flex-shrink-0 w-80">
              <div className={`${collegeColors[college]} p-4 rounded-t-lg`}>
                <h3 className="text-lg font-medium text-white">{college}</h3>
              </div>
              <div className="border border-gray-200 rounded-b-lg shadow-sm h-full">
                <ul className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start">
                        <div
                          className={`flex-shrink-0 h-5 w-5 mt-0.5 ${collegeColors[
                            college
                          ].replace("bg", "text")}`}
                        >
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{item}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Research Alignment Framework
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-indigo-600 mb-2">
              Institutional Priorities
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Transformative Marian Education</li>
              <li>• Digital Innovation</li>
              <li>• Community Engagement</li>
              <li>• Environmental Stewardship</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-green-600 mb-2">
              National Higher Education Agenda
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Industry 4.0 Readiness</li>
              <li>• Sustainable Development</li>
              <li>• Inclusive Growth</li>
              <li>• Global Competitiveness</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-blue-600 mb-2">
              UN Sustainable Development Goals
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Quality Education (SDG 4)</li>
              <li>• Industry Innovation (SDG 9)</li>
              <li>• Climate Action (SDG 13)</li>
              <li>• Peace & Justice (SDG 16)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCollegeAgenda;

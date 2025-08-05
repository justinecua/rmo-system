const HomeCollegeAgenda = () => {
  // Organized research agenda data by college
  const colleges = {
    "Arts and Sciences": [
      "Language, Identity, and Pedagogy",
      "Literary and Cultural Inquiry",
      "Digital Literacy and Innovation",
      "Ethics and Servant Leadership",
      "Mental Health and Wellbeing",
    ],
    "Computer Studies": [
      "Software Development and Intelligent Systems",
      "Artificial Intelligence and Data Science",
      "Multimedia and E-Learning Systems",
      "Cybersecurity and Risk Management",
      "Human-Centered Computing",
    ],
    "Hospitality and Tourism": [
      "Sustainable Hospitality",
      "Culinary Arts and Food Safety",
      "Event Tourism and Conference Management",
      "Human Resource Management",
      "Adventure and Recreational Tourism",
    ],
    Engineering: [
      "Sustainable Infrastructure",
      "Climate-Resilient Systems",
      "Smart Transportation",
      "Water Resource Management",
      "Robotics and Intelligent Systems",
    ],
    "Nursing and Health Sciences": [
      "Disease Management",
      "Health Technology",
      "Mental Health",
      "Maternal and Child Care",
      "Health Systems Strengthening",
    ],
    "Business and Accountancy": [
      "Entrepreneurial Innovation",
      "Business Ethics",
      "Strategic Management",
      "Financial Inclusion",
      "Digital Transformation",
    ],
    Criminology: [
      "Crime Prevention",
      "Law Enforcement",
      "Criminal Justice",
      "Victimology",
      "Forensic Science",
    ],
  };

  const collegeThemes = {
    "Arts and Sciences": {
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      icon: "text-indigo-500",
    },
    "Computer Studies": {
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: "text-blue-500",
    },
    "Hospitality and Tourism": {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: "text-emerald-500",
    },
    Engineering: {
      bg: "bg-green-50",
      border: "border-green-100",
      icon: "text-green-500",
    },
    "Nursing and Health Sciences": {
      bg: "bg-red-50",
      border: "border-red-100",
      icon: "text-red-500",
    },
    "Business and Accountancy": {
      bg: "bg-purple-50",
      border: "border-purple-100",
      icon: "text-purple-500",
    },
    Criminology: {
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: "text-amber-500",
    },
  };

  return (
    <div className="px-5 py-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-14">
        <h1 className="text-3xl font-normal text-gray-800 mb-3">
          College Research Agendas
        </h1>
        {/* <p className="text-gray-500 max-w-2xl mx-auto">
          Strategic research priorities for 2025-2030 academic years
        </p> */}
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(colleges).map(([college, items]) => (
          <div
            key={college}
            className={`rounded-lg border ${collegeThemes[college].border} bg-white shadow-sm hover:shadow-md transition-shadow`}
          >
            <div
              className={`${collegeThemes[college].bg} px-5 py-4 border-b ${collegeThemes[college].border}`}
            >
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${collegeThemes[college].icon} mr-3`}
                ></span>
                {college}
              </h3>
            </div>
            <ul className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 mt-1 ${collegeThemes[college].icon}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{item}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Framework Section */}
      {/* <div className="mt-16">
        <div className="text-center mb-10">
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            Research Alignment Framework
          </h2>
          <p className="text-gray-500">
            How our research connects to broader initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {[
            {
              title: "Institutional Priorities",
              items: [
                "Transformative Marian Education",
                "Digital Innovation",
                "Community Engagement",
                "Environmental Stewardship",
              ],
              color: "text-indigo-500",
              icon: (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              ),
            },
            {
              title: "National Agenda",
              items: [
                "Industry 4.0 Readiness",
                "Sustainable Development",
                "Inclusive Growth",
                "Global Competitiveness",
              ],
              color: "text-green-500",
              icon: (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                </svg>
              ),
            },
            {
              title: "UN SDGs",
              items: [
                "Quality Education (SDG 4)",
                "Industry Innovation (SDG 9)",
                "Climate Action (SDG 13)",
                "Peace & Justice (SDG 16)",
              ],
              color: "text-blue-500",
              icon: (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v4l3 3"></path>
                </svg>
              ),
            },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm"
            >
              <div className={`${section.color} mb-4 flex items-center`}>
                {section.icon}
                <h3 className="font-medium ml-2">{section.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-sm text-gray-600"
                  >
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${section.color} mt-2 mr-2.5`}
                    ></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default HomeCollegeAgenda;

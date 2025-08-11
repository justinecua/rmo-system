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

  const collegeColors = {
    "Arts and Sciences": "text-indigo-600",
    "Computer Studies": "text-blue-600",
    "Hospitality and Tourism": "text-emerald-600",
    Engineering: "text-green-600",
    "Nursing and Health Sciences": "text-red-600",
    "Business and Accountancy": "text-purple-600",
    Criminology: "text-amber-600",
  };

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">
          College Research Agenda
        </h1>
        <div className="w-20 h-0.5 bg-gray-200 mx-auto mt-4"></div>
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(colleges).map(([college, items]) => (
          <div
            key={college}
            className="rounded-lg border border-gray-100 bg-white shadow-xs hover:shadow-sm transition-all"
          >
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className={`text-lg font-medium ${collegeColors[college]}`}>
                {college}
              </h3>
            </div>
            <ul className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 mt-0.5 ${collegeColors[college]}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-600">{item}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCollegeAgenda;

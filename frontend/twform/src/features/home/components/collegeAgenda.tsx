const HomeCollegeAgenda = ({ collegeAgenda }) => {
  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <div className="p-3 bg-indigo-100 rounded-lg mr-4">
          <svg
            className="h-8 w-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            College Research Agendas
          </h2>
          <p className="text-gray-600">
            Department-specific research priorities
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(collegeAgenda).map(([college, agendaItems]) => (
          <div
            key={college}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div
              className={`p-4 ${
                college === "Arts and Sciences"
                  ? "bg-indigo-600"
                  : college === "Engineering"
                  ? "bg-green-600"
                  : "bg-purple-600"
              }`}
            >
              <h3 className="text-lg font-semibold text-white">{college}</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {agendaItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className={`h-5 w-5 mr-2 ${
                        college === "Arts and Sciences"
                          ? "text-indigo-500"
                          : college === "Engineering"
                          ? "text-green-500"
                          : "text-purple-500"
                      }`}
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
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCollegeAgenda;

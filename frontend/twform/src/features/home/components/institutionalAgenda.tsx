const HomeInstitutionalAgenda = ({ institutionalAgenda }) => {
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Institutional Research Agenda
          </h2>
          <p className="text-gray-600">2023-2028 Strategic Plan</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Priority Areas
          </h3>
          <ul className="space-y-4">
            {institutionalAgenda.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Strategic Goals
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-indigo-100 text-indigo-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                  1
                </div>
                <h4 className="font-medium text-gray-800">
                  Enhance research quality and impact
                </h4>
              </div>
              <p className="text-gray-600 text-sm ml-11">
                Through rigorous peer-review and publication support
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-indigo-100 text-indigo-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                  2
                </div>
                <h4 className="font-medium text-gray-800">
                  Foster interdisciplinary collaboration
                </h4>
              </div>
              <p className="text-gray-600 text-sm ml-11">
                Encouraging cross-departmental research initiatives
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="bg-indigo-100 text-indigo-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                  3
                </div>
                <h4 className="font-medium text-gray-800">
                  Strengthen research-practice linkages
                </h4>
              </div>
              <p className="text-gray-600 text-sm ml-11">
                Bridging academic research with real-world applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInstitutionalAgenda;

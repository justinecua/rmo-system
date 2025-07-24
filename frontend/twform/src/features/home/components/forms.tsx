const HomeForms = ({ forms }) => {
  return (
    <div>
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Forms & Templates
          </h2>
          <p className="text-gray-600">
            Downloadable resources for researchers
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form, index) => (
          <a
            key={index}
            href={form.link}
            className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="bg-gray-100 p-6 flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <svg
                  className="h-12 w-12 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">
                {form.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{form.size}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    form.category === "Submission"
                      ? "bg-indigo-100 text-indigo-800"
                      : form.category === "Compliance"
                      ? "bg-green-100 text-green-800"
                      : form.category === "Financial"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {form.category}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HomeForms;

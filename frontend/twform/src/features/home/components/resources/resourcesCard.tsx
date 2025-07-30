const ResourceCard = ({ forms }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      {forms.map((form) => (
        <a
          key={form.resource_id || form.title}
          href={form.link}
          download
          className="group block border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <div className="bg-gray-50 p-6 flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
              {form.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {formatFileSize(form.size)}
            </p>
          </div>
        </a>
      ))}
    </>
  );
};

export default ResourceCard;

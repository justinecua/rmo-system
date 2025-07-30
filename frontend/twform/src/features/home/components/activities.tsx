const HomeActivities = ({ activities }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Upcoming Activities
      </h2>

      {activities.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 h-[60vh] flex justify-center items-center">
          No activities found
        </div>
      ) : (
        <div className="grid gap-8">
          {activities.map((activity) => (
            <div
              key={activity?.id}
              className="bg-white rounded-xl shadow-md overflow-hidden md:flex"
            >
              <div className="md:w-1/3">
                <img
                  className="w-full h-full object-cover min-h-64"
                  src={activity.image}
                  alt={activity.title}
                />
              </div>
              <div className="p-8 md:w-2/3">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {activity.title}
                  </h3>
                  <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {formatDate(activity?.date)}
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{activity?.description}</p>
                <div className="mt-6 flex items-center">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-gray-600">
                    {activity?.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeActivities;

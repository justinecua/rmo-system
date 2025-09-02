export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefeff] text-gray-900 p-4 font-['Segoe_UI',Roboto,-apple-system,sans-serif]">
      <div className="w-full max-w-md p-8 rounded-lg text-center">
        <div className="w-full max-w-[300px] aspect-square mx-auto mb-6">
          <img
            src="../../src/assets/images/undraw.svg"
            alt="Page not found"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-[1.4rem] font-semibold text-[#0c12bb] mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist
        </p>
        <div className="text-sm text-gray-500">
          St. Michael`s College of Iligan - Research Management Office
        </div>
      </div>
    </div>
  );
}

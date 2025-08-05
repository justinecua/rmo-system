const HomeFooter = () => {
  return (
    <footer className="bg-[#03011b] text-white py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 w-full">
          <div className="w-full md:w-[50%] text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">
              SMCII Research Management Office
            </h3>
            <p className="text-gray-400 text-sm">
              The Office of Research oversees the work of the faculty, students,
              and other offices in their research endeavors for human
              advancement, plans, and programs' improvement and progression of
              the quality of life of the community.
            </p>
          </div>

          <div className="w-full md:w-[30%] text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-sm text-gray-400">
              <p>St. Michael's College, Quezon Avenue, Poblacion</p>
              <p className="mt-2">researchoffice@smciligan.edu.ph</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2025 SMCII Research Management Office. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 justify-center md:justify-start">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;

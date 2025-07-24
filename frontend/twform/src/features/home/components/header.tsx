import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HomeHeader = ({
  activeTab,
  setActiveTab,
  selectedAgenda,
  setSelectedAgenda,
  isScrolled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isArticleView = location.pathname.includes("article");

  /**
   * When a tab is clicked:
   * - If on an article page, go back to the homepage and show the selected tab.
   * - If already on the homepage, just switch the tab directly.
   */
  const handleTabClick = (tab) => {
    if (isArticleView) {
      navigate("/", { state: { activeTab: tab } });
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <header
      className={`bg-white shadow-sm sticky top-0 z-5 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-15 h-15 object-cover">
              <img src="../../../src/assets/images/Logo.jpg" alt="" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                SMCII Research Management Office
              </h1>
              <p className="text-sm text-gray-500">
                Promoting excellence in research
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleTabClick("announcements")}
              className={`px-3 py-2 font-medium ${
                activeTab === "announcements"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => handleTabClick("activities")}
              className={`px-3 py-2 font-medium ${
                activeTab === "activities"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Activities
            </button>

            {/* Agenda Dropdown */}
            <div className="relative">
              <select
                value={selectedAgenda}
                onChange={(e) => {
                  setSelectedAgenda(e.target.value);
                  handleTabClick("research-agenda");
                }}
                className="border-none appearance-none bg-white border rounded-md pl-3 pr-8 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="institutional">
                  Institutional Research Agenda
                </option>
                <option value="college">College Research Agenda</option>
              </select>
            </div>

            <button
              onClick={() => handleTabClick("forms")}
              className={`px-3 py-2 font-medium ${
                activeTab === "forms"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Forms
            </button>
            <button
              onClick={() => handleTabClick("articles")}
              className={`px-3 py-2 font-medium ${
                activeTab === "articles"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Articles
            </button>

            <Link to="/login">
              <button className="bg-[#160e73] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200">
                Login
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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

  const handleTabClick = (tab) => {
    if (isArticleView) {
      navigate("/", { state: { activeTab: tab } });
    } else {
      setActiveTab(tab);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 md:py-4" : "py-4 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <img
                src="../../../src/assets/images/Logo.jpg"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                <span className="xl:hidden">SMCII RMO</span>
                <span className="hidden xl:inline">
                  SMCII Research Management Office
                </span>
              </h1>
              <p className="hidden xl:block text-xs md:text-sm text-gray-500">
                Promoting excellence in research
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-500 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <button
              onClick={() => handleTabClick("announcements")}
              className={`px-2 py-1 lg:px-3 lg:py-2 text-sm lg:text-base font-medium ${
                activeTab === "announcements"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => handleTabClick("activities")}
              className={`px-2 py-1 lg:px-3 lg:py-2 text-sm lg:text-base font-medium ${
                activeTab === "activities"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Activities
            </button>

            {/* Agenda Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="capitalize text-gray-600 px-2 py-1 lg:px-3 lg:py-2 text-sm lg:text-base"
                >
                  {selectedAgenda === "institutional"
                    ? "Institutional Agenda"
                    : "College Agenda"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  className="text-sm"
                  onClick={() => {
                    setSelectedAgenda("institutional");
                    handleTabClick("research-agenda");
                  }}
                >
                  Institutional Research Agenda
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-sm"
                  onClick={() => {
                    setSelectedAgenda("college");
                    handleTabClick("research-agenda");
                  }}
                >
                  College Research Agenda
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => handleTabClick("forms")}
              className={`px-2 py-1 lg:px-3 lg:py-2 text-sm lg:text-base font-medium ${
                activeTab === "forms"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Forms
            </button>
            <button
              onClick={() => handleTabClick("articles")}
              className={`px-2 py-1 lg:px-3 lg:py-2 text-sm lg:text-base font-medium ${
                activeTab === "articles"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              Articles
            </button>

            <Link to="/login">
              <button className="bg-[#160e73] text-white px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-indigo-700 transition duration-200 text-sm lg:text-base">
                Login
              </button>
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <button
              onClick={() => handleTabClick("announcements")}
              className={`block w-full text-left px-4 py-2 font-medium ${
                activeTab === "announcements"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => handleTabClick("activities")}
              className={`block w-full text-left px-4 py-2 font-medium ${
                activeTab === "activities"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Activities
            </button>

            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Research Agenda
              </p>
              <button
                onClick={() => {
                  setSelectedAgenda("institutional");
                  handleTabClick("research-agenda");
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded ${
                  selectedAgenda === "institutional"
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Institutional
              </button>
              <button
                onClick={() => {
                  setSelectedAgenda("college");
                  handleTabClick("research-agenda");
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded ${
                  selectedAgenda === "college"
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                College
              </button>
            </div>

            <button
              onClick={() => handleTabClick("forms")}
              className={`block w-full text-left px-4 py-2 font-medium ${
                activeTab === "forms"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Forms
            </button>
            <button
              onClick={() => handleTabClick("articles")}
              className={`block w-full text-left px-4 py-2 font-medium ${
                activeTab === "articles"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Articles
            </button>

            <Link to="/login" className="block px-4 py-2">
              <button className="w-full bg-[#160e73] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default HomeHeader;

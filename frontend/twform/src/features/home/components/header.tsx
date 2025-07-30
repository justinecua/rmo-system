import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="capitalize text-gray-600  px-3 py-2 text-md"
                >
                  {selectedAgenda === "institutional"
                    ? "Institutional Research Agenda"
                    : "College Research Agenda"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-md"
                  onClick={() => {
                    setSelectedAgenda("institutional");
                    handleTabClick("research-agenda");
                  }}
                >
                  Institutional Research Agenda
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-md"
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

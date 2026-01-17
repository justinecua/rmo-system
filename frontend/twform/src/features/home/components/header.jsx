import { useState, forwardRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NavButton = forwardRef(
  ({ children, onClick, className = "", ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      onClick={onClick}
      className={`text-base font-normal text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </Button>
  )
);

NavButton.displayName = "NavButton";

const HomeHeader = ({
  activeTab,
  setActiveTab,
  selectedAgenda,
  setSelectedAgenda,
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

  const getResearchLabel = () => {
    switch (activeTab) {
      case "research-agenda":
        return selectedAgenda === "institutional"
          ? "Institutional Agenda"
          : "College Agenda";
      case "research-camp":
        return "Research Camp";
      case "ipo":
        return "IPO";
      default:
        return "Research";
    }
  };

  const getResourcesLabel = () => {
    switch (activeTab) {
      case "forms":
        return "Forms";
      case "articles":
        return "Articles";
      default:
        return "Resources";
    }
  };

  const isResearchActive = ["research-agenda", "research-camp", "ipo"].includes(
    activeTab
  );

  const isResourcesActive = ["forms", "articles"].includes(activeTab);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12">
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
              <p className="hidden xl:block text-xs text-gray-500">
                Be one of Us!
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-500"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavButton
              onClick={() => handleTabClick("announcements")}
              className={
                activeTab === "announcements"
                  ? "text-indigo-600 border-b-2 border-indigo-600 rounded-none"
                  : ""
              }
            >
              Announcements
            </NavButton>

            <NavButton
              onClick={() => handleTabClick("activities")}
              className={
                activeTab === "activities"
                  ? "text-indigo-600 border-b-2 border-indigo-600 rounded-none"
                  : ""
              }
            >
              Activities
            </NavButton>

            {/* Research Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <NavButton
                  className={
                    isResearchActive
                      ? "text-indigo-600 border-b-2 border-indigo-600 rounded-none"
                      : ""
                  }
                >
                  {getResearchLabel()}
                </NavButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedAgenda("institutional");
                    handleTabClick("research-agenda");
                  }}
                >
                  Institutional Research Agenda
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedAgenda("college");
                    handleTabClick("research-agenda");
                  }}
                >
                  College Research Agenda
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleTabClick("research-camp")}
                >
                  Research Camp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTabClick("ipo")}>
                  IPO
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <NavButton
                  className={
                    isResourcesActive
                      ? "text-indigo-600 border-b-2 border-indigo-600 rounded-none"
                      : ""
                  }
                >
                  {getResourcesLabel()}
                </NavButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem onClick={() => handleTabClick("forms")}>
                  Forms
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTabClick("articles")}>
                  Articles
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/login">
              <button className="bg-[#160e73] text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Login
              </button>
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <button
              onClick={() => handleTabClick("announcements")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              Announcements
            </button>

            <button
              onClick={() => handleTabClick("activities")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              Activities
            </button>

            <div className="px-4">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Research
              </p>
              <button
                onClick={() => handleTabClick("research-agenda")}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              >
                Research Agenda
              </button>
              <button
                onClick={() => handleTabClick("research-camp")}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              >
                Research Camp
              </button>
              <button
                onClick={() => handleTabClick("ipo")}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              >
                IPO
              </button>
            </div>

            <div className="px-4">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Resources
              </p>
              <button
                onClick={() => handleTabClick("forms")}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              >
                Forms
              </button>
              <button
                onClick={() => handleTabClick("articles")}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              >
                Articles
              </button>
            </div>

            <Link to="/login" className="block px-4">
              <button className="w-full bg-[#160e73] text-white py-2 rounded-md">
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

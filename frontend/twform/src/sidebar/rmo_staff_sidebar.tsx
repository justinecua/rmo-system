import { useState, useEffect } from "react";
import {
  BookOpen,
  User,
  Menu,
  LayoutDashboard,
  LogOut,
  Megaphone,
  CalendarPlus2,
  BookText,
  Files,
  ScrollText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/useAuth";

const LS_KEY = "rmoSidebarCollapsed";

const RMOStaffSidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/research_staff/dashboard",
    },
    {
      label: "Announcements",
      icon: Megaphone,
      path: "/research_staff/announcements",
    },
    {
      label: "Activities",
      icon: CalendarPlus2,
      path: "/research_staff/activities",
    },
    // { label: "IRA", icon: BookOpen, path: "/research_staff/ira" },
    // { label: "RCA", icon: BookText, path: "/research_staff/rca" },
    { label: "Forms", icon: Files, path: "/research_staff/forms" },
    {
      label: "Articles",
      icon: ScrollText,
      path: "/research_staff/articles",
    },
    { label: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <aside
      className={cn(
        "bg-white h-[100vh] border-r border-[#f0f0f0] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden fixed z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header with smooth collapse animation */}
        <div className="flex items-center justify-between p-4 mb-2">
          {!collapsed && (
            <span className="font-bold text-xl text-gray-800 transition-all duration-300 opacity-100">
              RMO
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
            className={cn(
              "transition-all duration-300 hover:bg-gray-100 rounded-full",
              collapsed ? "mx-auto" : ""
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu
              size={20}
              className="text-gray-600 transition-transform duration-300 hover:rotate-90"
            />
          </Button>
        </div>

        {/* Navigation with enhanced animations */}
        <nav className="flex flex-col px-3 py-2 space-y-1">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={i}
                to={item.path}
                className={cn(
                  "relative flex items-center px-4 py-3 rounded-lg transition-all duration-300 group",
                  "hover:bg-gray-50 active:scale-95",
                  isActive ? "bg-blue-50 text-blue-600" : "text-gray-600",
                  collapsed ? "justify-center px-0" : "justify-start"
                )}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Active indicator with smooth motion */}
                {isActive && (
                  <span
                    className={cn(
                      "absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full transition-all duration-300",
                      collapsed
                        ? "left-1/2 transform -translate-x-1/2 w-0.5 h-4"
                        : ""
                    )}
                  ></span>
                )}

                <div
                  className={cn(
                    "flex items-center w-full transition-all duration-300",
                    collapsed ? "justify-center" : "justify-start gap-3"
                  )}
                >
                  <div className="relative">
                    <Icon
                      size={19}
                      className={cn(
                        "shrink-0 transition-all duration-200",
                        hoveredItem === i ? "scale-110" : "scale-100",
                        isActive ? "text-blue-600" : "text-gray-600"
                      )}
                    />
                    {/* Subtle pulse effect on hover */}
                    {hoveredItem === i && (
                      <span className="absolute inset-0 rounded-full bg-current opacity-10 animate-ping duration-1000"></span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "transition-all duration-300 ease-out font-medium whitespace-nowrap",
                      "transform origin-left",
                      collapsed
                        ? "opacity-0 w-0 -translate-x-2 overflow-hidden"
                        : "opacity-100 w-auto translate-x-0"
                    )}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Hover underline effect */}
                {!collapsed && hoveredItem === i && (
                  <span className="absolute left-4 right-4 bottom-2 h-0.5 bg-blue-500 opacity-20 rounded-full transition-all duration-300"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile with smooth appearance */}
        <div
          className={cn(
            "mt-auto p-4 border-t border-gray-100 transition-all duration-300 overflow-hidden",
            collapsed ? "max-h-0 py-0 opacity-0" : "max-h-32 py-4 opacity-100"
          )}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-105">
              <User size={18} className="text-gray-600" />
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-gray-800 truncate transition-all duration-300">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-500 transition-all duration-300">
                {user?.user_type}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RMOStaffSidebar;

import { useState } from "react";
import { BookOpen, User, Menu, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/useAuth";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const { user, loading } = useAuth();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "Forms", icon: BookOpen, path: "/student/forms" },
    { label: "Reports", icon: LayoutDashboard, path: "/reports" },
    { label: "Logout", icon: LogOut, path: "/logout" },
  ];

  return (
    <aside
      className={cn(
        "bg-white h-full border-r border-[#f0f0f0] transition-all duration-500 ease-in-out overflow-hidden",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 mb-2">
          {!collapsed && (
            <span className="font-bold text-xl text-gray-800 transition-opacity duration-500">
              RMO
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "transition-all hover:bg-gray-100 rounded-full",
              collapsed ? "mx-auto" : ""
            )}
          >
            <Menu size={20} className="text-gray-600" />
          </Button>
        </div>

        {/* Navigation */}
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
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50",
                  collapsed ? "justify-center px-0" : "justify-start"
                )}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {isActive && (
                  <span
                    className={cn(
                      "absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full transition-all duration-300",
                      collapsed ? "left-1/2 -translate-x-1/2 w-0.5 h-4" : ""
                    )}
                  ></span>
                )}

                <div
                  className={cn(
                    "flex items-center w-full",
                    collapsed ? "justify-center p-2" : "justify-start"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "shrink-0 transition-transform duration-200",
                      hoveredItem === i ? "scale-110" : "scale-100"
                    )}
                  />
                  <span
                    className={cn(
                      "ml-3 transition-all duration-500 ease-in-out font-medium whitespace-nowrap",
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden absolute"
                        : "opacity-100 w-auto"
                    )}
                  >
                    {item.label}
                  </span>
                </div>

                {!collapsed && hoveredItem === i && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-500 opacity-20 rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-gray-100 transition-opacity duration-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-xs text-gray-500">{user?.user_type}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

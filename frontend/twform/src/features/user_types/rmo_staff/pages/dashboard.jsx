import { useEffect, useState } from "react";
import RMOStaffSidebar from "@/sidebar/rmo_staff_sidebar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bookmark, FileText, Users, FileArchive } from "lucide-react";
import { GET_DASHBOARD } from "@/api/urls";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RMOStaffDashboard = () => {
  const LS_KEY = "rmoSidebarCollapsed";
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) ?? "false");
    } catch {
      return false;
    }
  });

  const [stats, setStats] = useState({
    activities: 0,
    announcements: 0,
    articles: 0,
    pendingArticles: 0,
    resources: 0,
    users: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [articleStatusData, setArticleStatusData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(GET_DASHBOARD, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        setStats({
          activities: data.stats.activities,
          announcements: data.stats.announcements,
          articles: data.stats.articles,
          pendingArticles: data.stats.pending_articles,
          resources: data.stats.resources,
          users: data.stats.users,
        });

        setRecentActivities(data.recent_activities);
        setArticleStatusData(data.article_status);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex w-full h-screen bg-[#f5f7fb]">
      <RMOStaffSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={cn(
          "w-full p-6 transition-all duration-300 overflow-auto",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of research activities and content
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Activities
                  </p>
                  <p className="text-2xl font-semibold mt-1">
                    {stats.activities}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Upcoming events</p>
                </div>
                <Activity className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Announcements
                  </p>
                  <p className="text-2xl font-semibold mt-1">
                    {stats.announcements}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Active posts</p>
                </div>
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Research Articles
                  </p>
                  <p className="text-2xl font-semibold mt-1">
                    {stats.articles}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.pendingArticles} pending review
                  </p>
                </div>
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resources</p>
                  <p className="text-2xl font-semibold mt-1">
                    {stats.resources}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Available files</p>
                </div>
                <FileArchive className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Registered Users
                  </p>
                  <p className="text-2xl font-semibold mt-1">{stats.users}</p>
                </div>
                <Users className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Research Agenda
                  </p>
                  <p className="text-2xl font-semibold mt-1">1</p>
                  <p className="text-xs text-gray-500 mt-1">2025-2030</p>
                </div>
                <Bookmark className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                Article Submission Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={articleStatusData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {item.type === "activity" && (
                        <Activity className="h-4 w-4 text-blue-500" />
                      )}
                      {item.type === "announcement" && (
                        <FileText className="h-4 w-4 text-green-500" />
                      )}
                      {item.type === "article" && (
                        <FileText className="h-4 w-4 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RMOStaffDashboard;

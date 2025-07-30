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
  Legend,
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

  // Mock data - in a real app, you would fetch this from your API
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

  // Update your useEffect hook in the React component
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(GET_DASHBOARD, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        console.log(data);
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
          "w-full p-4 transition-all duration-300 overflow-auto",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="bg-white p-5 h-full rounded-md">
          <div className="mb-6">
            <h3 className="text-2xl font-bold">RMO Staff Dashboard</h3>
            <p className="text-gray-500">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Activities
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activities}</div>
                <p className="text-xs text-muted-foreground">
                  Upcoming: 3 events
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Announcements
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.announcements}</div>
                <p className="text-xs text-muted-foreground">
                  2 pinned announcements
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Research Articles
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.articles}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pendingArticles} pending review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resources</CardTitle>
                <FileArchive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.resources}</div>
                <p className="text-xs text-muted-foreground">
                  Available for download
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Registered Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.users}</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Research Agenda
                </CardTitle>
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  Current: 2025-2030
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Submission Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={articleStatusData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center p-3 border rounded-lg"
                    >
                      <div className="flex-shrink-0 mr-3">
                        {item.type === "activity" && (
                          <Activity className="h-5 w-5 text-blue-500" />
                        )}
                        {item.type === "announcement" && (
                          <FileText className="h-5 w-5 text-green-500" />
                        )}
                        {item.type === "article" && (
                          <FileText className="h-5 w-5 text-purple-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-500">
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
    </div>
  );
};

export default RMOStaffDashboard;

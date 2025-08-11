import { useState, useEffect } from "react";
import cover from "../../../src/assets/images/cover.jpg";
import HomeHeader from "./components/header";
import HomeHeroSection from "./components/heroSection";
import HomeFooter from "./components/footer";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

import {
  GET_ANNOUNCEMENTS_URL,
  GET_RESOURCES,
  GET_ACTIVITIES_URL,
} from "@/api/urls";
import HomeTabsSection from "./HomeTabsSection";
import axios from "axios";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [selectedAgenda, setSelectedAgenda] = useState("institutional");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingResources, setloadingResources] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [resources, setResources] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);
  const [articles, setArticles] = useState([]);
  const [announcementsPage, setAnnouncementsPage] = useState(1);
  const [activitiesPage, setActivitiesPage] = useState(1);

  const [announcementsTotalPages, setAnnouncementsTotalPages] = useState(1);
  const [activitiesTotalPages, setActivitiesTotalPages] = useState(1);

  const images = {
    researchHero: cover,
  };

  const institutionalAgenda = [
    "Advancing interdisciplinary research collaborations",
    "Promoting research with societal impact",
    "Enhancing research infrastructure and support",
    "Fostering innovation and entrepreneurship",
    "Strengthening international research partnerships",
  ];

  const collegeAgenda = {
    "Arts and Sciences": [
      "Humanities and cultural studies",
      "Basic sciences and mathematics",
      "Social sciences and policy research",
    ],
    Engineering: [
      "Sustainable technology development",
      "Artificial intelligence applications",
      "Advanced materials research",
    ],
    "Health Sciences": [
      "Public health interventions",
      "Biomedical innovations",
      "Clinical trials and translational research",
    ],
  };

  const location = useLocation();

  /* Go to article tab if user click Back to Article in ArctileView.tsx */
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      window.history.replaceState({}, document.title);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchAnnouncements = async (page = 1) => {
    setLoadingAnnouncements(true);
    try {
      const response = await fetch(`${GET_ANNOUNCEMENTS_URL}?page=${page}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch announcements.");

      const data = await response.json();
      setAnnouncements(data.results);
      setAnnouncementsTotalPages(Math.ceil(data.count / 6));
      setAnnouncementsPage(page);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast("Failed to load announcements.");
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  const fetchResources = async () => {
    try {
      setloadingResources(true);
      const res = await axios.get(GET_RESOURCES);
      console.log(res);
      setResources(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
      setResources([]);
    } finally {
      setloadingResources(false);
    }
  };

  const fetchActivities = async (page = 1) => {
    try {
      const res = await axios.get(`${GET_ACTIVITIES_URL}?page=${page}`);
      setActivities(res.data.results);
      setActivitiesTotalPages(Math.ceil(res.data.count / 6));
      setActivitiesPage(page);
    } catch (err) {
      console.error("Failed to fetch activities:", err);
    }
  };

  // Announcements
  useEffect(() => {
    fetchAnnouncements(announcementsPage);
  }, [announcementsPage]);

  // Activities
  useEffect(() => {
    fetchActivities(activitiesPage);
  }, [activitiesPage]);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (!loadingResources && !loadingAnnouncements && !loadingArticles) {
      setIsLoading(false);
    }
  }, [loadingResources, loadingAnnouncements, loadingArticles]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeHeroSection images={images} />

      <HomeHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAgenda={selectedAgenda}
        setSelectedAgenda={setSelectedAgenda}
        isScrolled={isScrolled}
      />

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center my-90">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <HomeTabsSection
            activeTab={activeTab}
            selectedAgenda={selectedAgenda}
            institutionalAgenda={institutionalAgenda}
            collegeAgenda={collegeAgenda}
            announcements={announcements}
            activities={activities}
            currentActivitiesPage={activitiesPage}
            activitiesTotalPages={activitiesTotalPages}
            setActivitiesPage={setActivitiesPage}
            currentAnnouncementsPage={announcementsPage}
            announcementsTotalPages={announcementsTotalPages}
            setAnnouncementsPage={setAnnouncementsPage}
            forms={resources}
            loadingForms={loadingResources}
          />
        )}
      </main>

      <HomeFooter />
    </div>
  );
};

export default HomePage;

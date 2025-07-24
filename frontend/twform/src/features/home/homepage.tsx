import { useState, useEffect } from "react";
import cover from "../../../src/assets/images/cover.jpg";
import HomeHeader from "./components/header";
import HomeHeroSection from "./components/heroSection";
import HomeFooter from "./components/footer";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

import { GET_ANNOUNCEMENTS_URL } from "@/api/urls";
import HomeTabsSection from "./HomeTabsSection";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [selectedAgenda, setSelectedAgenda] = useState("institutional");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Sample images
  const images = {
    symposium:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format",
    colloquium:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format",
    bootcamp:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format",
    researchHero: cover,
    officeBuilding:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format",
  };

  const [announcements, setAnnouncements] = useState([]);
  const [activities, setActivities] = useState([]);

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

  const forms = [
    {
      name: "Research Proposal Form",
      link: "#",
      category: "Submission",
      size: "120KB",
    },
    {
      name: "Ethics Review Application",
      link: "#",
      category: "Compliance",
      size: "250KB",
    },
    {
      name: "Grant Budget Template",
      link: "#",
      category: "Financial",
      size: "95KB",
    },
    {
      name: "Publication Support Request",
      link: "#",
      category: "Support",
      size: "80KB",
    },
    {
      name: "Research Equipment Request",
      link: "#",
      category: "Resources",
      size: "110KB",
    },
  ];
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

    setTimeout(() => {
      setActivities([
        {
          id: 1,
          title: "Faculty Research Colloquium",
          date: "July 5, 2024",
          description:
            "Monthly gathering for faculty researchers to present ongoing work and receive feedback.",
          image: images.symposium,
          location: "University Conference Hall",
        },
        {
          id: 2,
          title: "Undergraduate Research Day",
          date: "August 12, 2024",
          description:
            "Celebration of undergraduate research achievements with poster presentations and awards.",
          image: images.colloquium,
          location: "Student Center",
        },
        {
          id: 3,
          title: "Grant Writing Workshop",
          date: "September 3, 2024",
          description:
            "Hands-on training for preparing competitive grant proposals with expert facilitators.",
          image: images.bootcamp,
          location: "Research Building, Room 101",
        },
      ]);

      setIsLoading(false);
    }, 1000);

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
      setTotalPages(Math.ceil(data.count / 8));
      setCurrentPage(page);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast("Failed to load announcements.");
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements(currentPage);
  }, [currentPage]);

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
            forms={forms}
            loadingAnnouncements={loadingAnnouncements}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>

      <HomeFooter />
    </div>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import cover from "../../../src/assets/images/cover.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("announcements");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState("institutional");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    // Simulate API fetch
    setTimeout(() => {
      setAnnouncements([
        {
          id: 1,
          title: "Call for Research Proposals 2024",
          date: "June 15, 2024",
          content:
            "The Research Management Office is now accepting research proposals for the 2024 funding cycle. Deadline for submission is August 30, 2024.",
          category: "Funding",
          image: images.researchHero,
        },
        {
          id: 2,
          title: "Research Ethics Training Workshop",
          date: "May 28, 2024",
          content:
            "Join us for a comprehensive workshop on research ethics and compliance. Scheduled for July 10-12, 2024 at the University Conference Hall.",
          category: "Workshop",
          image: images.officeBuilding,
        },
        {
          id: 3,
          title: "Annual Research Symposium",
          date: "April 20, 2024",
          content:
            "Save the date for our Annual Research Symposium showcasing groundbreaking research from across the institution. November 15-17, 2024.",
          category: "Event",
          image: images.symposium,
        },
        {
          id: 3,
          title: "Annual Research Symposium",
          date: "April 20, 2024",
          content:
            "Save the date for our Annual Research Symposium showcasing groundbreaking research from across the institution. November 15-17, 2024.",
          category: "Event",
          image: images.symposium,
        },
        {
          id: 3,
          title: "Annual Research Symposium",
          date: "April 20, 2024",
          content:
            "Save the date for our Annual Research Symposium showcasing groundbreaking research from across the institution. November 15-17, 2024.",
          category: "Event",
          image: images.symposium,
        },
      ]);

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

  const handleAgendaChange = (e) => {
    setSelectedAgenda(e.target.value);
    setActiveTab("research-agenda");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src={images.researchHero}
            alt="Research background"
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            SMCII Research Management Office
          </h1>
          <p className="mt-2 text-xl text-indigo-100 max-w-3xl mx-auto">
            Fostering innovation and excellence in academic research
          </p>
        </div>
      </div>

      {/* Header */}
      <header
        className={` bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4" : "py-4"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
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
                onClick={() => setActiveTab("announcements")}
                className={`px-3 py-2 font-medium ${
                  activeTab === "announcements"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                Announcements
              </button>
              <button
                onClick={() => setActiveTab("activities")}
                className={`px-3 py-2 font-medium ${
                  activeTab === "activities"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                Activities
              </button>

              <div className="relative">
                <select
                  value={selectedAgenda}
                  onChange={(e) => {
                    setSelectedAgenda(e.target.value);
                    setActiveTab("research-agenda");
                  }}
                  className="border-none appearance-none bg-white border rounded-md pl-3 pr-8 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {/* <option value="">Research Agendas</option> */}
                  <option value="institutional">
                    Institutional Research Agenda
                  </option>
                  <option value="college">College Research Agenda</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("forms")}
                className={`px-3 py-2 font-medium ${
                  activeTab === "forms"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                Forms
              </button>

              <Link to="/login">
                <button className="bg-[#160e73] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200">
                  Login
                </button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
            <button
              onClick={() => {
                setActiveTab("announcements");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 font-medium ${
                activeTab === "announcements"
                  ? "text-indigo-600 bg-indigo-50 rounded"
                  : "text-gray-600"
              }`}
            >
              Announcements
            </button>
            <button
              onClick={() => {
                setActiveTab("activities");
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 font-medium ${
                activeTab === "activities"
                  ? "text-indigo-600 bg-indigo-50 rounded"
                  : "text-gray-600"
              }`}
            >
              Activities
            </button>
            <select
              value={selectedAgenda}
              onChange={(e) => {
                setSelectedAgenda(e.target.value);
                setActiveTab("research-agenda");
                setMobileMenuOpen(false);
              }}
              className="mt-2 block w-full bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Research Agendas</option>
              <option value="institutional">
                Institutional Research Agenda
              </option>
              <option value="college">College Research Agenda</option>
            </select>
            <button
              onClick={() => {
                setActiveTab("forms");
                setMobileMenuOpen(false);
              }}
              className={`mt-2 block w-full text-left px-3 py-2 font-medium ${
                activeTab === "forms"
                  ? "text-indigo-600 bg-indigo-50 rounded"
                  : "text-gray-600"
              }`}
            >
              Forms
            </button>
            <button className="mt-2 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200">
              Contact Us
            </button>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Announcements */}
            {activeTab === "announcements" && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Latest Announcements
                  </h2>
                  {/* <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      All
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      Funding
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      Workshops
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      Events
                    </button>
                  </div> */}
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={announcement.image}
                          alt={announcement.title}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                            {announcement.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {announcement.date}
                          </span>
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-gray-800">
                          {announcement.title}
                        </h3>
                        <p className="mt-3 text-gray-600 line-clamp-2">
                          {announcement.content}
                        </p>
                        <button className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                          Read more
                          <svg
                            className="ml-1 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            {activeTab === "activities" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Upcoming Activities
                </h2>
                <div className="grid gap-8">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden md:flex"
                    >
                      <div className="md:w-1/3">
                        <img
                          className="w-full h-full object-cover min-h-64"
                          src={activity.image}
                          alt={activity.title}
                        />
                      </div>
                      <div className="p-8 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-bold text-gray-800">
                            {activity.title}
                          </h3>
                          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                            {formatDate(activity.date)}
                          </div>
                        </div>
                        <p className="mt-4 text-gray-600">
                          {activity.description}
                        </p>
                        <div className="mt-6 flex items-center">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-2 text-gray-600">
                            {activity.location}
                          </span>
                        </div>
                        <div className="mt-6 flex items-center space-x-4">
                          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium">
                            Register Now
                          </button>
                          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium">
                            Add to Calendar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Research Agenda */}
            {activeTab === "research-agenda" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {selectedAgenda === "institutional" && (
                  <div className="p-8">
                    <div className="flex items-center mb-8">
                      <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                        <svg
                          className="h-8 w-8 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          Institutional Research Agenda
                        </h2>
                        <p className="text-gray-600">
                          2023-2028 Strategic Plan
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                          Priority Areas
                        </h3>
                        <ul className="space-y-4">
                          {institutionalAgenda.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                          Strategic Goals
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="bg-indigo-100 text-indigo-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                                1
                              </div>
                              <h4 className="font-medium text-gray-800">
                                Enhance research quality and impact
                              </h4>
                            </div>
                            <p className="text-gray-600 text-sm ml-11">
                              Through rigorous peer-review and publication
                              support
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="bg-indigo-100 text-indigo-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                                2
                              </div>
                              <h4 className="font-medium text-gray-800">
                                Foster interdisciplinary collaboration
                              </h4>
                            </div>
                            <p className="text-gray-600 text-sm ml-11">
                              Encouraging cross-departmental research
                              initiatives
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="bg-indigo-100 text-indigo-800 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                                3
                              </div>
                              <h4 className="font-medium text-gray-800">
                                Strengthen research-practice linkages
                              </h4>
                            </div>
                            <p className="text-gray-600 text-sm ml-11">
                              Bridging academic research with real-world
                              applications
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedAgenda === "college" && (
                  <div className="p-8">
                    <div className="flex items-center mb-8">
                      <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                        <svg
                          className="h-8 w-8 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          College Research Agendas
                        </h2>
                        <p className="text-gray-600">
                          Department-specific research priorities
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(collegeAgenda).map(
                        ([college, agendaItems]) => (
                          <div
                            key={college}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div
                              className={`p-4 ${
                                college === "Arts and Sciences"
                                  ? "bg-indigo-600"
                                  : college === "Engineering"
                                  ? "bg-green-600"
                                  : "bg-purple-600"
                              }`}
                            >
                              <h3 className="text-lg font-semibold text-white">
                                {college}
                              </h3>
                            </div>
                            <div className="p-4">
                              <ul className="space-y-2">
                                {agendaItems.map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <svg
                                      className={`h-5 w-5 mr-2 ${
                                        college === "Arts and Sciences"
                                          ? "text-indigo-500"
                                          : college === "Engineering"
                                          ? "text-green-500"
                                          : "text-purple-500"
                                      }`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                      />
                                    </svg>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Forms */}
            {activeTab === "forms" && (
              <div>
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <svg
                      className="h-8 w-8 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      Forms & Templates
                    </h2>
                    <p className="text-gray-600">
                      Downloadable resources for researchers
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {forms.map((form, index) => (
                    <a
                      key={index}
                      href={form.link}
                      className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="bg-gray-100 p-6 flex justify-center">
                        <div className="bg-white p-4 rounded-lg shadow-inner">
                          <svg
                            className="h-12 w-12 text-indigo-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="p-4 border-t border-gray-200">
                        <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">
                          {form.name}
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">
                            {form.size}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              form.category === "Submission"
                                ? "bg-indigo-100 text-indigo-800"
                                : form.category === "Compliance"
                                ? "bg-green-100 text-green-800"
                                : form.category === "Financial"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {form.category}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    Need help with forms?
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Our office provides assistance with completing research
                    forms and templates. Schedule a consultation with our staff.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                    Request Assistance
                  </button>
                </div> */}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#03011b] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                SMCII Research Management Office
              </h3>
              <p className="text-gray-400 text-sm">
                The Office of Research oversees the work of the faculty,
                students, and other offices in their research endeavors for
                human advancement, plans, and programs’ improvement and
                progression of the quality of life of the community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Research Policies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Funding Opportunities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Ethics Committee
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Publications
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-sm text-gray-400">
                <p>123 Research Avenue</p>
                <p>Academic City, 10101</p>
                <p className="mt-2">Email: rmo@university.edu</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 SMCII Research Management Office. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

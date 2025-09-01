import HomeAnnouncements from "./components/announcements";
import HomeActivities from "./components/activities";
import HomeInstitutionalAgenda from "./components/institutionalAgenda";
import HomeCollegeAgenda from "./components/collegeAgenda";
import HomeForms from "./components/forms";
import HomeArticles from "./components/articles";

const HomeTabsSection = ({
  activeTab,
  selectedAgenda,
  setSelectedAgenda,
  announcements,
  loadingAnnouncements,
  activities,
  currentActivitiesPage,
  activitiesTotalPages,
  setActivitiesPage,
  currentAnnouncementsPage,
  announcementsTotalPages,
  setAnnouncementsPage,
  forms,
  institutionalAgenda,
  collegeAgenda,
  loadingForms,
}: any) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      {activeTab === "announcements" && (
        <HomeAnnouncements
          announcements={announcements}
          currentPage={currentAnnouncementsPage}
          totalPages={announcementsTotalPages}
          setCurrentPage={setAnnouncementsPage}
          loadingAnnouncements={loadingAnnouncements}
        />
      )}

      {activeTab === "activities" && (
        <HomeActivities
          activities={activities}
          currentPage={currentActivitiesPage}
          totalPages={activitiesTotalPages}
          setCurrentPage={setActivitiesPage}
        />
      )}

      {activeTab === "research-agenda" && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {selectedAgenda === "institutional" ? (
            <HomeInstitutionalAgenda
              institutionalAgenda={institutionalAgenda}
            />
          ) : (
            <HomeCollegeAgenda collegeAgenda={collegeAgenda} />
          )}
        </div>
      )}

      {activeTab === "forms" && (
        <HomeForms forms={forms} loadingForms={loadingForms} />
      )}

      {activeTab === "articles" && <HomeArticles />}
    </div>
  );
};

export default HomeTabsSection;

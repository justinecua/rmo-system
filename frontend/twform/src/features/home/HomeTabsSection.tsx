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
  currentPage,
  totalPages,
  setCurrentPage,
  activities,
  forms,
  institutionalAgenda,
  collegeAgenda,
  loadingForms,
}: any) => {
  return (
    <>
      {activeTab === "announcements" && (
        <HomeAnnouncements
          announcements={announcements}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          loadingAnnouncements={loadingAnnouncements}
        />
      )}

      {activeTab === "activities" && <HomeActivities activities={activities} />}

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
    </>
  );
};

export default HomeTabsSection;

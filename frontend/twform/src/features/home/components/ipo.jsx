import { useEffect, useState } from "react";
import ResourceCard from "../../user_types/rmo_staff/components/components/resourcesCard";
import { ipoDocuments } from "@/data/ipoDocuments";

const HomeIpoDocuments = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    setDocuments(ipoDocuments);
  }, []);

  const hasDocs = documents.length > 0;

  return (
    <section className="w-full px-4 sm:px-6 mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            IPO Documents
          </h2>
          {/* <p className="text-gray-600">Official IPO  and guidelines</p> */}
        </div>
      </header>

      <div
        className={`w-full ${
          hasDocs ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : ""
        }`}
      >
        {hasDocs ? (
          <ResourceCard
            forms={documents}
            showDelete={false} // IPO docs = read-only
          />
        ) : (
          <div className="text-center text-gray-500 h-[60vh] flex items-center justify-center">
            No IPO documents available
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeIpoDocuments;

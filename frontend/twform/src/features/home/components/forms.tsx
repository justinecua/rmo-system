import { useEffect, useState } from "react";
import ResourceCard from "./resources/resourcesCard";

const HomeForms = ({ forms = [], loadingForms }) => {
  const hasForms = Array.isArray(forms) && forms.length > 0;

  return (
    <section>
      <header className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Forms & Templates
          </h2>
          <p className="text-gray-600">
            Downloadable resources for researchers
          </p>
        </div>
      </header>

      <div
        className={`w-full transition-opacity duration-500 ${
          loadingForms ? "opacity-0" : "opacity-100"
        } ${hasForms ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : ""}`}
      >
        {loadingForms ? (
          <p className="text-gray-500 text-sm col-span-full">
            Loading resources...
          </p>
        ) : hasForms ? (
          <ResourceCard forms={forms} />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 h-[60vh] flex justify-center items-center w-full">
            No forms found
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeForms;

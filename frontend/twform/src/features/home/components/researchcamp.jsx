import { useState, useEffect } from "react";
import a from "@/assets/camp/1.jpg";
import b from "@/assets/camp/2.jpg";
import c from "@/assets/camp/3.jpg";
import d from "@/assets/camp/4.jpg";
import e from "@/assets/camp/5.jpeg";
import f from "@/assets/camp/6.jpeg";
import aa from "@/assets/camp/11.jpg";
import bb from "@/assets/camp/22.jpg";
import cc from "@/assets/camp/33.jpg";
import dd from "@/assets/camp/44.jpg";
import ee from "@/assets/camp/55.jpg";
import ff from "@/assets/camp/66.jpg";
import aaa from "@/assets/camp/111.jpg";
import bbb from "@/assets/camp/222.jpg";
import ccc from "@/assets/camp/333.jpg";
import ddd from "@/assets/camp/444.jpg";
import eee from "@/assets/camp/555.jpg";
import fff from "@/assets/camp/666.jpg";
import aaaa from "@/assets/camp/1111.jpg";
import bbbb from "@/assets/camp/2222.jpg";
import cccc from "@/assets/camp/3333.jpg";
import dddd from "@/assets/camp/4444.jpg";
import eeee from "@/assets/camp/5555.jpg";
import ffff from "@/assets/camp/6666.jpg";

/* RESEARCH CAMP CONTENT BY YEAR */
const RESEARCH_CAMPS = [
  {
    year: 2026,
    title: "Research Camp 2026",
    description:
      "Research Camp 2026 focuses on advanced research writing, proposal defense preparation, and publication mentoring for students and faculty.",
    images: [a, b, c, d, e, f],

    details: {
      theme:
        "Ignacian Marian Researchers: Journeying Together in Scholarship, Collaboration, and Innovation Nourished by Integrity and Service",
      venue: "Chali Beach Resort, Cagayan de Oro City",
      date: "December 1–3, 2025",

      rationale: `With the theme “Ignacian Marian Researchers: Journeying Together in Scholarship, Collaboration, and Innovation Nourished by Integrity and Service,” the Research Camp 2026 continues the enduring mission of the Research Management Office (RMO) of St. Michael’s College of Iligan to foster a vibrant research culture. Anchored on the RVM Schools Theme for SY 2025–2026, the camp integrates faith, scholarship, and service, positioning research as an Ignacian Marian commitment to excellence, integrity, and the common good.`,

      objectives: [
        "Strengthen research competence and productivity through advanced tools, methodologies, and guided phases leading to quality and publishable outputs.",
        "Foster collaboration and interdisciplinary engagement through peer mentoring, writeshops, and networking grounded in Ignacian Marian values.",
        "Sustain a research-driven culture aligned with institutional priorities, accreditation standards, and global research directions.",
      ],

      purpose:
        "The purpose of Research Camp 2026 is to provide a values-centered, systematic, and transformative research journey for faculty and administrators. By combining immersive activities, phased development, and the integration of advanced research tools, the camp seeks to nurture empowered researchers and servant-leaders. In doing so, it contributes not only to academic excellence and accreditation readiness but also to the wider mission of St. Michael’s College in advancing knowledge, innovation, and service to society.",

      phases: [
        {
          name: "Phase 1",
          date: "September 20, 2025",
          activity: "Research Title Conceptualization via Google Form",
        },
        {
          name: "Phase 2",
          date: "October 2, 2025",
          activity: "Expanded Proposal Development via Google Form",
        },
        {
          name: "Phase 3",
          date: "November 29, 2025",
          activity: "Structural Equation Modeling – Dr. Aniceto B. Naval, PhD",
        },
        {
          name: "Phase 4",
          date: "December 1–3, 2025",
          activity: "Writing a Publishable Article – Dr. Jedda Justol, PhD",
        },
        {
          name: "Phase 5",
          activity:
            "Research Camp Proper at Chali Beach Resort (culminating immersive camp)",
        },
      ],

      participants: {
        total: 50,
        note: "Participants include faculty, administrators, SHS, and Research Management Office personnel.",
      },
    },
  },
  {
    year: 2025,
    title: "Research Camp 2025",
    description:
      "Research Camp 2025 focused on strengthening research competence through collaborative learning, mentoring, and academic engagement in a nature-based setting.",
    images: [eee, bbb, ccc, ddd, aaa, fff],

    details: {
      rationale: `The recently concluded Research Camp 2025, held on June 22–24, 2025 at the scenic Dahilayan Forest Park in Bukidnon, was a meaningful and memorable academic gathering that brought together researchers and faculty members in a unique blend of learning, collaboration, and nature immersion. The three-day camp served as a platform for knowledge sharing, research mentoring, and team-building activities that significantly strengthened the research culture among participating institutions.

The camp was participated in by representatives from the following institutions: 
• Lourdes College  
• Christ the King College of Gingoog  
• St. Michael’s College – Basic Education Department  
• St. Michael’s College – Higher Education Department  

The Research Management Office extends its deepest gratitude to the individuals whose leadership and support made this event possible: S. Ma. Rodina M. Bongoc, RVM, School President; Dr. Ritzcen A. Durango, Vice President for Academic Affairs; and Dr. Korsiney N. Cabasis, Vice President for Administration. Their unwavering commitment to academic excellence and innovation continues to inspire and empower the institution’s research community.

Through this initiative, Research Camp 2025 reaffirmed its mission to cultivate curious minds, foster collaboration, and advance a future led by research, innovation, and discovery.`,
    },
  },

  {
    year: 2024,
    title: "Research Camp 2024",
    description:
      "Research Camp 2024 emphasized proposal development, methodology workshops, and academic writing fundamentals.",
    images: [aa, bb, cc, dd, ee, ff],
  },

  {
    year: 2023,
    title: "Research Camp 2023",
    description: "",
    images: [dddd, bbbb, cccc, aaaa, eeee, ffff],
  },
];

/* SAME DOCUMENTS FOR ALL YEARS */
const DOCUMENTS = [
  {
    id: 1,
    name: "Documentation – Research Camp (HED) 2023",
    url: "/docs/Activity-Documentation-RESEARCH-CAMP-HED-DEPT.docx",
  },
  {
    id: 2,
    name: "Documentation – Research Camp (BED) 2023",
    url: "/docs/Activity-Documentation-RESEARCH-CAMP-HED-DEPT.docx",
  },
  {
    id: 3,
    name: "6th Research Camp",
    url: "/docs/Camp-research-final-6th.docx",
  },
  {
    id: 4,
    name: "Evaluation of the 1st Research Camp",
    url: "/docs/Evaluation-of-the-1st-Research-Camp.docx",
  },
  {
    id: 5,
    name: "Proposal for Research Camp 2024",
    url: "/docs/Proposal-for-Research-Camp-2024.pdf",
  },
  {
    id: 6,
    name: "Proposal for Research Camp for CON",
    url: "/docs/Proposal-for-Research-Camp-for-College-of-Nursing.docx",
  },

  {
    id: 7,
    name: "Proposal for Research Camp 2023",
    url: "/docs/Proposal-for-Research-Camp-for-College-of-Nursing.docx",
  },

  {
    id: 7,
    name: "RMO Accomplishment Report",
    url: "/docs/RMO-ACCOMPLISHMENT-REPORT.docx",
  },
];

const HomeResearchCamp = () => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const camp = RESEARCH_CAMPS.find((item) => item.year === selectedYear);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    setGalleryIndex(0);
  }, [selectedYear]);

  return (
    <div className="w-full px-4 sm:px-6 mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Research Camp
        </h2>
        <p className="text-gray-600 mt-1">
          A curated archive of Research Camp initiatives, scholarly activities,
          and institutional research outputs by year
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-8">
          {/* IMAGES */}
          {camp ? (
            <>
              {/* COVER IMAGE */}
              {camp.images?.length > 0 && (
                <div className="w-full">
                  <img
                    src={camp.images[0]}
                    alt={`${camp.title} cover`}
                    className="w-full h-[320px] sm:h-[420px] object-cover rounded-2xl"
                  />
                </div>
              )}

              {/* SLIDING GALLERY (3 IMAGES AT A TIME) */}
              {camp.images?.length > 1 &&
                (() => {
                  const galleryImages = camp.images.slice(1);
                  const visibleImages = galleryImages.slice(
                    galleryIndex,
                    galleryIndex + 3
                  );

                  return (
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        {visibleImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${camp.title} gallery ${index}`}
                            className="w-full h-40 object-cover rounded-xl"
                          />
                        ))}
                      </div>

                      {/* CONTROLS */}
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() =>
                            setGalleryIndex((prev) => Math.max(prev - 3, 0))
                          }
                          disabled={galleryIndex === 0}
                          className="px-3 py-1 text-sm rounded-md border disabled:opacity-40"
                        >
                          Previous
                        </button>

                        <button
                          onClick={() =>
                            setGalleryIndex((prev) =>
                              Math.min(prev + 3, galleryImages.length - 3)
                            )
                          }
                          disabled={galleryIndex + 3 >= galleryImages.length}
                          className="px-3 py-1 text-sm rounded-md border disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  );
                })()}

              {/* EXTENDED DETAILS */}
              <div className="bg-white border rounded-xl p-6 -mt-3 mb-3 relative z-10">
                <h3 className="text-xl font-bold text-gray-900">
                  {camp.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {camp.description}
                </p>
              </div>

              {camp?.details && (
                <section className="bg-white border rounded-xl p-6 space-y-6">
                  {/* EVENT OVERVIEW */}
                  {(camp.details.theme ||
                    camp.details.venue ||
                    camp.details.date) && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        Event Overview
                      </h4>

                      {camp.details.theme && (
                        <p className="italic font-medium text-gray-700">
                          {camp.details.theme}
                        </p>
                      )}

                      {(camp.details.venue || camp.details.date) && (
                        <p className="text-gray-600 mt-2">
                          {camp.details.venue && (
                            <>
                              <strong>Venue:</strong> {camp.details.venue}
                              <br />
                            </>
                          )}
                          {camp.details.date && (
                            <>
                              <strong>Date:</strong> {camp.details.date}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  )}

                  {/* RATIONALE */}
                  {camp.details.rationale && (
                    <div>
                      {/* <h4 className="text-lg font-semibold mb-2">Rationale</h4> */}
                      <p
                        className="text-gray-600 leading-relaxed text-justify
"
                      >
                        {camp.details.rationale}
                      </p>
                    </div>
                  )}

                  {/* OBJECTIVES */}
                  {Array.isArray(camp.details.objectives) && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Objectives</h4>
                      <ul className="list-decimal ml-6 space-y-1 text-gray-600">
                        {camp.details.objectives.map((obj, idx) => (
                          <li key={idx}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* PURPOSE */}
                  {camp.details.purpose && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2 ">Purpose</h4>
                      <p
                        className="text-gray-600 text-justify
"
                      >
                        {camp.details.purpose}
                      </p>
                    </div>
                  )}

                  {/* PHASES */}
                  {Array.isArray(camp.details.phases) && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3">
                        Phased Activities
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        {camp.details.phases.map((phase, idx) => (
                          <li key={idx}>
                            <strong>{phase.name}</strong>
                            {phase.date && ` (${phase.date})`}: {phase.activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}
            </>
          ) : (
            <div className="bg-white border rounded-xl p-6 text-gray-600">
              No data available for this year.
            </div>
          )}

          {/* DOCUMENTS (GLOBAL) */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4 mt-7">
              Research Camp Documents
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="border rounded-xl p-4 bg-white hover:shadow-sm transition cursor-pointer"
                >
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sm text-blue-700 text-sm hover:underline"
                  >
                    {doc.name}
                  </a>

                  <p className="text-xs text-gray-500 mt-1">
                    Click to view or download
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: YEARS */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 bg-white border rounded-xl p-5">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Year Category
            </h4>

            <ul className="space-y-2">
              {RESEARCH_CAMPS.sort((a, b) => b.year - a.year).map((item) => (
                <li
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition ${
                    selectedYear === item.year
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.year}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomeResearchCamp;

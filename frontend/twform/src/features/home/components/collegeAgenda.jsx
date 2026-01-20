import cas from "@/assets/images/cas.webp";
import cbaa from "@/assets/images/cbaa.webp";
import ccs from "@/assets/images/ccs.webp";
import ced from "@/assets/images/ced.webp";
import chtm from "@/assets/images/chtm2.jpg";
import coc from "@/assets/images/coc.png";
import coe from "@/assets/images/coe.png";
import con from "@/assets/images/con.webp";

const HomeCollegeAgenda = () => {
  const colleges = {
    "Arts and Sciences": [
      "Language, Identity, and Pedagogy",
      "Literary and Cultural Inquiry",
      "Digital Literacy and Innovation",
      "Ethics and Servant Leadership",
      "Dialogic and Civic Discourse",
      "Spiritual Formation and Thought",
      "Mental Health and Wellbeing",
      "Educational Psychology",
      "Social and Community Psychology",
    ],
    "Computer Studies": [
      "Software Development and Intelligent Systems",
      "Artificial Intelligence and Data Science",
      "Multimedia and E-Learning Systems",
      "Cloud Computing and Virtualization",
      "IT Security and Risk Management",
      "Human-Centered Computing",
      "Robotics and Embedded Systems",
    ],
    "Hospitality and Tourism": [
      "Sustainable Hospitality and Accommodation",
      "Culinary Arts and Food Safety",
      "Event Tourism and Conference Management",
      "Human Resource Management in Hospitality",
      "Management Information Systems in Hospitality",
      "Tourism Services and Travel Trade",
      "Home Management and Informal Hospitality",
      "Adventure and Recreational Tourism",
      "Foreign Language and Cultural Competency",
    ],
    Engineering: [
      "Sustainable Infrastructure and Resilient Design",
      "Climate-Resilient Infrastructure",
      "Smart and Integrated Transportation",
      "Water Resource Management",
      "Waste Management and Sustainable Practices",
      "Emerging Technologies in Electronics Engineering",
      "Advanced Wireless Communication",
      "Robotics and Intelligent Systems",
      "Cybersecurity and Resilient Systems",
      "Human-Computer Interaction",
    ],
    "Nursing and Health Sciences": [
      "Disease Management",
      "Halal in Health",
      "Health Security, Emergency and Disaster Risks",
      "Health Technology and Innovation",
      "Health of Vulnerable Population",
      "Health Promotion",
      "Health Systems Strengthening Towards UHC",
      "Maternal, Newborb and child care",
      "Mental Health",
      "Nutrition and Food Security",
    ],
    "Business Administration and Accountancy": [
      "Entrepreneurial Innovation and MSME Development",
      "Business Ethics and Corporate Governance",
      "Strategic Management and Sustainability",
      "Marketing and Consumer Behavior",
      "Linkages, Networking, and Graduate Outcomes",
      "Financial Inclusion and Economic Development",
      "Public Sector Accounting and Taxation",
      "Digital Transformation in Accountancy",
    ],
    Criminology: [
      "Safety, Security, and Crime Prevention",
      "Law Enforcement Administration",
      "Criminal Justice and Corrections",
      "Victimology and Human Rights",
      "Forensic Science and Scientific Detection",
      "Environmental and Social Criminology",
      "Criminological Research Methods and Education",
    ],
    Education: [
      "Teaching and Learning Innovations",
      "Teacher Education and Development",
      "Assessment and Curriculum",
      "Inclusive and Special Education",
      "Educational Leadership and Governance",
      "Educational Technology and Digital Literacy",
      "Values Education and Character Formation",
      "Language and Literacy Development",
      "Research Capability and Engagement",
      "Community Engagement and Extension",
    ],
  };

  const collegeLogos = {
    "Arts and Sciences": cas,
    "Computer Studies": ccs,
    "Hospitality and Tourism": chtm,
    Engineering: coe,
    "Nursing and Health Sciences": con,
    "Business Administration and Accountancy": cbaa,
    Criminology: coc,
    Education: ced,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-14">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">
          College Research Agenda
        </h1>
        <div className="w-16 h-px bg-gray-300 mx-auto mt-4" />
      </div>

      {/* Colleges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
        {Object.entries(colleges).map(([college, items]) => (
          <div
            key={college}
            className="relative bg-white border border-gray-100 rounded-xl px-6 pt-14 pb-6 hover:shadow-sm transition"
          >
            {/* Circular Logo */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center ">
                <img
                  src={collegeLogos[college]}
                  alt={`${college} logo`}
                  className="h-25 w-25 object-contain"
                />
              </div>
            </div>

            {/* College Name */}
            <h3 className="text-center text-lg font-medium text-gray-800 mt-2 mb-5">
              {college}
            </h3>

            {/* Agenda List */}
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCollegeAgenda;

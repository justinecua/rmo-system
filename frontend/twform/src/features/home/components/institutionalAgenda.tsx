import React from "react";

interface Theme {
  name: string;
  topics: string[];
}

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  colorClass: string;
  themes: Theme[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Alignment {
  id: string;
  name: string;
  image: string;
  alt: string;
}

const RESEARCH_AGENDA = {
  framework: {
    theme:
      "Inspiring National and Global Leadership through Ignacian-Marian Transformative Education, Social Empowerment, and Innovative Partnerships",
    pillars: [
      {
        id: "education",
        title:
          "Education for Sustainable Development and Social Transformation",
        subtitle: "",
        description:
          "Research under this theme would focus on innovating pedagogy and curricula that align with Ignacian Marian traditions, particularly targeting SDG 4 (Quality Education). Studies could explore interdisciplinary approaches that integrate ethics, social justice, and sustainability into education, aiming to foster a sense of global citizenship and service to the common good.",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        colorClass: "from-indigo-600 to-indigo-700",
        themes: [
          {
            name: "Interdisciplinary Curriculum Development for Sustainable Education",
            topics: [
              "Research on integrating sustainability concepts into educational curricula across disciplines",
              "Development of teaching materials and methods that incorporate environmental ethics and social justice",
              "Evaluation studies on the effectiveness of interdisciplinary approaches to sustainability education",
            ],
          },
          {
            name: "Ethical Leadership and Social Responsibility in Education",
            topics: [
              "Studies on the pedagogical impact of Ignacian Marian values in shaping ethical leaders",
              "Research on the role of educational institutions in promoting social responsibility and community service",
              "Case studies of successful community engagement initiatives led by educational institutions",
            ],
          },
          {
            name: "Innovative Educational Pathways for Community Empowerment",
            topics: [
              "Analysis of educational programs that lead to employment and contribute to poverty alleviation",
              "Impact assessment of social entrepreneurship education on local economies",
              "Studies on the scalability and sustainability of livelihood programs initiated by educational institutions",
            ],
          },
          {
            name: "Educational Strategies for Health and Well-being",
            topics: [
              "Research on the inclusion of health education in curricula to address public health issues",
              "Studies on the impact of education on health outcomes, particularly in underserved communities",
              "Evaluation of school-based programs that promote health and well-being",
            ],
          },
          {
            name: "Sustainable Campus Initiatives",
            topics: [
              "Research on the implementation and impact of green policies and practices in educational settings",
              "Case studies of campuses as models for sustainable community living",
              "Assessment of student-led sustainability initiatives and their contribution to the institutional green agenda",
            ],
          },
          {
            name: "Climate Change Education and Resilience",
            topics: [
              "Research on the integration of climate change awareness and adaptation strategies into educational frameworks",
              "Studies on the resilience of educational infrastructure and community preparedness in the face of climate-related disasters",
              "Curriculum development for disaster risk reduction, leveraging insights from weather forecasting, flood, and climate projects",
            ],
          },
        ],
      },
      {
        id: "health",
        title: "Health and Well-being for Vulnerable Communities",
        subtitle: "",
        description:
          "Addressing SDG 3 (Good Health and Well-being), this theme focuses on developing social programs that improve health outcomes for marginalized populations. Research could involve community-based healthcare initiatives, mental health interventions, and policies to reduce health disparities, particularly in response to the current needs highlighted by Philippine government agencies",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        colorClass: "from-teal-600 to-teal-700",
        themes: [
          {
            name: "Nutritional Health Across Lifespan",
            topics: [
              "Developing interventions to improve nutritional status",
              "Assessing the impact of malnutrition on health and development across different life stages",
              "Evaluating the effectiveness of policies and programs aimed at reducing malnutrition",
            ],
          },
          {
            name: "Innovative Health Technologies",
            topics: [
              "Telemedicine platforms to extend healthcare reach to remote areas",
              "Engineering affordable medical devices and diagnostics",
              "Wearable technologies for monitoring and promoting health",
            ],
          },
          {
            name: "Health Information Systems and Data Utilization",
            topics: [
              "Evaluating the use of health information systems in resource-poor settings",
              "Studying the impact of big data on health outcomes in vulnerable populations",
              "Assessing the barriers to data-driven decision-making in healthcare",
            ],
          },
          {
            name: "Non-communicable Diseases (NCDs) and Lifestyle",
            topics: [
              "Investigating the prevalence and risk factors of NCDs in vulnerable populations",
              "Developing community-based interventions for the management of NCDs",
              "Evaluating the impact of urbanization on lifestyle-related health issues",
            ],
          },
          {
            name: "Environmental Health and Climate Change",
            topics: [
              "Examining the health effects of environmental pollution on vulnerable communities",
              "Assessing the impact of climate change on the spread of vector-borne diseases",
              "Developing community resilience programs to climate-related health risks",
            ],
          },
          {
            name: "Mental Health and Community Well-being",
            topics: [
              "Developing community-based mental health care initiatives",
              "Integrating mental health services into primary healthcare systems",
              "Reducing stigma and improving mental health literacy",
            ],
          },
        ],
      },
      {
        id: "economics",
        title: "Inclusive Economic Growth and Poverty Alleviation",
        subtitle: "",
        description:
          "This theme is in line with SDG 1 (No Poverty) and SDG 8 (Decent Work and Economic Growth), examining ways to create economic opportunities that are inclusive and sustainable. Areas of research focus may include, but are not confined to, models of social entrepreneurship, programs for livelihood development, and educational trajectories that culminate in sustainable employment, with particular attention to the context of the Philippines.",
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        colorClass: "from-amber-600 to-amber-700",
        themes: [
          {
            name: "Financial Inclusion and Microfinance",
            topics: [
              "Digital financial services and inclusion strategies for the unbanked and underbanked populations",
              "The impact of microfinance on poverty alleviation and economic empowerment",
              "Financial literacy programs tailored for rural and low-income populations",
            ],
          },
          {
            name: "Sustainable Employment and Entrepreneurship",
            topics: [
              "Skill development and vocational training aligned with market demands",
              "Support systems and networks for micro, small, and medium enterprises (MSMEs)",
              "Entrepreneurship education and incubation programs for youth and women",
            ],
          },
          {
            name: "Renewable Energy and Economic Empowerment",
            topics: [
              "Access to clean and affordable energy as a driver for small business growth",
              "The role of renewable energy technologies in creating jobs and reducing poverty",
              "Community-based renewable energy projects and their economic impacts",
            ],
          },
          {
            name: "Education for Economic Opportunity",
            topics: [
              "Education technology solutions for remote and underserved areas",
              "Lifelong learning and upskilling for adaptability in the changing labor market",
              "Policies for inclusive education and their impacts on economic mobility",
            ],
          },
          {
            name: "Social Protection and Resilience Building",
            topics: [
              "Social safety nets and their role in preventing economic shocks",
              "Climate change adaptation strategies to protect vulnerable communities",
              "Community-led disaster risk reduction and economic resilience initiatives",
            ],
          },
          {
            name: "Gender Equality and Economic Participation",
            topics: [
              "Barriers and enablers of women's participation in the economy",
              "Gender-responsive economic policies and their effectiveness",
              "Empowering women entrepreneurs through access to capital and markets",
            ],
          },
        ],
      },
      {
        id: "environment",
        title: "Partnerships for Environmental Stewardship and Innovation",
        subtitle: "Sustainable Partnerships",
        description:
          "Linking to SDG 17 (Partnerships for the Goals) and SDG 13 (Climate Action), research could focus on forming responsible partnerships that promote environmental sustainability. Topics can include green technology development, conservation efforts, and sustainable urban planning, leveraging collaborations between academia, industry, and government.",
        image:
          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        colorClass: "from-emerald-600 to-emerald-700",
        themes: [
          {
            name: "Climate Change Mitigation and Adaptation Strategies",
            topics: [
              "Development of resilient infrastructure and urban planning",
              "Innovative carbon capture and storage technologies",
              "Community-based adaptation practices in vulnerable regions",
            ],
          },
          {
            name: "Biodiversity Conservation and Ecosystem Services",
            topics: [
              "Impact of climate change on biodiversity and ecosystem resilience",
              "Restoration techniques for degraded ecosystems",
              "Valuation and sustainable management of ecosystem services",
            ],
          },
          {
            name: "Green Technologies and Sustainable Industrial Processes",
            topics: [
              "Lifecycle assessment of products and services",
              "Waste-to-energy technologies and circular economy models",
              "Eco-efficient industrial processes and sustainable manufacturing",
            ],
          },
          {
            name: "Sustainable Urban Development and Smart Cities",
            topics: [
              "Urban planning for climate resilience and carbon neutrality",
              "Smart technologies for energy, water, and waste management",
              "Green building and sustainable construction materials",
            ],
          },
          {
            name: "Environmental Policy, Governance, and Sustainable Financing",
            topics: [
              "Policy frameworks for green investments and sustainable finance",
              "Multilateral environmental agreements and their implementation",
              "Public-private partnerships for environmental innovation",
            ],
          },
          {
            name: "Community Engagement and Climate Action",
            topics: [
              "Empowering communities for climate action and sustainability",
              "Indigenous knowledge and practices in climate adaptation",
              "Social innovation and participatory approaches to environmental stewardship",
            ],
          },
        ],
      },
      {
        id: "governance",
        title: "Social Justice, and Ethical Governance",
        subtitle: "Ethical Governance",
        description:
          "In alignment with SDG 16 (Peace, Justice, and Strong Institutions), this theme would explore the intersection of social justice with governance. Research could examine the role of educational institutions in promoting ethical leadership, transparency in government, and policies that uphold human rights and welfare, particularly examining the Philippine governance context and its challenges.",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        colorClass: "from-purple-600 to-purple-700",
        themes: [
          {
            name: "Accountability and Transparency in Governance",
            topics: [
              "Mechanisms to enhance transparency and accountability in public institutions",
              "The role of technology in promoting open governance",
              "Strategies for combating corruption and its impact on social justice",
            ],
          },
          {
            name: "Human Rights and Social Equity",
            topics: [
              "The enforcement of human rights standards in governance",
              "Addressing systemic inequalities through policy reforms",
              "The role of international institutions in upholding social justice globally",
            ],
          },
          {
            name: "Peacebuilding and Conflict Resolution",
            topics: [
              "Strategies for preventing and resolving conflicts at various scales",
              "The role of local communities in peacebuilding processes",
              "Post-conflict recovery and the establishment of resilient institutions",
            ],
          },
          {
            name: "Social Protection Systems",
            topics: [
              "Research on how social protection programs can support the reintegration of ex-offenders",
              "Exploring how IT can facilitate access to social protection services for marginalized communities",
              "Investigating social protection strategies for communities economically dependent on tourism",
            ],
          },
          {
            name: "Public Service Innovation",
            topics: [
              "Innovations in public service delivery to enhance accessibility and efficiency",
              "The role of public-private partnerships in service provision",
              "Citizen feedback mechanisms to improve public services",
            ],
          },
          {
            name: "Environmental Justice and Governance",
            topics: [
              "Policies for managing environmental resources ethically and sustainably",
              "Addressing the disproportionate impact of environmental degradation on vulnerable populations",
              "The governance of common goods for equitable access and sustainability",
            ],
          },
        ],
      },
    ],
  },
  strategicGoals: [
    {
      id: "quality",
      title: "Enhance research quality",
      description: "Through rigorous peer-review and publication support",
      icon: "📊",
    },
    {
      id: "collaboration",
      title: "Foster collaboration",
      description: "Encouraging cross-departmental research initiatives",
      icon: "🤝",
    },
    {
      id: "linkages",
      title: "Strengthen linkages",
      description: "Bridging research with real-world applications",
      icon: "🌐",
    },
  ],
  globalAlignments: [
    {
      id: "sdgs",
      name: "UN SDGs",
      image:
        "https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/07/SDG_Wheel_Transparent-1.png",
      alt: "UN Sustainable Development Goals",
    },
    {
      id: "laudato",
      name: "Laudato Si'",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Whole_World_-_Land_and_Oceans_12000.jpg/1200px-Whole_World_-_Land_and_Oceans_12000.jpg",
      alt: "Laudato Si Goals",
    },
    {
      id: "hnrda",
      name: "HNRDA",
      image:
        "https://www.dost.gov.ph/wp-content/uploads/2022/03/HNRDA-Banner-1024x576.png",
      alt: "Harmonized National R&D Agenda",
    },
  ],
};

// Reusable Card Components
const ResearchPillarCard: React.FC<{ pillar: Pillar }> = ({ pillar }) => (
  <div className="group h-full flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="relative h-48 overflow-hidden">
      <img
        src={pillar.image}
        alt={`${pillar.title} - ${pillar.subtitle}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b ${pillar.colorClass} bg-opacity-80 flex items-end`}
      >
        <div className="p-5 w-full">
          <h3 className="text-2xl font-bold text-white">{pillar.title}</h3>
          <h4 className="text-lg font-medium text-white opacity-90">
            {pillar.subtitle}
          </h4>
        </div>
      </div>
    </div>

    <div className="bg-white p-6 flex-grow flex flex-col">
      <p className="text-gray-600 mb-4">{pillar.description}</p>

      <div className="space-y-4">
        {pillar.themes.map((theme, themeIndex) => (
          <div
            key={`${pillar.id}-theme-${themeIndex}`}
            className="border-l-2 border-indigo-300 pl-3"
          >
            <h4 className="font-semibold text-gray-800">{theme.name}</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
              {theme.topics.map((topic, topicIndex) => (
                <li
                  key={`${pillar.id}-topic-${topicIndex}`}
                  className="flex items-start"
                >
                  <span className="text-indigo-500 mr-2 mt-1">•</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
    <div className="text-3xl mb-4">{goal.icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{goal.title}</h3>
    <p className="text-gray-600">{goal.description}</p>
  </div>
);

const AlignmentBadge: React.FC<{ alignment: Alignment }> = ({ alignment }) => (
  <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg flex items-center hover:bg-white/20 transition-colors">
    <img
      src={alignment.image}
      alt={alignment.alt}
      className="h-10 w-10 object-contain mr-3"
      loading="lazy"
    />
    <span className="font-medium text-sm sm:text-base">{alignment.name}</span>
  </div>
);

// New Circle Diagram Component with Images
const PillarCircles: React.FC = () => {
  const pillars = RESEARCH_AGENDA.framework.pillars;

  return (
    <div className="relative w-full max-w-2xl mx-auto h-96 mb-20 mt-10">
      {/* Center circle with theme */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center p-4 text-center text-white font-medium text-sm z-1">
          <img
            src={`../src/assets/images/smcLogo.png`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Surrounding circles with images */}
      {pillars.map((pillar, index) => {
        const angle = index * 72 - 90;
        const radius = 180;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div
            key={pillar.id}
            className="absolute w-32 h-32 rounded-full shadow-lg flex items-center justify-center text-white font-medium text-center text-sm p-3 transform -translate-x-1/2 -translate-y-1/2 z-1 overflow-hidden"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            {/* Replace with your actual image paths */}
            <img
              src={`../src/assets/images/Area${index + 1}.png`}
              alt={pillar.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {pillars.map((pillar, index) => {
          const angle1 = index * 72 - 90;
          const angle2 = ((index + 1) % 5) * 72 - 90;
          const radius = 50;
          const x1 = 50 + Math.cos((angle1 * Math.PI) / 180) * radius;
          const y1 = 50 + Math.sin((angle1 * Math.PI) / 180) * radius;
          const x2 = 50 + Math.cos((angle2 * Math.PI) / 180) * radius;
          const y2 = 50 + Math.sin((angle2 * Math.PI) / 180) * radius;

          return (
            <line
              key={`line-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#8884d8"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          );
        })}
      </svg>
    </div>
  );
};
// Main Component
const HomeInstitutionalAgenda: React.FC = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Circle Diagram */}

      <section className="mb-10">
        <PillarCircles />
      </section>
      {/* Hero Section */}
      <section className="text-center mb-18 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Institutional Research Agenda
        </h1>

        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-6">
          <p className="text-lg text-gray-800 italic font-medium">
            "{RESEARCH_AGENDA.framework.theme}"
          </p>
        </div>
      </section>

      {/* Research Pillars Section */}
      <section className="mb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_AGENDA.framework.pillars.map((pillar) => (
            <ResearchPillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeInstitutionalAgenda;

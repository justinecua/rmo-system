import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TWForm1 = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[90vh] sm:h-[85vh]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10">
        <div className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-2 sm:p-3 md:p-4">
          {/* Logo - Responsive sizing */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center bg-white rounded-full shadow-md mr-2 sm:mr-3 md:mr-4">
            <img
              className="w-full h-auto"
              src="../../src/assets/images/smcLogo.png"
              alt="St. Michael's College Logo"
            />
          </div>

          {/* Title - Responsive text and layout */}
          <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
            <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold line-clamp-1 sm:line-clamp-2">
              ST. MICHAEL'S COLLEGE OF ILIGAN, INC.
            </h1>
            <h2 className="text-[0.6rem] sm:text-xs md:text-sm font-medium line-clamp-1">
              TW Form 1: Approval of Thesis Title and Nomination of Panel of
              Examiners
            </h2>
          </div>

          {/* Document Info - Responsive visibility */}
          <div className="hidden xs:block w-32 sm:w-40 md:w-48 flex-shrink-0 text-[1rem] xs:text-[0.6rem] sm:text-xs bg-white/20 backdrop-blur-sm rounded p-1 sm:p-2 ml-1 sm:ml-2 md:ml-3">
            <div className="truncate font-medium">SMCII.RMO.TWF1.001</div>
            <div className="flex justify-between mt-0.5 sm:mt-1">
              <span className="bg-white/30 px-1 py-0.5 rounded text-nowrap">
                Rev: 0
              </span>
              <span className="text-nowrap">Eff: 2.12.2025</span>
            </div>
          </div>
        </div>

        {/* Mobile info bar - shows on xs screens and below */}
        <div className="xs:hidden bg-indigo-800 text-white text-[0.5rem] p-1 flex justify-between items-center">
          <span className="truncate pr-1">SMCII.RMO.TWF1.001</span>
          <div className="flex gap-0.5">
            <span className="bg-white/20 px-0.5 py-0.25 rounded">Rev: 0</span>
            <span className="bg-white/20 px-0.5 py-0.25 rounded">
              Eff: 2.12.2025
            </span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 p-2 sm:p-3 md:p-4 lg:p-6 space-y-3 sm:space-y-4 md:space-y-5">
        {/* First Row - Responsive grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              College
            </label>
            <Select>
              <SelectTrigger className="w-full bg-white border-gray-300 h-8 sm:h-9 md:h-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm">
                <SelectValue placeholder="Select College" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="college1" className="text-xs sm:text-sm">
                  College of Arts and Sciences
                </SelectItem>
                <SelectItem value="college2" className="text-xs sm:text-sm">
                  College of Business
                </SelectItem>
                <SelectItem value="college3" className="text-xs sm:text-sm">
                  College of Education
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Institutional Research Agenda
            </label>
            <Select>
              <SelectTrigger className="w-full bg-white border-gray-300 h-8 sm:h-9 md:h-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm">
                <SelectValue placeholder="Select Agenda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agenda1" className="text-xs sm:text-sm">
                  Research Priority 1
                </SelectItem>
                <SelectItem value="agenda2" className="text-xs sm:text-sm">
                  Research Priority 2
                </SelectItem>
                <SelectItem value="agenda3" className="text-xs sm:text-sm">
                  Research Priority 3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              College Research Agenda
            </label>
            <Select>
              <SelectTrigger className="w-full bg-white border-gray-300 h-8 sm:h-9 md:h-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm">
                <SelectValue placeholder="Select Agenda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="college-agenda1"
                  className="text-xs sm:text-sm"
                >
                  Departmental Priority 1
                </SelectItem>
                <SelectItem
                  value="college-agenda2"
                  className="text-xs sm:text-sm"
                >
                  Departmental Priority 2
                </SelectItem>
                <SelectItem
                  value="college-agenda3"
                  className="text-xs sm:text-sm"
                >
                  Departmental Priority 3
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Proponents - Responsive layout */}
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 border-b pb-1">
            Proponents
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            <Input
              placeholder="Proponent 1"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
            <Input
              placeholder="Proponent 2"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
            <Input
              placeholder="Proponent 3"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Proposed Titles - Responsive spacing */}
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 border-b pb-1">
            Proposed Titles
          </h3>
          <div className="space-y-2">
            <Input
              placeholder="Title 1"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
            <Input
              placeholder="Title 2"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
            <Input
              placeholder="Title 3"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Adviser - Responsive sizing */}
        <div className="space-y-1">
          <label className="block text-sm sm:text-base md:text-lg font-semibold text-gray-800">
            Adviser
          </label>
          <Select>
            <SelectTrigger className="w-full bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm">
              <SelectValue placeholder="Select Adviser" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adviser1" className="text-xs sm:text-sm">
                Dr. Juan Dela Cruz
              </SelectItem>
              <SelectItem value="adviser2" className="text-xs sm:text-sm">
                Dr. Maria Santos
              </SelectItem>
              <SelectItem value="adviser3" className="text-xs sm:text-sm">
                Prof. Robert Lim
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Panel of Examiners - Responsive grid */}
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 border-b pb-1">
            Panel of Examiners
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            <Input
              placeholder="Examiner 1"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
            <Input
              placeholder="Examiner 2"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
            <Input
              placeholder="Examiner 3"
              className="bg-white border-gray-300 h-8 sm:h-9 md:h-10 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Signatures - Responsive layout */}
        <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 md:pt-5 pb-4 sm:pb-6 md:pb-8">
          <div className="space-y-1">
            <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
              College Dean
            </h3>
            <Select>
              <SelectTrigger className="w-full bg-white border-gray-300 h-8 sm:h-9 md:h-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm">
                <SelectValue placeholder="Select Dean" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dean1" className="text-xs sm:text-sm">
                  Dr. Anna Reyes
                </SelectItem>
                <SelectItem value="dean2" className="text-xs sm:text-sm">
                  Dr. Mark Torres
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
              Coordinator, Research Management Office
            </h3>
            <Select>
              <SelectTrigger className="w-full bg-white border-gray-300 h-8 sm:h-9 md:h-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm">
                <SelectValue placeholder="Select Coordinator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coordinator1" className="text-xs sm:text-sm">
                  Dr. Lisa Gomez
                </SelectItem>
                <SelectItem value="coordinator2" className="text-xs sm:text-sm">
                  Prof. James Wilson
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
              Vice President, Academic Affairs
            </h3>
            <Select>
              <SelectTrigger className="w-full bg-white border-gray-300 h-8 sm:h-9 md:h-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm">
                <SelectValue placeholder="Select VP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vp1" className="text-xs sm:text-sm">
                  Dr. Susan Chen
                </SelectItem>
                <SelectItem value="vp2" className="text-xs sm:text-sm">
                  Dr. Michael Brown
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TWForm1;

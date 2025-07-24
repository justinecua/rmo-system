import Sidebar from "@/sidebar/sidebar";
import { useEffect, useState } from "react";
import { get_formTypes } from "@/api/forms/forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TWForm1 from "@/features/forms/tw1Form";

const StudentForms = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await get_formTypes();
        setForms(data);
      } catch (error) {
        console.error("Failed to fetch form types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleOpenModal = (form) => {
    setSelectedForm(form);
    setOpen(true);
  };

  return (
    <div className="flex w-full h-screen bg-[#f5f7fb]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[50vw] h-[91vh]">
          <TWForm1 />
        </DialogContent>
      </Dialog>

      <div className="p-4 flex-1 transition-all duration-300">
        <div className="bg-white p-5 h-full rounded-md">
          <div>
            <h3 className="text-md">Forms</h3>
          </div>

          {loading ? (
            <div className="text-center mt-10 text-gray-500">Loading...</div>
          ) : forms.length === 0 ? (
            <div className="text-center mt-10 text-gray-500">
              No forms available.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
              {forms.map((form, index) => (
                <div
                  onClick={() => handleOpenModal(form)}
                  key={index}
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
                      {form?.formName}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        {form?.formDescription}
                      </span>
                      {/* <span
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
                      </span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentForms;

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, UploadCloud, FileText, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SUBMIT_ARTICLE, GET_COLLEGES_URL } from "@/api/urls";
import { toast } from "sonner";

const SubmitArticleDialog = ({ open, onOpenChange }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [emails, setEmails] = useState([""]);
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState([""]);
  const [keywords, setKeywords] = useState([""]);
  const [abstractWordCount, setAbstractWordCount] = useState(0);

  useEffect(() => {
    axios.get(GET_COLLEGES_URL).then((res) => {
      setColleges(res.data);
    });
  }, []);

  const validateFile = (selectedFile) => {
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Only PDF files are accepted.");
        setFile(null);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    validateFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    validateFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("abstract", abstract);
    formData.append("college", selectedCollege);
    formData.append("file", file);

    emails.forEach((e) => formData.append("emails[]", e));
    authors.forEach((a) => formData.append("authors[]", a));
    keywords.forEach((k) => formData.append("keywords[]", k));

    try {
      setLoading(true);
      await axios.post(SUBMIT_ARTICLE, formData);
      setLoading(false);

      toast.success("Article submitted successfully!");

      setFile(null);
      setTitle("");
      setAbstract("");
      setSelectedCollege("");
      setEmails([""]);
      setAuthors([""]);
      setKeywords([""]);
      setAbstractWordCount(0);
      onOpenChange(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("Failed to submit article. Please try again.");
      setError("Failed to submit article.");
    }
  };

  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = value;
    setAuthors(updatedAuthors);
  };

  const addAuthorField = () => setAuthors([...authors, ""]);
  const removeAuthorField = (index) =>
    setAuthors(authors.filter((_, i) => i !== index));

  const triggerFileInput = () => fileInputRef.current?.click();
  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeywordChange = (index, value) => {
    const updated = [...keywords];
    updated[index] = value;
    setKeywords(updated);
  };

  const addKeywordField = () => setKeywords([...keywords, ""]);
  const removeKeywordField = (index) =>
    setKeywords(keywords.filter((_, i) => i !== index));

  const handleAbstractChange = (value) => {
    const cleaned = value
      .replace(/\s*\n\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    setAbstract(cleaned);
    const words = cleaned.split(" ").filter((word) => word !== "").length;
    setAbstractWordCount(words);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[50vw] p-0 overflow-hidden rounded-2xl overflow-y-auto h-[85vh]">
        <DialogHeader className="relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            />
          </div>
          <div className="pt-6 px-6">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Submit Your Article
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1">
              Upload your research article in PDF format
            </p>
          </div>
        </DialogHeader>

        <form className="space-y-4 px-6 pb-6" onSubmit={handleSubmit}>
          <div>
            <Label className="mb-2">Title</Label>
            <Input
              className="normal-case"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className="mb-2">College</Label>
            <select
              required
              className="w-full p-2 border rounded-md text-sm"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              <option value="">Select a College</option>
              {colleges.map((c) => (
                <option
                  className="text-sm"
                  key={c.college_id}
                  value={c.college_id}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="mb-2">Emails</Label>
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    const updated = [...emails];
                    updated[index] = e.target.value;
                    setEmails(updated);
                  }}
                  placeholder={`Email ${index + 1}`}
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setEmails(emails.filter((_, i) => i !== index))
                    }
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setEmails([...emails, ""])}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Another Email
            </button>
          </div>

          <div>
            <Label className="mb-2">Abstract</Label>
            <Textarea
              rows={8}
              value={abstract}
              onChange={(e) => handleAbstractChange(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              Word Count: {abstractWordCount}
            </p>
            {abstractWordCount > 250 && (
              <p className="text-sm text-red-500 mt-1">
                Abstract exceeds the 250-word limit.
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2">Authors</Label>
            {authors.map((author, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  placeholder={`Author ${index + 1}`}
                />
                {authors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAuthorField(index)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAuthorField}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Another Author
            </button>
          </div>

          <div>
            <Label className="mb-2">Keywords</Label>
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <Input
                  value={keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  placeholder={`Keyword ${index + 1}`}
                />
                {keywords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeKeywordField(index)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addKeywordField}
              className="text-blue-600 text-sm hover:underline"
            >
              + Add Another Keyword
            </button>
          </div>

          <Label className="mb-2">PDF File</Label>
          {file && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 rounded-full bg-blue-100/50">
                <UploadCloud className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {file ? "Replace PDF file" : "Drag & drop your PDF here"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to browse files
                </p>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="gap-2">
            <Button
              type="submit"
              className="bg-[#160e73] text-white w-full flex items-center justify-center"
              disabled={!file || loading || abstractWordCount > 250}
            >
              {loading ? (
                <>
                  Submitting...
                  <Loader2 className="w-4 h-4 ml-1 animate-spin" />
                </>
              ) : (
                "Submit Article"
              )}
            </Button>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg flex items-center">
              <X className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitArticleDialog;

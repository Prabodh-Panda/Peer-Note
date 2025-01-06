import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import TagInput from "../Inputs/TagInput";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { GRADES } from "@/lib/grades";

interface Props {
  isOpen: boolean;
  onOpenChange: (_open: boolean) => void;
}

interface ApiResponse {
  message: string;
  data: string;
}

interface FileDetails {
  summary: string;
  tags: string[];
  subject: string;
}

export default function UploadNoteDialog({ isOpen, onOpenChange }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const generateDetails = async () => {
    if (!file || file.type != "application/pdf") {
      toast.error("Choose a valid file");
      return;
    }
    const toastId = toast.loading(
      "Loading Details. It may take upto a minute!"
    );
    setLoading(true);
    try {
      const fileStr = (await toBase64(file)).replace(
        "data:application/pdf;base64,",
        ""
      );
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "/api/getResponse",
        {
          base64string: fileStr,
        }
      );
      const data: FileDetails = JSON.parse(response.data.data);
      if (!data) {
        toast.error("Error while getting details, please enter manually!");
        setLoading(false);
        toast.dismiss(toastId);
        return;
      }
      setTitle(data.subject);
      setTags(data.tags);
      setSummary(data.summary);
    } catch (error) {
      toast.error("Error while parsing file");
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex items-center justify-center z-50 w-[90vw] max-w-[1000px]">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <DialogTitle className="text-2xl font-bold mb-4">
            Upload Note
          </DialogTitle>
          <form>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  File Upload
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-darker"
                  onClick={generateDetails}
                >
                  Generate Details
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  {GRADES.map((grade) => (
                    <option key={grade.label} value={grade.value}>
                      {grade.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Summary
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                rows={5}
              />
            </div>
            <div className="flex justify-end">
              <DialogClose className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg mr-2">
                Cancel
              </DialogClose>
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-darker"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

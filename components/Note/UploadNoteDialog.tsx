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
import { useAuthState } from "@/zustand/auth";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { Database } from "@/lib/supabase/database.types";

type NoteRow = Database["public"]["Tables"]["notes"]["Insert"];

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
  const user = useAuthState((state) => state.user);
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    const file_id = uuidv4();

    if (!file) return;

    if (!tags || tags.length < 1) {
      toast.error("Enter atleast one tag");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating Note");

    try {
      const { data, error } = await supabase.storage
        .from("notes")
        .upload(`${file_id}.pdf`, file);

      if (error) {
        throw error.message;
      }

      const public_url = supabase.storage.from("notes").getPublicUrl(data.path);

      const payload = {
        title,
        subject,
        grade,
        tags,
        summary,
        is_public: isPublic,
        email: user.email,
        file_url: public_url.data.publicUrl,
      } as NoteRow;
      const { error: tableError } = await supabase
        .from("notes")
        .insert(payload);

      if (tableError) {
        throw tableError.message;
      }

      toast.success("Note added", { id: toastId });
      setTitle("");
      setSubject("");
      setGrade("");
      setSubject("");
      setTags([]);
      setSummary("");
      setIsPublic(false);
      onOpenChange(false);
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
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
                  required
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
                required
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
                  required
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
                  required
                >
                  <option value="" disabled>
                    Select a grade
                  </option>
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
                required
              />
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-accent rounded"
                />
                <span className="ml-2 text-gray-700">
                  Make this note public
                </span>
              </label>
            </div>
            <div className="flex justify-end">
              <DialogClose className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg mr-2">
                Cancel
              </DialogClose>
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-darker disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-black"
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

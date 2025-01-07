"use client";

import { useEffect, useState } from "react";
import UploadNoteDialog from "@/components/Note/UploadNoteDialog";
import Navbar from "@/components/Navbar";
import { useAuthState } from "@/zustand/auth";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { Note } from "@/lib/supabase/helpers";

export default function BrowseNotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("notes").select();
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.join(",").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const user = useAuthState((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-white to-accent">
      <Navbar />

      <main className="container mx-auto py-16 px-10">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
          Browse Notes
        </h2>
        <div className="mb-8 flex justify-between">
          <input
            type="text"
            placeholder="Search notes by title, subject, tags or grade..."
            className="w-full px-4 py-3 rounded-lg shadow-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {user ? (
            <button
              onClick={() => setIsDialogOpen(true)}
              className="ml-4 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-darker transition-all"
            >
              Upload Note
            </button>
          ) : (
            <button
              className="ml-4 px-6 py-3 bg-gray-200 rounded-lg cursor-not-allowed"
              disabled
            >
              Login to Upload Note
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? <p>Loading Notes...</p> : null}
          {!loading && filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
              >
                <h3 className="text-2xl font-bold mb-4">{note.title}</h3>
                <p className="mb-2">
                  <strong>Subject:</strong> {note.subject}
                </p>
                <p className="mb-2">
                  <strong>Visibility: </strong>
                  {note.is_public ? "Public" : "Private"}
                </p>
                <p className="mb-4">
                  <strong>Grade:</strong> {note.grade}
                </p>
                <p className="mb-4">
                  <strong>Tags:</strong> {note.tags.join(", ")}
                </p>
                <a
                  href={`/browse/${note.id}`}
                  className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-darker transition-transform transform hover:scale-105 mt-auto w-fit"
                >
                  View Details
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-600">
              No notes found. Try searching for something else.
            </p>
          )}
        </div>
      </main>

      <UploadNoteDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <footer className="bg-accent text-white p-6 text-center shadow-inner">
        <div className="container mx-auto">
          <p>&copy; 2025 PeerNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

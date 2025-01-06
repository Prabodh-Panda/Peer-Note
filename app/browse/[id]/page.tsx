"use client";

import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Note } from "@/lib/supabase/helpers";
import { use, useEffect, useState } from "react";

export default function NoteDetails({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = use(params).id;
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<Note | undefined>(undefined);
  const fetchNote = async (id: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("id", id)
      .single();
    setLoading(false);
    if (error) {
      return;
    }
    setNote(data);
  };

  useEffect(() => {
    fetchNote(id);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto text-center py-16">
        <h2 className="text-3xl font-extrabold text-gray-900">Loading....</h2>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container mx-auto text-center py-16">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Note Not Found
        </h2>
        <p className="text-lg text-gray-600">
          The note you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-accent via-white to-bg-accent">
      <Navbar />

      <main className="container mx-auto py-16 px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold mb-6 text-center">
            {note.title}
          </h2>
          <p className="text-lg mb-6">{note.summary}</p>
          <div className="space-y-2">
            <p>
              <strong>Subject:</strong> {note.subject}
            </p>
            <p>
              <strong>Grade:</strong> {note.grade}
            </p>
            <p>
              <strong>Tags:</strong> {note.tags.join(", ")}
            </p>
          </div>

          <div className="mt-8 text-center">
            <a
              href={note.file_url}
              download
              className="px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-darker transition-all"
              target="_blank"
            >
              Download Note
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-accent text-white p-6 text-center shadow-inner">
        <div className="container mx-auto">
          <p>&copy; 2025 PeerNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

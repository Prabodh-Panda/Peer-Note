"use client";
import { supabase } from "@/lib/supabase";
import { Note } from "@/lib/supabase/helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NotesList() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select()
      .order("created_at", { ascending: false })
      .limit(3);
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
  return (
    <div className="bg-accent py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
          Latest Notes
        </h2>
        {loading ? (
          <p className="text-white font-bold text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow flex flex-col"
              >
                <h3 className="text-2xl font-bold mb-4">{note.title}</h3>
                <p className="mb-2">
                  <strong>Subject:</strong> {note.subject}
                </p>
                <p className="mb-4">
                  <strong>Grade:</strong> {note.grade}
                </p>
                <p className="mb-4">
                  <strong>Visibility:</strong>{" "}
                  {note.is_public ? "Public" : "Private"}
                </p>
                <p className="mb-4">
                  <strong>Tags:</strong> {note.tags.join(", ")}
                </p>
                <Link
                  href={`/browse/${note.id}`}
                  className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-darker transition-transform transform hover:scale-105 mt-auto w-fit"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

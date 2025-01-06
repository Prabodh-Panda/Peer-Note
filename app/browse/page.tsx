"use client";

import { useState } from "react";
import UploadNoteDialog from "@/components/Note/UploadNoteDialog";
import Navbar from "@/components/Navbar";

export default function BrowseNotes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const demoNotes = [
    {
      id: 1,
      title: "Introduction to Biology",
      subject: "Biology",
      grade: "Grade 10",
    },
    {
      id: 2,
      title: "Basics of Algebra",
      subject: "Mathematics",
      grade: "Grade 9",
    },
    {
      id: 3,
      title: "World History Overview",
      subject: "History",
      grade: "Grade 11",
    },
    {
      id: 4,
      title: "Physics Fundamentals",
      subject: "Physics",
      grade: "Grade 12",
    },
  ];

  const filteredNotes = demoNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            placeholder="Search notes by title, subject, or grade..."
            className="w-full px-4 py-3 rounded-lg shadow-md border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsDialogOpen(true)}
            className="ml-4 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-darker transition-all"
          >
            Upload Note
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-4">{note.title}</h3>
                <p className="mb-2">
                  <strong>Subject:</strong> {note.subject}
                </p>
                <p className="mb-4">
                  <strong>Grade:</strong> {note.grade}
                </p>
                <a
                  href={`/notes/${note.id}`}
                  className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent-darker transition-transform transform hover:scale-105"
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

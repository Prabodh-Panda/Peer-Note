export default async function NoteDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  // Demo data for note details (in real apps, this would come from an API or database)
  const demoNotes = [
    {
      id: "1",
      title: "Introduction to Biology",
      description:
        "A comprehensive overview of biological concepts, including cell structure, genetics, and ecosystems.",
      subject: "Biology",
      grade: "Grade 10",
      tags: ["Biology", "Cell Structure", "Genetics"],
      fileUrl: "/files/biology_intro.pdf", // URL to the file (you'd replace this with a real file path)
    },
    {
      id: "2",
      title: "Basics of Algebra",
      description:
        "An introductory guide to basic algebraic concepts, such as equations, inequalities, and graphing.",
      subject: "Mathematics",
      grade: "Grade 9",
      tags: ["Algebra", "Equations", "Graphing"],
      fileUrl: "/files/algebra_basics.pdf",
    },
    // Add other notes as needed
  ];

  // Find the note by ID
  const note = demoNotes.find((note) => note.id === id);

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
      <header className="bg-accent text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-tight">PeerNotes</h1>
          <nav className="space-x-6">
            <a href="/" className="hover:underline text-lg">
              Home
            </a>
            <a href="/browse" className="hover:underline text-lg">
              Browse Notes
            </a>
            <a href="/login" className="hover:underline text-lg">
              Login
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-16 px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold mb-6 text-center">
            {note.title}
          </h2>
          <p className="text-lg mb-6">{note.description}</p>
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
              href={note.fileUrl}
              download
              className="px-8 py-4 bg-accent text-white font-bold rounded-lg hover:bg-accent-darker transition-all"
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

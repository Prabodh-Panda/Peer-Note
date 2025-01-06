interface Note {
  id: number;
  title: string;
  subject: string;
  grade: string;
}

export default function NotesList({ notes }: { notes: Note[] }) {
  return (
    <div className="bg-accent py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
          Latest Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

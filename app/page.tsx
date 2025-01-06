import HeroSection from "../components/HeroSection";
import FeatureHighlights from "../components/FeatureHighlights";
import NotesList from "../components/NotesList";

export default function Home() {
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
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bg-accent via-white to-bg-accent">
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

      <main className="flex-grow">
        <HeroSection />
        <FeatureHighlights />
        <NotesList notes={demoNotes} />
      </main>

      <footer className="bg-accent-darker text-white p-6 text-center shadow-inner">
        <div className="container mx-auto">
          <p>&copy; 2025 PeerNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import HeroSection from "../components/HeroSection";
import FeatureHighlights from "../components/FeatureHighlights";
import NotesList from "../components/NotesList";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bg-accent via-white to-bg-accent">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <FeatureHighlights />
        <NotesList />
      </main>

      <footer className="bg-accent-darker text-white p-6 text-center shadow-inner">
        <div className="container mx-auto">
          <p>&copy; 2025 PeerNotes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

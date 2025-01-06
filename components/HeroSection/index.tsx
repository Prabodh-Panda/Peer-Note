export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-accent to-accent-darker text-white py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6">Welcome to PeerNotes</h2>
        <p className="text-xl mb-10">
          Enhance your learning experience with seamless note sharing. Join us
          today!
        </p>
        <a
          href="/browse"
          className="px-8 py-4 bg-white text-accent font-bold rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
        >
          Browse Notes
        </a>
      </div>
    </div>
  );
}

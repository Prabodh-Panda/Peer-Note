export default function FeatureHighlights() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-8">Why Choose PeerNotes?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-r from-accent to-accent-darker text-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">User Authentication</h3>
            <p>Secure and seamless login experience.</p>
          </div>
          <div className="p-8 bg-gradient-to-r from-accent to-accent-darker text-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Note Categorization</h3>
            <p>Organize your notes by subject, grade, and tags effortlessly.</p>
          </div>
          <div className="p-8 bg-gradient-to-r from-accent to-accent-darker text-white rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Seamless Sharing</h3>
            <p>Upload, browse, and download notes with ease.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

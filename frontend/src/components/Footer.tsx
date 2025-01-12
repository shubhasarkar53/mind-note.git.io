export default function Footer() {
  return (
    <footer className="bg-white shadow-sm px-6 py-4 mt-auto">
      <div className="text-center text-sm text-gray-600">
        © {new Date().getFullYear()} MindNotes. All rights reserved.
      </div>
    </footer>
  );
}
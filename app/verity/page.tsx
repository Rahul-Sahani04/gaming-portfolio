import VerityNarrative from "./VerityNarrative";

export const metadata = {
  title: "Verity",
  description: "Something friendly found me.",
  robots: { index: false, follow: false },
};

export default function VerityPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <VerityNarrative />
    </main>
  );
}

import HorrorExperience from "./HorrorExperience";

export const metadata = {
  title: "VOID",
  description: "There is nothing here.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VoidPage() {
  return (
    <main className="fixed inset-0 min-h-screen bg-black w-full overflow-hidden text-white selection:bg-black selection:text-black z-[9999]">
      <HorrorExperience />
    </main>
  );
}

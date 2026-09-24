import Button from "@/registry/material-v1/ui/button";

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="flex flex-wrap items-center gap-6">
        {/* Anatomy 1 + 2: Container + Label text */}
        <Button>Label text</Button>

        {/* Anatomy 1 + 2 + 3: Container + Leading icon + Label text */}
        <Button leadingIcon={<PlusIcon />}>Label text</Button>
      </div>
    </main>
  );
}

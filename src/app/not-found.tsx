import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center bg-ink px-5 text-center text-white">
      <h1 className="text-5xl font-light">Page not found</h1>
      <p className="mt-4 text-white/60">This page does not exist or the listing has been sold.</p>
      <div className="mt-8"><Button href="/listings">Browse listings</Button></div>
    </section>
  );
}

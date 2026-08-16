import { siteConfig } from "@/config/site";

export function Hero() {
  const formattedDate = siteConfig.event.date.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = siteConfig.event.date.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section
      id="inicio"
      className="flex min-h-screen flex-col items-center justify-center bg-brand-50 px-6 text-center"
    >
      <p className="font-display text-sm uppercase tracking-[0.35em] text-accent-600">
        {siteConfig.couple.hashtag}
      </p>
      <h1 className="font-display mt-6 text-5xl text-brand-900 sm:text-7xl">
        {siteConfig.couple.groom}
        <span className="mx-4 text-accent-500">&amp;</span>
        {siteConfig.couple.bride}
      </h1>
      <p className="mt-6 max-w-md text-lg text-brand-700 capitalize">
        {formattedDate} · {formattedTime} hrs
      </p>
      <div className="mt-10 h-px w-24 bg-accent-400" />
    </section>
  );
}

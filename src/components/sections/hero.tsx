import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Hero() {
  const formattedDate = siteConfig.event.date.toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: siteConfig.event.timeZone,
  });

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <Image
        src={siteConfig.hero.backgroundImage}
        alt=""
        fill
        preload
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-display mt-6 text-5xl text-white sm:text-7xl [text-shadow:0_2px_16px_rgb(0_0_0_/_0.55)]">
          {siteConfig.couple.groom}
          <span className="mx-4 text-accent-400">&amp;</span>
          {siteConfig.couple.bride}
        </h1>
        <p className="mt-5 max-w-md text-lg text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0_/_0.5)]">
          {siteConfig.hero.invitationMessage}
        </p>
        <p className="mt-4 max-w-md text-lg text-white/90 capitalize [text-shadow:0_1px_8px_rgb(0_0_0_/_0.5)]">
          {formattedDate} · {siteConfig.event.displayTime} hrs
        </p>
        <div className="mt-10 h-px w-24 bg-white/70" />
        <div className="mt-10">
        <p className="font-display text-sm uppercase tracking-[0.35em] text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0_/_0.5)]">
          {siteConfig.couple.hashtag}
        </p>
        </div>
      </div>
    </section>
  );
}

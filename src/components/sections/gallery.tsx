"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="galeria" className="bg-brand-50 px-6 py-24 text-center">
      <h2 className="font-display text-3xl text-brand-900 sm:text-4xl">
        Nuestros momentos
      </h2>
      <p className="mt-2 text-sm uppercase tracking-widest text-brand-500">
        {siteConfig.gallery.credit}
      </p>

      <div className="relative mx-auto mt-10 max-w-3xl">
        <div className="overflow-hidden rounded-card" ref={emblaRef}>
          <div className="flex">
            {siteConfig.gallery.images.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/3] min-w-0 flex-[0_0_100%]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-brand-800 shadow hover:bg-paper"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Foto siguiente"
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-brand-800 shadow hover:bg-paper"
        >
          <ChevronRight size={20} />
        </button>

        <div className="mt-4 flex justify-center gap-2">
          {siteConfig.gallery.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Ir a foto ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full bg-brand-300 transition-all",
                index === selectedIndex && "w-6 bg-accent-500"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { siteConfig } from "@/config/site";
import { getPolaroidCards } from "@/lib/polaroid";
import { PolaroidDeck } from "@/components/sections/polaroid-deck";

export function Gallery() {
  const cards = getPolaroidCards();

  return (
    <section id="galeria" className="bg-brand-50 px-6 py-24 text-center">
      <h2 className="font-display text-3xl text-brand-900 sm:text-4xl">
        Nuestros momentos
      </h2>
      <p className="mt-2 text-sm uppercase tracking-widest text-brand-500">
        {siteConfig.gallery.credit}
      </p>

      <div className="mx-auto mt-10 max-w-3xl">
        {cards.length > 0 ? (
          <PolaroidDeck cards={cards} />
        ) : (
          <p className="text-brand-500">
            Agrega fotos a la carpeta public/polaroid para verlas aquí.
          </p>
        )}
      </div>
    </section>
  );
}

import { MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { googleMapsEmbedSrc, googleMapsUrl, wazeUrl } from "@/lib/maps";

export function Location() {
  return (
    <section
      id="ubicacion"
      className="bg-paper px-6 py-24 text-center"
    >
      <h2 className="font-display text-3xl text-brand-900 sm:text-4xl">
        ¿Dónde celebramos?
      </h2>
      <p className="mt-3 text-lg font-medium text-brand-800">
        {siteConfig.venue.name}
      </p>
      <p className="mx-auto mt-1 max-w-md text-brand-600">
        {siteConfig.venue.address}
      </p>

      <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-3 sm:flex-row">
        <a href={googleMapsUrl()} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" className="w-full">
            <MapPin size={18} />
            Abrir en Maps
          </Button>
        </a>
        <a href={wazeUrl()} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="w-full">
            <Navigation size={18} />
            Abrir en Waze
          </Button>
        </a>
      </div>

      <div className="mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-card shadow-lg">
        <iframe
          title="Ubicación del matrimonio"
          src={googleMapsEmbedSrc()}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

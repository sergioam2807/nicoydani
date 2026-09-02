import { Shirt } from "lucide-react";
import { siteConfig } from "@/config/site";

export function DressCode() {
  return (
    <section id="vestimenta" className="bg-brand-50 px-6 py-24 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-200 text-brand-700">
        <Shirt size={26} />
      </div>
      <h2 className="font-display mt-6 text-3xl text-brand-900 sm:text-4xl">
        Código de vestimenta
      </h2>
      <p className="mt-3 text-lg font-medium text-brand-800">
        {siteConfig.dressCode.title}
      </p>
      <p className="mx-auto mt-3 max-w-md text-brand-600">
        {siteConfig.dressCode.description}
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm italic text-brand-500">
        {siteConfig.dressCode.note}
      </p>
    </section>
  );
}

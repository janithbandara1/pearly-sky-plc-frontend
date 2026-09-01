"use client";

import Image from "next/image";
import { Globe2, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Location } from "@/lib/content/locations";

export function LocationCard({ location }: { location: Location }) {
  const { translate } = useLanguage();
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
          {location.flag ? (
            <Image src={location.flag} alt={location.name} fill sizes="40px" className="object-cover" />
          ) : (
            <Globe2 className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <span className="font-semibold">{location.name}</span>
      </div>
      {location.address && (
        <p className="flex gap-2 text-xs text-muted-foreground">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {location.address}
        </p>
      )}
      {location.contactNo && (
        <p className="flex gap-2 text-xs text-muted-foreground">
          <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {location.contactNo}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        {location.serviceCities.map((city) => (
          <span key={city} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
            {city}
          </span>
        ))}
      </div>
      {location.mapSrc && (
        <a
          href={location.mapSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-brand-gold-dark hover:underline"
        >
          {translate("locationsViewMap")}
        </a>
      )}
    </div>
  );
}

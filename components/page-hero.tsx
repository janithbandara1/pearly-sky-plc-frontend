import Image from "next/image";

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative flex h-[40vh] min-h-[280px] w-full items-center justify-center overflow-hidden bg-brand-navy text-center">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="relative z-10 mx-auto max-w-3xl px-4">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-black tracking-wide text-brand-cream drop-shadow-lg sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-brand-cream/85">{subtitle}</p>}
      </div>
    </section>
  );
}

import Link from "next/link";

interface ServiceLink {
  title: string;
  href: string;
}

const relatedServices: ServiceLink[] = [
  { title: "Deep Cleaning", href: "/fr/en/services/deep-cleaning" },
  {
    title: "Standard Residential Cleaning",
    href: "/fr/en/services/standard-residential-cleaning",
  },
  {
    title: "End of Tenancy Cleaning",
    href: "/fr/en/services/end-of-tenancy-cleaning",
  },
  {
    title: "Post-Construction Cleaning",
    href: "/fr/en/services/post-construction-renovation-cleaning",
  },
  { title: "Laundry & Ironing", href: "/fr/en/services/laundry-services" },
  {
    title: "Commercial & Office Cleaning",
    href: "/fr/en/services/commercial-office-cleaning",
  },
];

export default function RelatedServices() {
  return (
    <section className="w-full bg-[#F8F9FA] px-4 py-8 font-poppins">
      <h3 className="mb-4 text-center text-lg font-bold text-[#121E2D]">
        Explore Related Services
      </h3>
      
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
        {relatedServices.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="rounded-lg border-[1.5px] border-[#A98B4B] bg-white px-[18px] py-2 text-sm font-medium text-[#121E2D] transition-colors duration-200 hover:bg-[#A98B4B] hover:text-white"
          >
            {service.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
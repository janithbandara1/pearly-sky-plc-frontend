import type { ServiceHighlightCard } from "@/lib/content/service-details";

export interface ServiceHighlightsProps {
  title?: string;
  cards: ServiceHighlightCard[];
}

export function ServiceHighlights({ title, cards }: ServiceHighlightsProps) {
  return (
    <section>
      <h2 className="mb-4 text-center text-xl font-bold text-[#A98B4B] sm:text-2xl">{title ?? "What's Included"}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="flex h-full flex-col rounded-[10px] border-[1.5px] border-[#A98B4B] bg-white p-4"
          >
            <h3 className="mb-2 text-center text-sm font-semibold text-[#A98B4B]">{card.title}</h3>
            <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-[#151E2D] sm:text-sm">
              {card.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

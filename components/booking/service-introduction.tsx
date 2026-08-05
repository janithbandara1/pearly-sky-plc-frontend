export interface ServiceIntroductionProps {
  headline: string;
  body: string[];
}

export function ServiceIntroduction({ headline, body }: ServiceIntroductionProps) {
  return (
    <section className="space-y-3 rounded-[12px] border border-[#A98B4B] p-5 sm:p-8">
      <h2 className="text-center text-xl font-bold text-[#A98B4B] sm:text-2xl">{headline}</h2>
      {body.map((paragraph, index) => (
        <p key={index} className="text-sm leading-relaxed text-[#555] sm:text-base">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

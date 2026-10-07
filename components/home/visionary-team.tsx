"use client"
import { useLanguage } from "@/lib/i18n/language-context";
import { Mail } from "lucide-react";
import Image from "next/image";
import { optimizedBackgroundImage } from "@/lib/background-image";

const TEAM_BG = optimizedBackgroundImage("/images/about/visionary-team-bg.png", 1668, 624);

interface TeamMember {
  id: number;
  name: string;
  // Role keys correspond to translation identifiers for visionary designations
  role: "visionarydesignationsHR" | "visionarydesignationsMK" | "visionarydesignationsCUS" | "visionarydesignationsFIN";
  description?: string;
  photo: string;
  email: string;
}
const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Sophie Moreau",
    role: "visionarydesignationsHR",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing",
    photo: "/images/team/human-resources-304.webp",
    email: "administration@pearlyskyglobalclean.com",
  },
  {
    id: 2,
    name: "Pierre Dubois",
    role: "visionarydesignationsMK",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    photo: "/images/team/marketing-team-304.webp",
    email: "sales@pearlyskyglobalclean.com",
  },
  {
    id: 3,
    name: "Chloe Smith",
    role: "visionarydesignationsCUS",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    photo: "/images/team/customer-service-304.webp",
    email: "booking@pearlyskyglobalclean.com",
  },
  {
    id: 4,
    name: "Marc Laurent",
    role: "visionarydesignationsFIN",
    photo: "/images/team/finance-department-304.webp",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    email: "management@pearlyskyglobalclean.com",
  },
];

export function VisionaryTeam() {
   const { translate } = useLanguage()
    return(
        <div className="">
        {/* ================= OUR VISIONARY TEAM SECTION ================= */}
              <div
                className="relative flex w-full max-w-8xl  flex-col items-center overflow-hidden bg-cover bg-center  py-8 sm:px-6 sm:py-10  lg:py-12"
                style={{ backgroundImage: TEAM_BG }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/95 via-[#0B1528]/80 to-transparent pointer-events-none" />
                <h2 className="relative z-10 mb-6 text-center text-xl font-bold tracking-wide text-white sm:mb-9 sm:text-2xl lg:text-3xl">
                  {translate("visionaryTeamTitle")}
                </h2>
        
                {/* One list for both layouts — a marquee on mobile, a grid from
                    sm up — so each email link exists once in the page. The
                    second copy only completes the mobile marquee loop: it's
                    decorative (no links, aria-hidden) and hidden from sm up. */}
                <div className="relative z-10 w-full overflow-hidden md:max-w-4xl lg:max-w-5xl">
                  <div className="flex w-max animate-marquee gap-2.5 py-1 motion-reduce:animate-none hover:[animation-play-state:paused] sm:grid sm:w-full sm:animate-none sm:grid-cols-4 sm:justify-items-center sm:gap-4 sm:py-0 lg:gap-5">
                    {teamData.map((member) => (
                      <TeamCard key={member.id} member={member} />
                    ))}
                    {teamData.map((member) => (
                      <TeamCard key={`${member.id}-loop`} member={member} decorative />
                    ))}
                  </div>
                </div>
              </div>
    </div>
    )
}


function TeamCard({ member, decorative = false }: { member: TeamMember; decorative?: boolean }) {

   const { translate } = useLanguage();
   const emailPillClass = "mt-3 flex min-h-9 max-w-full items-center justify-center gap-1 rounded-full bg-[#fffdf4] px-2.5 py-2 text-[10px] leading-tight text-[#0A1530] transition-colors hover:bg-[#C9B678] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fffdf4] md:text-[11px] lg:text-[14px]";
   const emailContent = (
     <>
       <Mail size={16} className="shrink-0 text-[#C9B678]" />
       <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-300 group-hover:max-w-[220px] group-hover:opacity-100 group-focus-within:max-w-[220px] group-focus-within:opacity-100">
         {member.email}
       </span>
     </>
   );

  return (
    <article aria-hidden={decorative || undefined} className={`${decorative ? "sm:hidden " : ""}group flex min-h-[170px] w-[200px] shrink-0 flex-col items-center rounded-lg border border-[#C9B678]/80 bg-[#0A1530]/90 px-2 py-2.5 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 px-3 :py-3 `}>
      <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-2 border-[#D9C07E] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
        {/* The marquee's loop copy draws the photo as a background instead of
            an <img>, so the page has no alt-less duplicate images. Fixed
            width/height (the largest rendered size) keeps the srcSet to 1x/2x. */}
        {decorative ? (
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: optimizedBackgroundImage(member.photo, 144, 144) }} />
        ) : (
          <Image src={member.photo} alt={member.name} width={144} height={144} className="h-full w-full object-cover" />
        )}
      </div>

      <p className="mt-1 text-[13px] font-medium leading-tight text-[#C9B678] md:text-[15px] lg:text-[17px]">
        {translate(member.role)}
      </p>
      
      {decorative ? (
        <span className={emailPillClass}>{emailContent}</span>
      ) : (
        <a href={`mailto:${member.email}`} className={emailPillClass} title={`Send email to ${member.email}`}>
          {emailContent}
        </a>
      )}
    </article>
  );
}
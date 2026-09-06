"use client"
import { useLanguage } from "@/lib/i18n/language-context";
import { Mail } from "lucide-react";
import Image from "next/image";

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
    photo: "/images/testimonials/reviewer-1.jpeg",
    
    email: "administration@pearlyskyglobalclean.com",
  },
  {
    id: 2,
    name: "Pierre Dubois",
    role: "visionarydesignationsMK",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    photo: "/images/testimonials/reviewer-2.jpeg",
    email: "sales@pearlyskyglobalclean.com",
  },
  {
    id: 3,
    name: "Chloe Smith",
    role: "visionarydesignationsCUS",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
    photo: "/images/testimonials/reviewer-3.webp",
    email: "booking@pearlyskyglobalclean.com",
  },
  {
    id: 4,
    name: "Marc Laurent",
    role: "visionarydesignationsFIN",
    photo: "/images/testimonials/reviewer-1.jpeg",
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
                className="relative flex w-full max-w-8xl flex-col items-center overflow-hidden bg-cover bg-center  py-8 sm:px-6 sm:py-10  lg:py-12"
                style={{ backgroundImage: "url('/images/about/visionary-team-bg.png')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/95 via-[#0B1528]/80 to-transparent pointer-events-none" />
                <h2 className="relative z-10 mb-6 text-center text-xl font-bold tracking-wide text-white sm:mb-9 sm:text-2xl lg:text-3xl">
                  {translate("visionaryTeamTitle")}
                </h2>
        
                <div className="relative z-10 block w-full overflow-hidden sm:hidden">
                  <div className="flex w-max animate-marquee gap-2.5 py-1 hover:[animation-play-state:paused]">
                    {[...teamData, ...teamData].map((member, index) => (
                      <TeamCard key={`${member.id}-${index}`} member={member} />
                    ))}
                  </div>
                </div>
        
                <div className="relative z-10 hidden w-full grid-cols-4 gap-4 sm:grid lg:gap-5">
                  {teamData.map((member) => (
                    <TeamCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
    </div>
    )
}


function TeamCard({ member }: { member: TeamMember }) {

   const { translate } = useLanguage();

  return (
    <article className="group flex rounded-lg min-h-[183px] flex-col items-center border border-[#C9B678]/80 bg-[#0A1530]/90 px-2 py-2.5 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:min-h-[220px] sm:px-3 sm:py-3 lg:min-h-[246px]">
      <div className="relative  h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#D9C07E] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
            />
      </div>

      <h3 className="mt-2 text-[12px] font-bold leading-tight text-white sm:mt-3 md:text-[12px] lg:text-[15px]">
        {member.name}
      </h3>
      <p className="mt-1 text-[9px] font-medium leading-tight text-[#C9B678] md:text-[9px] lg:text-[13px]">
        {translate(member.role)}
      </p>
      {/* <p className="mt-1.5 max-w-[145px] text-[8px] leading-[1.3] text-gray-200 sm:mt-2 md:text-[10px] lg:text-[11px]">
        {member.description}
      </p> */}

      <a
        href={`mailto:${member.email}`}
        className="mt-auto flex max-w-full items-center gap-1 pt-2 text-[10px] leading-tight text-[#fffdf4] underline decoration-[#C9B678]/70 underline-offset-2 transition-colors hover:text-[#C9B678] md:text-[11px] lg:text-[14px]"
        title={`Send email to ${member.email}`}
      >
        <Mail size={10} className="shrink-0 text-[#C9B678] sm:h-3 sm:w-3" />
        <span className="truncate">{member.email}</span>
      </a>
    </article>
  );
}
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
                style={{ backgroundImage: "url('/images/about/visionary-team-bg.png')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1528]/95 via-[#0B1528]/80 to-transparent pointer-events-none" />
                <h2 className="relative z-10 mb-6 text-center text-xl font-bold tracking-wide text-white sm:mb-9 sm:text-2xl lg:text-3xl">
                  {translate("visionaryTeamTitle")}
                </h2>
        
                <div className="relative z-10 block w-full overflow-hidden sm:hidden">
                  <div className="flex w-max md:max-w-4xl lg:max-w-5xl animate-marquee gap-2.5 py-1 motion-reduce:animate-none hover:[animation-play-state:paused]">
                    {[...teamData, ...teamData].map((member, index) => (
                      <TeamCard key={`${member.id}-${index}`} member={member} />
                    ))}
                  </div>
                </div>
        
                <div className="relative z-10 hidden w-full md:max-w-4xl lg:max-w-5xl grid-cols-4 gap-4 sm:grid justify-items-center lg:gap-5">
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
    <article className="group flex min-h-[170px] w-[200px] shrink-0 flex-col items-center rounded-lg border border-[#C9B678]/80 bg-[#0A1530]/90 px-2 py-2.5 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1 px-3 :py-3 ">
      <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full border-2 border-[#D9C07E] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
            />
      </div>

      <p className="mt-1 text-[13px] font-medium leading-tight text-[#C9B678] md:text-[15px] lg:text-[17px]">
        {translate(member.role)}
      </p>
      
      <a
        href={`mailto:${member.email}`}
        className="mt-3 flex min-h-9 max-w-full items-center justify-center gap-1 rounded-full bg-[#fffdf4] px-2.5 py-2 text-[10px] leading-tight text-[#0A1530] transition-colors hover:bg-[#C9B678] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fffdf4] md:text-[11px] lg:text-[14px]"
        title={`Send email to ${member.email}`}
      >
        <Mail size={16} className="shrink-0 text-[#C9B678]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-300 group-hover:max-w-[220px] group-hover:opacity-100 group-focus-within:max-w-[220px] group-focus-within:opacity-100">
          {member.email}
        </span>
      </a>
    </article>
  );
}
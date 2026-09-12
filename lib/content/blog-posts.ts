export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  body: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "importance-of-regular-cleaning",
    title: "The Importance Of Regular Cleaning For A Healthy Home",
    description:
      "Why a consistent cleaning routine does more for your home than just appearances — and how to keep it up without the effort.",
    image: "/images/blog/article-1.jpeg",
    date: "9 December 2025",
    body: [
      "A clean home is more than a nice-to-have — it's a foundation for wellbeing. Dust, allergens, and bacteria build up quickly in high-traffic areas like kitchens, bathrooms, and living rooms, and left unchecked they can affect air quality and everyday comfort.",
      "Regular cleaning breaks that cycle before it starts. Instead of a periodic deep clean fighting against months of buildup, a consistent routine keeps surfaces, floors, and fabrics in a state that's easy to maintain — and far more pleasant to live in day to day.",
      "That's the philosophy behind Pearly Sky's residential cleaning services: eco-luxury care on a schedule that fits your life, using products that are safe for your family and effective against what actually matters.",
    ],
  },
  {
    slug: "top-5-cleaning-tips",
    title: "Top 5 Cleaning Tips For Busy Professionals",
    description:
      "Get expert advice on how to keep your space clean and organized, even on the busiest of days.",
    image: "/images/blog/article-2.jpeg",
    date: "9 December 2025",
    body: [
      "1. Clean in short, focused bursts. Ten minutes tidying a single room beats an occasional multi-hour marathon — it's easier to fit into a packed schedule and prevents mess from accumulating.",
      "2. Tackle high-touch surfaces first. Door handles, countertops, and remote controls collect the most daily grime and deserve priority over less-used areas.",
      "3. Keep a 'reset' basket by the door for items that don't belong in the room they end up in — clear it once a day instead of letting clutter migrate.",
      "4. Let the right products do the work. Multi-surface eco-friendly cleaners cut down on the number of products (and decisions) you need mid-week.",
      "5. Outsource what doesn't need to be yours. A scheduled professional clean — like Pearly Sky's Regular Home Cleaning — frees up the hours that matter more to you.",
    ],
  },
  {
    slug: "eco-friendly-cleaning",
    title: "The Benefits Of Eco-Friendly Cleaning Services",
    description:
      "Learn about the advantages of choosing eco-friendly cleaning services for your home or business.",
    image: "/images/blog/article-3.jpeg",
    date: "9 December 2025",
    body: [
      "Conventional cleaning products often trade effectiveness for harsh chemicals — leaving residues that affect indoor air quality and aren't always safe around children or pets.",
      "Eco-friendly cleaning flips that trade-off. Modern sustainable formulas clean just as thoroughly while being gentler on surfaces, safer for the people and animals who live in the space, and kinder to the environment once they're rinsed away.",
      "It's a standard we hold across every Pearly Sky service — luxury-grade results without the compromise, for homes and offices wherever we serve them.",
    ],
  },
  {
    slug: "choose-right-cleaning-service",
    title: "How To Choose The Right Cleaning Service For Your Needs",
    description:
      "Find out what to look for when selecting a cleaning service that meets your specific requirements.",
    image: "/images/blog/choose-right-cleaning-service.jpg",
    date: "9 December 2025",
    body: [
      "Not every cleaning need is the same — a weekly residential tidy, a post-construction deep clean, and a same-day Airbnb turnaround all call for different expertise, equipment, and turnaround time.",
      "Start by matching the service to the job: look for providers who specialize (not just generalize) in the type of clean you need, and who are transparent about pricing and what's included.",
      "Then look at trust signals — vetted staff, consistent ratings, and clear communication. Pearly Sky's full service catalog is built around exactly this: pick the service that matches your situation, and book it in under a minute.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

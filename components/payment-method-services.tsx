import Image from "next/image";

const paymentMethods = [
  {
    name: "Visa",
    src: "/images/services/paymentmethods/visa.svg",
  },
  {
    name: "Stripe",
    src: "/images/services/paymentmethods/stripe_Logo,_revised_2016.svg",
  },
  {
    name: "Mastercard",
    src: "/images/services/paymentmethods/mastercard-logo.svg",
  },
  {
    name: "American Express",
    src: "/images/services/paymentmethods/amex.svg",
  },
  {
    name: "Apple Pay",
    src: "/images/services/paymentmethods/Apple_Pay_logo.svg",
  },

  {
    name: "Google Pay",
    src: "/images/services/paymentmethods/Google_Pay_Logo.svg"
  },

  {
    name: "Amazon Pay",
    src: "/images/services/paymentmethods/Amazon_Pay_logo.svg",
  },
  {
    name: "Discover",
    src: "/images/services/paymentmethods/discover.svg",
  },
];

export default function PaymentMarquee() {
  // Array duplicated to ensure seamless infinite looping animation
  const duplicatedMethods = [...paymentMethods, ...paymentMethods];

  return (
    <div className="group relative flex w-full overflow-hidden py-4">
      {/* Left Fade Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent md:w-[200px]" />

      {/* Animated Marquee Container */}
      <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused] md:gap-12">
        {duplicatedMethods.map((method, index) => (
          <div
            key={`${method.name}-${index}`}
            className="flex min-w-[80px] flex-col items-center text-center md:min-w-[100px]"
          >
            <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20 md:h-[80px] md:w-[80px]">
              <Image
                src={method.src}
                alt={method.name}
                width={72}
                height={72}
                unoptimized
                className="h-[90%] w-[90%] object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Right Fade Gradient */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent md:w-[200px]" />
    </div>
  );
}
import React from "react";
import Image from "next/image";

interface Review {
  id: number;
  avatar: string;
  name: string;
  rating: number;
  comment: string;
  platformIcon: string;
  timeAgo: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    avatar: "/images/customers/cust1.jpeg",
    name: "Filippa Blylod",
    rating: 5,
    comment:
      "The cleaning was great and the people who worked were so kind and nice. We felt very well taken care of. I recommend!!",
    platformIcon: "data:image/webp;base64,UklGRpgCAABXRUJQVlA4WAoAAAAQAAAAFwAAFwAAQUxQSLAAAAABgFvbtmrlnPv+ByqhAFJtgEFIAzTiodPDb4DsEbmk7hC5u5+7gitoARExAfLfqht5BOabvuImPUmXVRiZlqMe8CyXD/DpcgYBa1cRlU8nmQ6gKt/YBfTId04DGhxub29tbW1t1mLXgITvxM9iV1+7iS2lCA1WYp1AfxAq0BcTA2uIFVNgDYkJwDpERLU0wCWcB7yfLY8M8PWSLjyZ1q0Z4mop36iSrTL0Buw0O/lvAVZQOCDCAQAA8AoAnQEqGAAYAD5RJI9Fo6IhFAQAOAUEtgBOmUJAv853sIgB4gMMB+pv7Ab7BwAHlW/tV8FP7YejWTK/oAfw/+cf8LgL/1VDuDvqa6V3ImwH/Otwpf8EEMfx9OV8raAAAP7ysx+IXbyZzK+/MMrq0CNza6LQZaPp/9Qcns/JDa3HBceZ3lR5f8WvVR0sh/hn/d8M1We92P5hJ1QhUmFebzhnU1CSkTpl5lgL1+haM/YdBgLwtXnQnjKM445egyo+I7QDPI+ioB3QQpQF1f1p53f8QH5djKGfaCf+55BnGE/CV4WXVQ4ukhZP5bfuvjAqIyHhaB+8kXC3qH9/oOOemB/eYWn57Y51wLFxJf/4mOU5e67VauMIb444icurgZhGHkVddO9j1Gun2zahvuP7MxZfTb+zrAyj+jJrGd+4/BkOTrE8jOpfv78x/yV7zJ394rFWXJzMHJAkwTv5J/69P8+A73x6F6pA7ShMcTfnCeUCeS9l5yeeIX0fLxGCZtZ0eLxPwdh62ybJindW/fg6nvlbTh+6Gbt2cdXErUpve8+BHc0vQtA/WgUXUWX7X62OGhyzMbUrHFNxysfV5YFIAAAA",
    timeAgo: "8 months ago",
  },
  {
    id: 2,
    avatar: "/images/customers/cust1.webp",
    name: "Viktoriya Fromm",
    rating: 5,
    comment:
      "I booked a cleaning service in September 2024. Two cleaners did a great job for a 5-hour work. Windows and fridge were also cleaned.",
    platformIcon: "data:image/webp;base64,UklGRuQCAABXRUJQVlA4WAoAAAAQAAAAGAAAGAAAQUxQSK8AAAABgBxJktymZwdfrgkAjSRgGE/JCF6GiPjpWmD6sSc9iIgJwPudpFyNwk+P+fv1HD20RFT2zH9Cc+J6muUWbjWjAwNL/zloQsHA8kDRCB8La9cDADhPqzJ6AWRiyxEAni3sHr1acI6+m3xHc5Ov6G4tHtHIljsB3IZWZfQOAA5r1XJG3AlDRSA0gvYMRYFDh7T2XC1jK3uVDBQX5g+igsIOfrr/Lt/XnYeiUpAUwfsBAFZQOCAOAgAAcA0AnQEqGQAZAD5RII5FI6IhFAVUOAUEtgBOmbRAv8A/ADhAu3OSB769k50ADpquoA9AD9JfSR9hj9n/2j9oegTcnF2iKaA9F7+n8ln0T/x/VA/3PSgexL+oAeViViVARJJoSgKAww7jHiZBx/bAjruPk0AA/ujxKuqNKa1lI70Nhoji2IIIrCTNQpFeHOu3aYyqShOa20/KSpXb6ce1lMudWNiTIt43PyTJJeAtAAfLPCAT/s1VtArmIlxESBClhRfla0lJznvJf3w6DRa5Dc/W923+ll48K9RCP7qKyZviEKofh/5HkZmspUaOOkbY+SRrUE7/NZ5TuA6cmVGD/w90u1r1JSvfxA5X786sruB/Q+Gms+jx/MszfRAX/pAg9Gn1qmh9H9Ni2+2YpEca3+G3ZbWQLto4CCBoVJE+dT0+d4revg/+nNXXwI/w1xUuqO8fmgax2vyETPJfUoNTh51BRUcZIiKIikp1EjiUqnB+v6BH8Xu74LcVDs/Ri93uVNKELALN7KGlnKC+F5LzVcAxOW+ltzQ/XN1P6z43o3+3d0O/Jsw08TbIs+SFBv/3AEm+8ts9kdfpF7xOXrXg4RB58W3QT2NlcV2ew+SYNmsoOfWQXL3UEYqc8fu6FayNzXNbVa87bLu6P+7vp4b4oPH4XavBsQvanYT3cvOf2l7lotdOr5zjf+V29wAAAA==",
    timeAgo: "8 months ago",
  },
  {
    id: 3,
    avatar: "/images/customers/cust1.jpeg",
    name: "Lucas Meyer",
    rating: 5,
    comment:
      "Professional team, punctual service, and spotless results. Highly recommended.",
    platformIcon: "data:image/webp;base64,UklGRpgCAABXRUJQVlA4WAoAAAAQAAAAFwAAFwAAQUxQSLAAAAABgFvbtmrlnPv+ByqhAFJtgEFIAzTiodPDb4DsEbmk7hC5u5+7gitoARExAfLfqht5BOabvuImPUmXVRiZlqMe8CyXD/DpcgYBa1cRlU8nmQ6gKt/YBfTId04DGhxub29tbW1t1mLXgITvxM9iV1+7iS2lCA1WYp1AfxAq0BcTA2uIFVNgDYkJwDpERLU0wCWcB7yfLY8M8PWSLjyZ1q0Z4mop36iSrTL0Buw0O/lvAVZQOCDCAQAA8AoAnQEqGAAYAD5RJI9Fo6IhFAQAOAUEtgBOmUJAv853sIgB4gMMB+pv7Ab7BwAHlW/tV8FP7YejWTK/oAfw/+cf8LgL/1VDuDvqa6V3ImwH/Otwpf8EEMfx9OV8raAAAP7ysx+IXbyZzK+/MMrq0CNza6LQZaPp/9Qcns/JDa3HBceZ3lR5f8WvVR0sh/hn/d8M1We92P5hJ1QhUmFebzhnU1CSkTpl5lgL1+haM/YdBgLwtXnQnjKM445egyo+I7QDPI+ioB3QQpQF1f1p53f8QH5djKGfaCf+55BnGE/CV4WXVQ4ukhZP5bfuvjAqIyHhaB+8kXC3qH9/oOOemB/eYWn57Y51wLFxJf/4mOU5e67VauMIb444icurgZhGHkVddO9j1Gun2zahvuP7MxZfTb+zrAyj+jJrGd+4/BkOTrE8jOpfv78x/yV7zJ394rFWXJzMHJAkwTv5J/69P8+A73x6F6pA7ShMcTfnCeUCeS9l5yeeIX0fLxGCZtZ0eLxPwdh62ybJindW/fg6nvlbTh+6Gbt2cdXErUpve8+BHc0vQtA/WgUXUWX7X62OGhyzMbUrHFNxysfV5YFIAAAA",
    timeAgo: "5 months ago",
  },
  {
    id: 4,
    avatar: "/images/customers/cust1.webp",
    name: "Amelia Roth",
    rating: 5,
    comment:
      "Very friendly staff and reliable service. The house felt fresh and perfectly cleaned.",
    platformIcon: "data:image/webp;base64,UklGRuQCAABXRUJQVlA4WAoAAAAQAAAAGAAAGAAAQUxQSK8AAAABgBxJktymZwdfrgkAjSRgGE/JCF6GiPjpWmD6sSc9iIgJwPudpFyNwk+P+fv1HD20RFT2zH9Cc+J6muUWbjWjAwNL/zloQsHA8kDRCB8La9cDADhPqzJ6AWRiyxEAni3sHr1acI6+m3xHc5Ov6G4tHtHIljsB3IZWZfQOAA5r1XJG3AlDRSA0gvYMRYFDh7T2XC1jK3uVDBQX5g+igsIOfrr/Lt/XnYeiUpAUwfsBAFZQOCAOAgAAcA0AnQEqGQAZAD5RII5FI6IhFAVUOAUEtgBOmbRAv8A/ADhAu3OSB769k50ADpquoA9AD9JfSR9hj9n/2j9oegTcnF2iKaA9F7+n8ln0T/x/VA/3PSgexL+oAeViViVARJJoSgKAww7jHiZBx/bAjruPk0AA/ujxKuqNKa1lI70Nhoji2IIIrCTNQpFeHOu3aYyqShOa20/KSpXb6ce1lMudWNiTIt43PyTJJeAtAAfLPCAT/s1VtArmIlxESBClhRfla0lJznvJf3w6DRa5Dc/W923+ll48K9RCP7qKyZviEKofh/5HkZmspUaOOkbY+SRrUE7/NZ5TuA6cmVGD/w90u1r1JSvfxA5X786sruB/Q+Gms+jx/MszfRAX/pAg9Gn1qmh9H9Ni2+2YpEca3+G3ZbWQLto4CCBoVJE+dT0+d4revg/+nNXXwI/w1xUuqO8fmgax2vyETPJfUoNTh51BRUcZIiKIikp1EjiUqnB+v6BH8Xu74LcVDs/Ri93uVNKELALN7KGlnKC+F5LzVcAxOW+ltzQ/XN1P6z43o3+3d0O/Jsw08TbIs+SFBv/3AEm+8ts9kdfpF7xOXrXg4RB58W3QT2NlcV2ew+SYNmsoOfWQXL3UEYqc8fu6FayNzXNbVa87bLu6P+7vp4b4oPH4XavBsQvanYT3cvOf2l7lotdOr5zjf+V29wAAAA==",
    timeAgo: "3 months ago",
  },
];

export default function ReviewMarquee() {
  // Duplicate array to enable seamless infinite continuous scrolling loop
  const duplicatedReviews = [...reviewsData, ...reviewsData];

  return (
    <div className="w-full bg-[#f6f2e8] py-12 overflow-hidden flex items-center justify-center">
      {/* Marquee Track Container */}
      <div className="w-full overflow-hidden no-scrollbar">
        <div className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused] py-4">
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[340px] sm:w-[380px] bg-white rounded-2xl p-6 border border-[#e6d9b8]/50 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between shrink-0 select-none"
            >
              <div>
                {/* Header: Avatar, Name & Rating */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-[55px] h-[55px] shrink-0 rounded-full overflow-hidden border-2 border-[#e6d9b8]">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-base leading-tight">
                      {review.name}
                    </h4>
                    <div className="text-[#c5a880] text-sm tracking-widest mt-0.5">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                </div>

                {/* Review Text Body */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-normal">
                  {review.comment}
                </p>
              </div>

              {/* Footer: Platform Icon & Time Ago */}
              <div className="flex items-center gap-2 mt-auto">
                <Image
                  src={review.platformIcon}
                  alt="Platform Icon"
                  width={22}
                  height={22}
                  className="w-5 h-5 object-contain"
                />
                <span className="text-gray-400 text-xs font-medium">
                  {review.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
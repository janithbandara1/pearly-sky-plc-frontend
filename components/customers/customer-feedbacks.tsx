"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";


export default function CustomerFeedback() {
  const{translate} = useLanguage();
  return (
    <section className="w-full bg-[#f6f2e8] py-12 px-4 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col items-center">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] text-center mb-8 tracking-tight">
          {translate("CustomerFeedBack")}
        </h2>

        {/* Cards Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Card 1: Valued Customer Reviews */}
          <div className="bg-[#fffdf7] rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              {translate("ValuedCustomerReviews")}
            </h3>

            {/* Platform Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              {/* Facebook */}
              <div className="flex items-center justify-center space-x-2 border border-gray-200 rounded-lg px-4 py-2.5 w-full sm:w-auto min-w-[160px] bg-white">
                <Image
                  src="data:image/webp;base64,UklGRuQCAABXRUJQVlA4WAoAAAAQAAAAGAAAGAAAQUxQSK8AAAABgBxJktymZwdfrgkAjSRgGE/JCF6GiPjpWmD6sSc9iIgJwPudpFyNwk+P+fv1HD20RFT2zH9Cc+J6muUWbjWjAwNL/zloQsHA8kDRCB8La9cDADhPqzJ6AWRiyxEAni3sHr1acI6+m3xHc5Ov6G4tHtHIljsB3IZWZfQOAA5r1XJG3AlDRSA0gvYMRYFDh7T2XC1jK3uVDBQX5g+igsIOfrr/Lt/XnYeiUpAUwfsBAFZQOCAOAgAAcA0AnQEqGQAZAD5RII5FI6IhFAVUOAUEtgBOmbRAv8A/ADhAu3OSB769k50ADpquoA9AD9JfSR9hj9n/2j9oegTcnF2iKaA9F7+n8ln0T/x/VA/3PSgexL+oAeViViVARJJoSgKAww7jHiZBx/bAjruPk0AA/ujxKuqNKa1lI70Nhoji2IIIrCTNQpFeHOu3aYyqShOa20/KSpXb6ce1lMudWNiTIt43PyTJJeAtAAfLPCAT/s1VtArmIlxESBClhRfla0lJznvJf3w6DRa5Dc/W923+ll48K9RCP7qKyZviEKofh/5HkZmspUaOOkbY+SRrUE7/NZ5TuA6cmVGD/w90u1r1JSvfxA5X786sruB/Q+Gms+jx/MszfRAX/pAg9Gn1qmh9H9Ni2+2YpEca3+G3ZbWQLto4CCBoVJE+dT0+d4revg/+nNXXwI/w1xUuqO8fmgax2vyETPJfUoNTh51BRUcZIiKIikp1EjiUqnB+v6BH8Xu74LcVDs/Ri93uVNKELALN7KGlnKC+F5LzVcAxOW+ltzQ/XN1P6z43o3+3d0O/Jsw08TbIs+SFBv/3AEm+8ts9kdfpF7xOXrXg4RB58W3QT2NlcV2ew+SYNmsoOfWQXL3UEYqc8fu6FayNzXNbVa87bLu6P+7vp4b4oPH4XavBsQvanYT3cvOf2l7lotdOr5zjf+V29wAAAA=="
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-gray-800 font-semibold text-sm">
                  0.0 / 5
                </span>
              </div>

              {/* Google */}
              <div className="flex items-center justify-center space-x-2 border border-gray-200 rounded-lg px-4 py-2.5 w-full sm:w-auto min-w-[160px] bg-white">
                <Image
                  src="data:image/webp;base64,UklGRpgCAABXRUJQVlA4WAoAAAAQAAAAFwAAFwAAQUxQSLAAAAABgFvbtmrlnPv+ByqhAFJtgEFIAzTiodPDb4DsEbmk7hC5u5+7gitoARExAfLfqht5BOabvuImPUmXVRiZlqMe8CyXD/DpcgYBa1cRlU8nmQ6gKt/YBfTId04DGhxub29tbW1t1mLXgITvxM9iV1+7iS2lCA1WYp1AfxAq0BcTA2uIFVNgDYkJwDpERLU0wCWcB7yfLY8M8PWSLjyZ1q0Z4mop36iSrTL0Buw0O/lvAVZQOCDCAQAA8AoAnQEqGAAYAD5RJI9Fo6IhFAQAOAUEtgBOmUJAv853sIgB4gMMB+pv7Ab7BwAHlW/tV8FP7YejWTK/oAfw/+cf8LgL/1VDuDvqa6V3ImwH/Otwpf8EEMfx9OV8raAAAP7ysx+IXbyZzK+/MMrq0CNza6LQZaPp/9Qcns/JDa3HBceZ3lR5f8WvVR0sh/hn/d8M1We92P5hJ1QhUmFebzhnU1CSkTpl5lgL1+haM/YdBgLwtXnQnjKM445egyo+I7QDPI+ioB3QQpQF1f1p53f8QH5djKGfaCf+55BnGE/CV4WXVQ4ukhZP5bfuvjAqIyHhaB+8kXC3qH9/oOOemB/eYWn57Y51wLFxJf/4mOU5e67VauMIb444icurgZhGHkVddO9j1Gun2zahvuP7MxZfTb+zrAyj+jJrGd+4/BkOTrE8jOpfv78x/yV7zJ394rFWXJzMHJAkwTv5J/69P8+A73x6F6pA7ShMcTfnCeUCeS9l5yeeIX0fLxGCZtZ0eLxPwdh62ybJindW/fg6nvlbTh+6Gbt2cdXErUpve8+BHc0vQtA/WgUXUWX7X62OGhyzMbUrHFNxysfV5YFIAAAA"
                  alt="Google"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-gray-800 font-semibold text-sm">
                  0.0 / 5
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Customer Review */}
          <div className="bg-[#fffdf7] rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              {translate("CustomerReview")}
            </h3>

            {/* Platform Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              {/* Yelp */}
              <div className="flex items-center justify-center space-x-2 border border-gray-200 rounded-lg px-4 py-2.5 w-full sm:w-auto min-w-[160px] bg-white">
                <Image
                  src="data:image/webp;base64,UklGRuQCAABXRUJQVlA4WAoAAAAQAAAAGAAAGAAAQUxQSK8AAAABgBxJktymZwdfrgkAjSRgGE/JCF6GiPjpWmD6sSc9iIgJwPudpFyNwk+P+fv1HD20RFT2zH9Cc+J6muUWbjWjAwNL/zloQsHA8kDRCB8La9cDADhPqzJ6AWRiyxEAni3sHr1acI6+m3xHc5Ov6G4tHtHIljsB3IZWZfQOAA5r1XJG3AlDRSA0gvYMRYFDh7T2XC1jK3uVDBQX5g+igsIOfrr/Lt/XnYeiUpAUwfsBAFZQOCAOAgAAcA0AnQEqGQAZAD5RII5FI6IhFAVUOAUEtgBOmbRAv8A/ADhAu3OSB769k50ADpquoA9AD9JfSR9hj9n/2j9oegTcnF2iKaA9F7+n8ln0T/x/VA/3PSgexL+oAeViViVARJJoSgKAww7jHiZBx/bAjruPk0AA/ujxKuqNKa1lI70Nhoji2IIIrCTNQpFeHOu3aYyqShOa20/KSpXb6ce1lMudWNiTIt43PyTJJeAtAAfLPCAT/s1VtArmIlxESBClhRfla0lJznvJf3w6DRa5Dc/W923+ll48K9RCP7qKyZviEKofh/5HkZmspUaOOkbY+SRrUE7/NZ5TuA6cmVGD/w90u1r1JSvfxA5X786sruB/Q+Gms+jx/MszfRAX/pAg9Gn1qmh9H9Ni2+2YpEca3+G3ZbWQLto4CCBoVJE+dT0+d4revg/+nNXXwI/w1xUuqO8fmgax2vyETPJfUoNTh51BRUcZIiKIikp1EjiUqnB+v6BH8Xu74LcVDs/Ri93uVNKELALN7KGlnKC+F5LzVcAxOW+ltzQ/XN1P6z43o3+3d0O/Jsw08TbIs+SFBv/3AEm+8ts9kdfpF7xOXrXg4RB58W3QT2NlcV2ew+SYNmsoOfWQXL3UEYqc8fu6FayNzXNbVa87bLu6P+7vp4b4oPH4XavBsQvanYT3cvOf2l7lotdOr5zjf+V29wAAAA=="
                  alt="Yelp"
                  width={36}
                  height={20}
                  className="h-5 w-auto object-contain"
                />
                <span className="text-gray-800 font-semibold text-sm">
                  0.0 / 5
                </span>
              </div>

              {/* Trustpilot */}
              <div className="flex items-center justify-center space-x-2 border border-gray-200 rounded-lg px-4 py-2.5 w-full sm:w-auto min-w-[160px] bg-white">
                <Image
                  src="data:image/webp;base64,UklGRpgCAABXRUJQVlA4WAoAAAAQAAAAFwAAFwAAQUxQSLAAAAABgFvbtmrlnPv+ByqhAFJtgEFIAzTiodPDb4DsEbmk7hC5u5+7gitoARExAfLfqht5BOabvuImPUmXVRiZlqMe8CyXD/DpcgYBa1cRlU8nmQ6gKt/YBfTId04DGhxub29tbW1t1mLXgITvxM9iV1+7iS2lCA1WYp1AfxAq0BcTA2uIFVNgDYkJwDpERLU0wCWcB7yfLY8M8PWSLjyZ1q0Z4mop36iSrTL0Buw0O/lvAVZQOCDCAQAA8AoAnQEqGAAYAD5RJI9Fo6IhFAQAOAUEtgBOmUJAv853sIgB4gMMB+pv7Ab7BwAHlW/tV8FP7YejWTK/oAfw/+cf8LgL/1VDuDvqa6V3ImwH/Otwpf8EEMfx9OV8raAAAP7ysx+IXbyZzK+/MMrq0CNza6LQZaPp/9Qcns/JDa3HBceZ3lR5f8WvVR0sh/hn/d8M1We92P5hJ1QhUmFebzhnU1CSkTpl5lgL1+haM/YdBgLwtXnQnjKM445egyo+I7QDPI+ioB3QQpQF1f1p53f8QH5djKGfaCf+55BnGE/CV4WXVQ4ukhZP5bfuvjAqIyHhaB+8kXC3qH9/oOOemB/eYWn57Y51wLFxJf/4mOU5e67VauMIb444icurgZhGHkVddO9j1Gun2zahvuP7MxZfTb+zrAyj+jJrGd+4/BkOTrE8jOpfv78x/yV7zJ394rFWXJzMHJAkwTv5J/69P8+A73x6F6pA7ShMcTfnCeUCeS9l5yeeIX0fLxGCZtZ0eLxPwdh62ybJindW/fg6nvlbTh+6Gbt2cdXErUpve8+BHc0vQtA/WgUXUWX7X62OGhyzMbUrHFNxysfV5YFIAAAA"
                  alt="Trustpilot"
                  width={80}
                  height={20}
                  className="h-5 w-auto object-contain"
                />
                <span className="text-gray-800 font-semibold text-sm">
                  0.0 / 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function ScheduleServiceButton({isLight}: {isLight?: boolean}){
    const handleScrollToBooking = () => {
    const scheduleSection = document.querySelector('[id^="section-"]');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: "smooth" });
    }
  };
    return(
        <button
              type="button"
              onClick={handleScrollToBooking}
              className={`inline-flex items-center gap-2 px-5 mt-3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                isLight
                  ? "bg-[#C5A059] text-white hover:bg-[#b08e4d] shadow-[0_4px_15px_rgba(197,160,89,0.25)] hover:shadow-[0_6px_20px_rgba(197,160,89,0.35)]"
                  : "bg-gradient-to-r from-[#c9a858] to-[#e4cc8c] text-[#121E2D] hover:brightness-110 shadow-[0_4px_20px_rgba(201,168,88,0.3)] hover:shadow-[0_6px_25px_rgba(201,168,88,0.45)]"
              }`}
            >
              <span>Schedule Service</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
    )
}
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
                  ? "bg-[#002F6D] text-white hover:bg-[#002352] shadow-[0_4px_15px_rgba(0,47,109,0.25)] hover:shadow-[0_6px_20px_rgba(0,47,109,0.35)]"
                  : "bg-gradient-to-r from-[#FFD766] to-[#D8B63F] text-[#111C2E] hover:brightness-110 shadow-[0_4px_20px_rgba(255,215,102,0.3)] hover:shadow-[0_6px_25px_rgba(255,215,102,0.45)]"
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
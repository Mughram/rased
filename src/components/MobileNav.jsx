export default function MobileNav({ items, activeTab, onTabChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 px-3 pb-3 lg:hidden">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="rounded-t-[28px] rounded-b-[20px] border border-white/6 bg-[#262823] px-3 py-2 shadow-[0_-12px_35px_rgba(0,0,0,0.3)] sm:px-6 sm:py-3">
          <ul className="grid grid-cols-4 gap-1.5 sm:gap-3">
            {items.map((item) => {
              const isActive = item.id === activeTab

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl px-1 py-2 transition sm:gap-2 ${
                      isActive
                        ? 'text-white'
                        : 'text-[#7f8079] hover:text-[#d4d5cf]'
                    }`}
                  >
                    <span className="scale-[0.78] sm:scale-100">{item.icon}</span>
                    <span className="text-[11px] font-medium leading-4 sm:text-base">
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

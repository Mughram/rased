export default function MobileNav({ items, activeTab, onTabChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 px-4 pb-4 lg:hidden">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="rounded-t-[30px] rounded-b-[22px] border border-white/6 bg-[#262823] px-4 py-3 shadow-[0_-12px_35px_rgba(0,0,0,0.3)] sm:px-6">
          <ul className="grid grid-cols-4 gap-2 sm:gap-3">
            {items.map((item) => {
              const isActive = item.id === activeTab

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl py-2 transition ${
                      isActive
                        ? 'text-white'
                        : 'text-[#7f8079] hover:text-[#d4d5cf]'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium sm:text-base">
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

import LogoMark from './LogoMark'

export default function Sidebar({ items, activeTab, onTabChange }) {
  return (
    <aside className="hidden lg:flex lg:w-[320px] lg:flex-col">
      <div className="sticky top-8 flex h-[calc(100vh-4rem)] flex-col rounded-[34px] border border-white/8 bg-[#262823] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.22)]">
        <div className="rounded-[28px] border border-white/8 bg-[#2d302a] p-5">
          <LogoMark className="h-20 w-auto" />
          <p className="mt-3 text-sm text-[#9a9c95]">هوية مشروع رصيد</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Rasid</h1>
          <p className="mt-3 text-sm leading-7 text-[#bcbeb7]">
            متابعة الشحنات الحرارية والتنبيهات والمسارات من واجهة واحدة.
          </p>
        </div>

        <nav className="mt-6 flex-1">
          <ul className="space-y-3">
            {items.map((item) => {
              const isActive = item.id === activeTab

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    className={`flex w-full items-center gap-4 rounded-[24px] border px-4 py-4 text-right transition ${
                      isActive
                        ? 'border-[#4c5246] bg-[#31342d] text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)]'
                        : 'border-transparent bg-transparent text-[#8d8f88] hover:border-white/6 hover:bg-[#2d302a] hover:text-[#d4d5cf]'
                    }`}
                  >
                    <span className="rounded-2xl bg-black/10 p-3">{item.icon}</span>
                    <span className="flex-1">
                      <span className="block text-base font-medium">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm text-[#9a9c95]">
                        {item.title}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

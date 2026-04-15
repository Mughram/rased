export default function HeaderBar({ currentItem }) {
  return (
    <header className="rounded-[28px] border border-white/8 bg-[#262823] px-6 py-5 shadow-[0_16px_45px_rgba(0,0,0,0.18)] lg:px-8 lg:py-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm text-[#9a9c95]">{currentItem.label}</p>
          <h1 className="mt-2 text-3xl font-semibold text-white lg:text-4xl">
            {currentItem.title}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:min-w-[320px]">
          <div className="rounded-[22px] bg-[#31342d] px-4 py-3">
            <p className="text-xs text-[#9a9c95]">الحالة</p>
            <p className="mt-2 text-base font-medium text-white">متصل</p>
          </div>
          <div className="rounded-[22px] bg-[#31342d] px-4 py-3">
            <p className="text-xs text-[#9a9c95]">المتابعة</p>
            <p className="mt-2 text-base font-medium text-white">مباشرة</p>
          </div>
        </div>
      </div>
    </header>
  )
}

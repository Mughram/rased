import LogoMark from './LogoMark'

export default function HeaderBar({ currentItem }) {
  return (
    <header className="rounded-[24px] border border-white/8 bg-[#262823] px-4 py-4 shadow-[0_16px_45px_rgba(0,0,0,0.18)] sm:rounded-[28px] sm:px-6 sm:py-5 lg:px-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-right">
            <p className="text-sm font-bold tracking-[0.14em] text-[#d7dbd3]">راصد</p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              {currentItem.label}
            </h1>
            <p className="mt-2 text-sm leading-7 text-[#9fa49b]">
              {currentItem.description}
            </p>
          </div>

          <div className="self-end rounded-[22px] border border-white/8 bg-[#30332d] px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.16)] sm:self-auto">
            <LogoMark className="h-14 w-auto sm:h-[4.5rem]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:min-w-[360px]">
          <div className="rounded-[20px] border border-white/8 bg-[#31342d] px-4 py-3 text-right">
            <p className="text-xs text-[#9a9c95]">الحالة</p>
            <p className="mt-2 text-base font-medium text-white">متصل</p>
          </div>
          <div className="rounded-[20px] border border-white/8 bg-[#31342d] px-4 py-3 text-right">
            <p className="text-xs text-[#9a9c95]">التحديث</p>
            <p className="mt-2 text-base font-medium text-white">مباشر</p>
          </div>
        </div>
      </div>
    </header>
  )
}

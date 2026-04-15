import { shipmentCards, shipmentFilters } from '../../data/appData'

export default function ShipmentsView() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex h-14 w-full items-center gap-3 rounded-[22px] border border-white/10 bg-[#f4f4f1] px-5 text-[#272822] shadow-[0_12px_30px_rgba(0,0,0,0.16)] lg:max-w-[520px]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.25 4.25" />
          </svg>
          <input
            type="search"
            placeholder="البحث عن رقم الشحنة"
            className="w-full border-0 bg-transparent text-right text-lg text-[#272822] outline-none placeholder:text-[#7a7b75]"
          />
        </label>

        <div className="flex flex-wrap gap-3">
          {shipmentFilters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`min-w-[132px] rounded-[18px] px-5 py-3 text-base font-semibold transition ${
                index === 0
                  ? 'bg-[#7e9691] text-white shadow-[0_10px_20px_rgba(0,0,0,0.16)]'
                  : 'bg-[#62726e] text-[#edf1ef] hover:bg-[#70827d]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-white">قائمة الشحنات</h2>
        <p className="text-sm text-[#a8aaa2]">آخر تحديث مباشر للحالة الحرارية</p>
      </div>

      <div className="space-y-5">
        {shipmentCards.map((shipment) => (
          <article
            key={shipment.id}
            className={`rounded-[30px] border p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:p-7 ${
              shipment.tone === 'danger'
                ? 'border-[#8f7d79] bg-[#5a5e57]'
                : shipment.tone === 'warning'
                  ? 'border-[#7f8173] bg-[#4b4f49]'
                  : 'border-[#5f766d] bg-[#44524d]'
            }`}
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p
                      className={`text-3xl font-semibold ${
                        shipment.tone === 'safe'
                          ? 'text-[#d5ffe8]'
                          : shipment.tone === 'warning'
                            ? 'text-[#ffe0a3]'
                            : 'text-[#ffb0aa]'
                      }`}
                    >
                      {shipment.risk}
                      <span className="mr-2 text-lg">
                        {shipment.tone === 'safe' ? '✓' : '⚠'}
                      </span>
                    </p>
                    <p className="mt-2 text-lg text-[#ddd8d0]">{shipment.timeLeft}</p>
                  </div>
                  <div
                    className={`w-fit rounded-[14px] px-4 py-3 text-2xl font-bold ${
                      shipment.tone === 'danger'
                        ? 'bg-[#8d6763] text-[#ff9c95]'
                        : shipment.tone === 'warning'
                          ? 'bg-[#746b58] text-[#ffe0a3]'
                          : 'bg-[#55776b] text-[#d8fff0]'
                    }`}
                  >
                    {shipment.tag}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-base text-[#d7d9d2]">درجة الحرارة</p>
                    <p className="mt-2 text-4xl font-semibold text-white">
                      {shipment.temperature}
                    </p>
                  </div>
                  <div>
                    <p className="text-base text-[#d7d9d2]">المسار</p>
                    <p className="mt-2 text-4xl font-semibold text-white">
                      {shipment.route}
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-[18px] border px-5 py-4 text-xl ${
                    shipment.tone === 'safe'
                      ? 'border-[#6b9483] bg-[#3c5e55] text-[#d8fff0]'
                      : shipment.tone === 'warning'
                        ? 'border-[#8f7b52] bg-[#645437] text-[#ffe0a3]'
                        : 'border-[#935750] bg-[#70423d] text-[#ffb1a9]'
                  }`}
                >
                  {shipment.warning}
                </div>
              </div>

              <div className="flex w-full max-w-[360px] flex-col justify-between gap-5 self-stretch rounded-[24px] bg-[#3f433d] p-5">
                <div>
                  <p className="text-4xl font-bold text-white">شحنة #{shipment.id}</p>
                  <p className="mt-3 text-base text-[#bfc1bb]">{shipment.status}</p>
                  <p className="mt-5 text-2xl font-semibold text-white">
                    {shipment.market}
                  </p>
                  <p className="mt-2 text-lg text-[#c9cbc4]">{shipment.quantity}</p>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {shipment.driver}
                    </p>
                    <p className="mt-1 text-xs text-[#b5b7b0]">سائق الشحنة</p>
                  </div>
                  <div className="h-16 w-16 overflow-hidden rounded-[18px] bg-[#22241f]">
                    <img
                      src={shipment.avatar}
                      alt={shipment.driver}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

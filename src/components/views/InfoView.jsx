const activeShipments = [
  {
    id: 212,
    title: 'منتجات بحرية طازجة',
    temperature: '19.7°C',
    status: 'طريق الملك عبدالله',
    accent: 'danger',
    eta: null,
  },
  {
    id: 212,
    title: 'منتجات بحرية طازجة',
    temperature: '4.2°C',
    status: 'طريق الملك فهد، جازان',
    accent: 'safe',
    eta: '09:15 مساء',
  },
]

const riskCards = [
  {
    id: 389,
    title: 'تأخير متوقع بنسبة 55% عند نقطة التفريغ',
    description:
      'تشير البيانات التاريخية إلى ازدحام المتغيرات قبل الوصول على بوابة المدينة.',
  },
  {
    id: 721,
    title: 'احتمالية تلف بنسبة 85% خلال ساعتين',
    description:
      'تم اكتشاف انخفاض في درجة الحرارة في وحدة التبريد رقم 07 بالمسار المتوقع باتجاه المستودع.',
  },
]

export default function InfoView() {
  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-white/8 bg-[#5a5f54] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-6">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          نظرة عامة عن الشحنات
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[20px] bg-[#86847f] p-5 shadow-[inset_4px_0_0_#ff4d4d]">
            <p className="text-5xl font-bold text-[#ff4d4d]">7%</p>
            <p className="mt-4 text-2xl text-white">خطر</p>
          </div>
          <div className="rounded-[20px] bg-[#86847f] p-5 shadow-[inset_4px_0_0_#ffc857]">
            <p className="text-5xl font-bold text-[#ffc857]">18%</p>
            <p className="mt-4 text-2xl text-white">تحذير</p>
          </div>
          <div className="rounded-[20px] bg-[#86847f] p-5 shadow-[inset_4px_0_0_#65e28b]">
            <p className="text-5xl font-bold text-[#65e28b]">75%</p>
            <p className="mt-4 text-2xl text-white">آمنة</p>
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#43463f]">
          <div className="flex h-full">
            <div className="h-full w-[7%] bg-[#ff4d4d]" />
            <div className="h-full w-[18%] bg-[#ffc857]" />
            <div className="h-full w-[75%] bg-[#65e28b]" />
          </div>
        </div>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-end">
          <h3 className="text-3xl font-bold text-white">الشحنات النشطة</h3>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {activeShipments.map((shipment, index) => (
            <article
              key={`${shipment.id}-${index}`}
              className="rounded-[24px] border border-white/8 bg-[#5a5f54] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-right">
                  <p className="text-sm text-[#d1d2cc]">شحنة#{shipment.id}</p>
                  <h4 className="mt-2 text-2xl font-semibold text-white">
                    {shipment.title}
                  </h4>
                </div>
                <div className="rounded-xl bg-[#6a7064] p-3 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M2.75 6.75h10.5v9.5H2.75z" />
                    <path d="M13.25 9.25h3.53l2.47 2.75v4.25h-6" />
                    <path d="M16.5 9.25v2.75h2.98" />
                    <circle cx="7" cy="18.25" r="1.75" />
                    <circle cx="17.5" cy="18.25" r="1.75" />
                  </svg>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-base text-[#d8d9d3]">الحرارة الحالية</p>
                  <p className="mt-2 text-4xl font-bold text-white">
                    {shipment.temperature}
                  </p>
                </div>
                <div>
                  <p className="text-base text-[#d8d9d3]">الوصول المتوقع</p>
                  <p className="mt-2 text-4xl font-bold text-white">
                    {shipment.eta ?? '--:--'}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="h-2 rounded-full bg-[#2d2f2b]">
                  <div
                    className={`h-full rounded-full ${
                      shipment.accent === 'danger'
                        ? 'w-[78%] bg-[#ff4d4d]'
                        : 'w-[82%] bg-[#65e28b]'
                    }`}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-4">
                <p className="text-sm text-[#d1d2cc]">{shipment.status}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-end">
          <h3 className="text-3xl font-bold text-white">المخاطر المتوقعة</h3>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {riskCards.map((risk) => (
            <article
              key={risk.id}
              className="rounded-[24px] border border-white/8 bg-[#5a5f54] p-5 shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-right">
                  <p className="text-sm text-[#d1d2cc]">شحنة#{risk.id}</p>
                  <h4 className="mt-2 text-xl font-semibold leading-8 text-white">
                    {risk.title}
                  </h4>
                </div>
                <div className="rounded-xl bg-[#6a7064] p-3 text-[#ffb5b0]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M12 4.5 20 19H4l8-14.5Z" />
                    <path d="M12 9.5v4.5" />
                    <circle cx="12" cy="16.8" r=".8" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </div>

              <p className="mt-5 text-lg leading-8 text-[#e0e1dc]">
                {risk.description}
              </p>

              <div className="mt-6 flex items-center justify-start gap-3">
                <button
                  type="button"
                  className="rounded-[12px] bg-[#86a19b] px-5 py-2 text-sm font-semibold text-white"
                >
                  تعديل المسار
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

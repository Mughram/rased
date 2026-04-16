import { useEffect, useMemo, useState } from 'react'
import { coldChainCategories, shipmentCards, shipmentFilters } from '../../data/appData'

const filterToneMap = {
  'عرض الكل': null,
  الخطرة: 'danger',
  'تحت المراقبة': 'warning',
  الآمنة: 'safe',
}

const monitoringPresets = {
  342: {
    productType: 'أسماك طازجة',
    grossWeight: '600 كجم',
    pricePerKg: '55 ريال/كجم',
    handlingWindow: '5:30 ص - خلال 5 ساعات',
    warmestPoint: '7.2°C',
    coldestPoint: '3.7°C',
    storageBands: ['0° - 2°', '0° - 5°', '0° - 8°'],
    shelfLife: [
      { label: 'سمك مثلج', value: '19 ساعة', note: 'عند 0° - 8°', tone: 'amber' },
      { label: 'روبيان مبرد', value: '48 ساعة', note: 'عند -18°', tone: 'green' },
      { label: 'سمك فيليه', value: '32 ساعة', note: 'عند 0° - 4°', tone: 'teal' },
    ],
  },
  267: {
    productType: 'أدوية حيوية',
    grossWeight: '420 كجم',
    pricePerKg: '180 ريال/كجم',
    handlingWindow: '8:15 ص - خلال 3 ساعات',
    warmestPoint: '6.1°C',
    coldestPoint: '3.9°C',
    storageBands: ['2° - 4°', '2° - 6°', '2° - 8°'],
    shelfLife: [
      { label: 'دواء مبرد', value: '26 ساعة', note: 'عند 2° - 8°', tone: 'amber' },
      { label: 'أمبولات حساسة', value: '18 ساعة', note: 'عند 2° - 5°', tone: 'teal' },
      { label: 'عينات تحليل', value: '12 ساعة', note: 'عند 3° - 6°', tone: 'green' },
    ],
  },
  511: {
    productType: 'لقاحات موسمية',
    grossWeight: '300 كجم',
    pricePerKg: '210 ريال/كجم',
    handlingWindow: '7:00 ص - خلال ساعتين',
    warmestPoint: '4.0°C',
    coldestPoint: '2.6°C',
    storageBands: ['2° - 4°', '2° - 6°', '2° - 8°'],
    shelfLife: [
      { label: 'لقاح مبرد', value: '16 ساعة', note: 'عند 2° - 8°', tone: 'green' },
      { label: 'عبوات معززة', value: '22 ساعة', note: 'عند 2° - 5°', tone: 'teal' },
      { label: 'مواد داعمة', value: '14 ساعة', note: 'عند 3° - 6°', tone: 'amber' },
    ],
  },
  618: {
    productType: 'لحوم مبردة',
    grossWeight: '780 كجم',
    pricePerKg: '42 ريال/كجم',
    handlingWindow: '6:40 ص - خلال 4 ساعات',
    warmestPoint: '3.2°C',
    coldestPoint: '0.8°C',
    storageBands: ['-1° - 1°', '-1° - 3°', '0° - 4°'],
    shelfLife: [
      { label: 'لحم طازج', value: '22 ساعة', note: 'عند -1° - 3°', tone: 'amber' },
      { label: 'لحم مفرغ', value: '40 ساعة', note: 'عند -2° - 1°', tone: 'green' },
      { label: 'لحم معالج', value: '28 ساعة', note: 'عند 0° - 4°', tone: 'teal' },
    ],
  },
  724: {
    productType: 'ألبان طازجة',
    grossWeight: '510 كجم',
    pricePerKg: '28 ريال/كجم',
    handlingWindow: '9:10 ص - خلال 6 ساعات',
    warmestPoint: '2.8°C',
    coldestPoint: '1.7°C',
    storageBands: ['1° - 2°', '1° - 4°', '2° - 5°'],
    shelfLife: [
      { label: 'حليب مبرد', value: '30 ساعة', note: 'عند 1° - 4°', tone: 'green' },
      { label: 'أجبان طازجة', value: '52 ساعة', note: 'عند 2° - 5°', tone: 'teal' },
      { label: 'قشطة مبردة', value: '18 ساعة', note: 'عند 1° - 3°', tone: 'amber' },
    ],
  },
  805: {
    productType: 'زهور مبردة',
    grossWeight: '210 كجم',
    pricePerKg: '36 ريال/كجم',
    handlingWindow: '4:20 فجرًا - خلال 8 ساعات',
    warmestPoint: '7.0°C',
    coldestPoint: '5.6°C',
    storageBands: ['4° - 6°', '5° - 7°', '5° - 8°'],
    shelfLife: [
      { label: 'ورد مقطوف', value: '20 ساعة', note: 'عند 5° - 8°', tone: 'amber' },
      { label: 'زهور مبردة', value: '34 ساعة', note: 'عند 4° - 6°', tone: 'green' },
      { label: 'تنسيقات جاهزة', value: '16 ساعة', note: 'عند 5° - 7°', tone: 'teal' },
    ],
  },
}

const shelfLifeToneMap = {
  amber: 'text-[#ffb24d]',
  green: 'text-[#39ff6b]',
  teal: 'text-[#74f0db]',
}

export default function ShipmentsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('عرض الكل')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedShipmentId, setSelectedShipmentId] = useState(shipmentCards[0]?.id ?? null)

  const visibleShipments = useMemo(() => {
    return shipmentCards.filter((shipment) => {
      const matchesTone =
        !filterToneMap[activeFilter] || shipment.tone === filterToneMap[activeFilter]
      const matchesCategory =
        activeCategory === 'all' || shipment.category === activeCategory
      const query = searchTerm.trim()
      const matchesSearch =
        !query ||
        shipment.product.includes(query) ||
        shipment.categoryLabel.includes(query) ||
        shipment.route.includes(query) ||
        shipment.driver.includes(query) ||
        String(shipment.id).includes(query)

      return matchesTone && matchesCategory && matchesSearch
    })
  }, [activeCategory, activeFilter, searchTerm])

  useEffect(() => {
    if (!visibleShipments.length) {
      setSelectedShipmentId(null)
      return
    }

    const hasSelectedShipment = visibleShipments.some(
      (shipment) => shipment.id === selectedShipmentId,
    )

    if (!hasSelectedShipment) {
      setSelectedShipmentId(visibleShipments[0].id)
    }
  }, [selectedShipmentId, visibleShipments])

  const selectedShipment =
    visibleShipments.find((shipment) => shipment.id === selectedShipmentId) ??
    visibleShipments[0] ??
    null

  const monitoringDetails = selectedShipment
    ? monitoringPresets[selectedShipment.id] ?? monitoringPresets[342]
    : null

  return (
    <section className="space-y-6 lg:space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <label className="flex h-14 w-full items-center gap-3 rounded-[22px] border border-white/10 bg-[#f4f4f1] px-4 text-[#272822] shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:px-5 xl:max-w-[520px]">
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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="ابحث برقم الشحنة أو النوع أو المسار"
              className="w-full border-0 bg-transparent text-right text-base text-[#272822] outline-none placeholder:text-[#7a7b75] sm:text-lg"
            />
          </label>

          <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
            {shipmentFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`min-w-[112px] rounded-[18px] px-4 py-3 text-sm font-semibold transition sm:min-w-[132px] sm:text-base ${
                  activeFilter === filter
                    ? 'bg-[#7e9691] text-white shadow-[0_10px_20px_rgba(0,0,0,0.16)]'
                    : 'bg-[#62726e] text-[#edf1ef] hover:bg-[#70827d]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
          {coldChainCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                activeCategory === category.id
                  ? 'border-[#91b0aa] bg-[#8ca7a2] text-white'
                  : 'border-white/8 bg-[#34372f] text-[#d6d8d1] hover:border-white/18 hover:bg-[#3c4037]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-[28px] border border-white/8 bg-[#252823] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="order-2 text-right sm:order-1">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">قائمة الشحنات</h2>
          <p className="mt-2 text-sm leading-7 text-[#a8aaa2]">
            نتائج مباشرة حسب النوع والخطورة ودرجة الحرارة والمسار.
          </p>
        </div>
        <p className="order-1 self-end rounded-full bg-[#31342d] px-4 py-2 text-sm text-[#d9ddd6] sm:order-2 sm:self-auto">
          {visibleShipments.length} شحنة
        </p>
      </div>

      {selectedShipment && monitoringDetails ? (
        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#4b4d49_0%,#40423f_100%)] p-4 shadow-[0_20px_45px_rgba(0,0,0,0.22)] sm:p-5 lg:p-6">
          <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-right">
              <p className="text-sm text-[#c8cbc4]">الشحنة المحددة الآن</p>
              <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {selectedShipment.product}
              </h3>
              <p className="mt-2 text-sm text-[#d7dad3]">
                شحنة #{selectedShipment.id} • {selectedShipment.route}
              </p>
            </div>

            <button
              type="button"
              className="rounded-[18px] bg-[#8ca7a2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9ab4af] sm:text-base"
            >
              تأكيد بدء المراقبة
            </button>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-white/12 bg-[#6a6c69]/55 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm.75 15.5h-1.5v-6h1.5Zm0-8h-1.5V8h1.5Z" />
                    </svg>
                  </span>
                  <h4 className="text-xl font-bold text-white sm:text-2xl">معلومات الشحنة</h4>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoField label="نوع المنتج" value={monitoringDetails.productType} />
                  <InfoField label="الوزن (كيلو)" value={monitoringDetails.grossWeight} />
                  <InfoField label="سعر الكيلو (ريال)" value={monitoringDetails.pricePerKg} />
                  <InfoField label="وقت التجهيز" value={monitoringDetails.handlingWindow} />
                </div>
              </div>

              <div className="rounded-[24px] border border-white/12 bg-[#666964]/55 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M15 14.5a4.5 4.5 0 1 1-6 0V5a3 3 0 1 1 6 0Zm-2-9.5a1 1 0 1 0-2 0v10.4l-.29.3a2.5 2.5 0 1 0 3.58 0l-.29-.3Z" />
                    </svg>
                  </span>
                  <h4 className="text-xl font-bold text-white sm:text-2xl">درجة حرارة التخزين</h4>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <TemperatureField
                    label="أعلى القياس المسموح"
                    value={monitoringDetails.warmestPoint}
                  />
                  <TemperatureField
                    label="القراءة الحالية"
                    value={monitoringDetails.coldestPoint}
                  />
                </div>

                <div className="mt-4 text-right">
                  <p className="text-sm text-[#d2d4ce]">نطاق درجة الحرارة المستهدف</p>
                  <div className="mt-3 flex flex-wrap justify-end gap-2">
                    {monitoringDetails.storageBands.map((band) => (
                      <span
                        key={band}
                        className="rounded-xl bg-[#3b9b95] px-4 py-2 text-sm font-semibold text-white"
                      >
                        {band}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/12 bg-[#5a5d58]/50 p-4 sm:p-5">
              <h4 className="text-right text-xl font-bold text-white sm:text-2xl">
                العمر التخزيني المتوقع
              </h4>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                {monitoringDetails.shelfLife.map((entry) => (
                  <article
                    key={entry.label}
                    className="rounded-[22px] border border-[#a9aba7]/45 bg-[#6d706c]/35 p-4 text-right shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                  >
                    <p className="text-xl font-semibold text-[#1f201d]">{entry.label}</p>
                    <p
                      className={`mt-5 text-3xl font-black sm:text-[2.1rem] ${shelfLifeToneMap[entry.tone]}`}
                    >
                      {entry.value}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[#2e2f2b]">{entry.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <div className="space-y-4 sm:space-y-5">
        {visibleShipments.map((shipment) => {
          const isSelected = shipment.id === selectedShipmentId

          return (
            <article
              key={shipment.id}
              className={`rounded-[28px] border p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition sm:p-5 lg:p-7 ${
                shipment.tone === 'danger'
                  ? 'border-[#8f7d79] bg-[#5a5e57]'
                  : shipment.tone === 'warning'
                    ? 'border-[#7f8173] bg-[#4b4f49]'
                    : 'border-[#5f766d] bg-[#44524d]'
              } ${isSelected ? 'ring-2 ring-[#cad9d5]/65' : ''}`}
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedShipmentId(shipment.id)}
                  className="self-end rounded-[16px] bg-black/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/25 sm:self-auto"
                >
                  {isSelected ? 'قيد العرض' : 'عرض التفاصيل'}
                </button>

                <div className="text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-full bg-black/15 px-3 py-1 text-xs font-semibold text-white">
                      {shipment.categoryLabel}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        shipment.tone === 'danger'
                          ? 'bg-[#8d6763] text-[#ffb8b0]'
                          : shipment.tone === 'warning'
                            ? 'bg-[#746b58] text-[#ffe0a3]'
                            : 'bg-[#55776b] text-[#d8fff0]'
                      }`}
                    >
                      {shipment.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                    {shipment.product}
                  </p>
                  <p
                    className={`mt-2 text-base sm:text-lg ${
                      shipment.tone === 'safe'
                        ? 'text-[#d5ffe8]'
                        : shipment.tone === 'warning'
                          ? 'text-[#ffe0a3]'
                          : 'text-[#ffb0aa]'
                    }`}
                  >
                    {shipment.risk}
                  </p>
                  <p className="mt-2 text-sm text-[#ddd8d0] sm:text-lg">{shipment.timeLeft}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricBlock
                      label="درجة الحرارة"
                      value={shipment.temperature}
                      detail={`المدى المطلوب: ${shipment.targetTemperature}`}
                    />
                    <MetricBlock label="المسار" value={shipment.route} />
                    <MetricBlock label="الوجهة" value={shipment.market} />
                    <MetricBlock label="الوصول المتوقع" value={shipment.eta} />
                  </div>

                  <div
                    className={`rounded-[18px] border px-4 py-4 text-base leading-7 sm:px-5 sm:text-lg sm:leading-8 ${
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

                <div className="w-full rounded-[24px] bg-[#3f433d] p-4 sm:p-5 xl:max-w-[360px]">
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white sm:text-4xl">شحنة #{shipment.id}</p>
                    <p className="mt-3 text-sm text-[#bfc1bb] sm:text-base">{shipment.status}</p>
                    <div className="mt-5 grid gap-4 grid-cols-2">
                      <CompactMetric label="الكمية" value={shipment.quantity} />
                      <CompactMetric label="المركبة" value={shipment.vehicle} />
                      <CompactMetric label="الرطوبة" value={shipment.humidity} />
                      <CompactMetric label="الموقع الحالي" value={shipment.zone} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white sm:text-base">
                        {shipment.driver}
                      </p>
                      <p className="mt-1 text-xs text-[#b5b7b0]">سائق الشحنة</p>
                    </div>
                    <div className="h-14 w-14 overflow-hidden rounded-[18px] bg-[#22241f] sm:h-16 sm:w-16">
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
          )
        })}

        {visibleShipments.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-white/12 bg-[#2d302a] p-8 text-center text-[#cfd2cb]">
            لا توجد نتائج مطابقة للفلاتر الحالية.
          </div>
        ) : null}
      </div>
    </section>
  )
}

function InfoField({ label, value }) {
  return (
    <div className="rounded-[18px] bg-white/92 px-4 py-3 text-right text-[#4b4b48] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
      <p className="text-sm font-semibold text-[#74756f]">{label}</p>
      <p className="mt-2 text-lg font-bold text-[#555650]">{value}</p>
    </div>
  )
}

function TemperatureField({ label, value }) {
  return (
    <div className="rounded-[18px] bg-[#4a4d49] px-4 py-3 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <p className="text-xs text-[#d3d6d0]">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
  )
}

function MetricBlock({ label, value, detail }) {
  return (
    <div className="rounded-[20px] bg-black/10 p-4 text-right">
      <p className="text-sm text-[#d7d9d2] sm:text-base">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">{value}</p>
      {detail ? <p className="mt-2 text-sm text-[#cfd2cb]">{detail}</p> : null}
    </div>
  )
}

function CompactMetric({ label, value }) {
  return (
    <div>
      <p className="text-sm text-[#b5b7b0]">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white sm:text-base">{value}</p>
    </div>
  )
}

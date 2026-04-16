import { useEffect, useMemo, useState } from 'react'
import heroTruck from '../../assets/hero.png'
import { mapShipments } from '../../data/appData'

function interpolatePosition(points, progress) {
  const safeProgress = Math.min(Math.max(progress, 0), 1)
  const scaled = safeProgress * (points.length - 1)
  const index = Math.floor(scaled)
  const nextIndex = Math.min(index + 1, points.length - 1)
  const point = points[index]
  const nextPoint = points[nextIndex]
  const localProgress = scaled - index

  return {
    left: point.left + (nextPoint.left - point.left) * localProgress,
    top: point.top + (nextPoint.top - point.top) * localProgress,
  }
}

export default function MapMenuView() {
  const [isTracking, setIsTracking] = useState(true)
  const [selectedShipmentId, setSelectedShipmentId] = useState(mapShipments[0].id)
  const [progressMap, setProgressMap] = useState(() =>
    Object.fromEntries(
      mapShipments.map((shipment) => [shipment.id, shipment.progressStart]),
    ),
  )

  useEffect(() => {
    if (!isTracking) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setProgressMap((current) =>
        Object.fromEntries(
          mapShipments.map((shipment) => {
            const next = (current[shipment.id] ?? shipment.progressStart) + shipment.stepSize
            return [shipment.id, next >= 1 ? shipment.progressStart : next]
          }),
        ),
      )
    }, 1400)

    return () => window.clearInterval(intervalId)
  }, [isTracking])

  const selectedShipment =
    mapShipments.find((shipment) => shipment.id === selectedShipmentId) ?? mapShipments[0]
  const progress = progressMap[selectedShipment.id] ?? selectedShipment.progressStart
  const vehiclePosition = interpolatePosition(selectedShipment.points, progress)

  const derivedStats = useMemo(() => {
    const completedStops = selectedShipment.points.filter(
      (point) => progress >= point.progress,
    ).length
    const distanceLeft = Math.max(8, Math.round((1 - progress) * 260))
    const etaMinutes = Math.max(6, Math.round((1 - progress) * 110))

    return { completedStops, distanceLeft, etaMinutes }
  }, [progress, selectedShipment.points])

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/8 bg-[#22241f] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
      <div className="border-b border-white/8 bg-[#2a2d27] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="text-right">
            <p className="text-sm text-[#a5a9a1]">الخريطة الحية</p>
            <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              تتبع تفاعلي للشحنات المبردة
            </h2>
            <p className="mt-2 text-sm leading-7 text-[#c8cbc4]">
              اختر أي شحنة لعرض مسارها ونقاط توقفها والتنبيه المرتبط بها بشكل مباشر.
            </p>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="flex w-max gap-3">
              {mapShipments.map((shipment) => (
                <button
                  key={shipment.id}
                  type="button"
                  onClick={() => setSelectedShipmentId(shipment.id)}
                  className={`min-w-[144px] rounded-[18px] border px-4 py-3 text-right transition ${
                    selectedShipmentId === shipment.id
                      ? 'border-[#8ca7a2] bg-[#8ca7a2] text-white shadow-[0_10px_24px_rgba(34,46,43,0.2)]'
                      : 'border-white/8 bg-[#34372f] text-[#d4d8d1] hover:border-white/18 hover:bg-[#3c4037]'
                  }`}
                >
                  <p className="text-xs opacity-80">#{shipment.id}</p>
                  <p className="mt-1 text-sm font-semibold">{shipment.categoryLabel}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[280px] overflow-hidden bg-[#4a5568] sm:h-[360px] lg:h-[440px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(43,220,255,0.12),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(43,220,255,0.1),transparent_20%),linear-gradient(180deg,#465062_0%,#394452_100%)]" />
        <div className="absolute -left-8 top-0 h-[360px] w-[5px] rotate-[14deg] rounded-full bg-[#24b6c7]/55 shadow-[0_0_25px_rgba(36,182,199,0.32)] sm:h-[440px]" />
        <div className="absolute left-[24%] top-[-3%] h-[380px] w-[5px] rotate-[-18deg] rounded-full bg-[#24b6c7]/45 shadow-[0_0_25px_rgba(36,182,199,0.26)] sm:h-[500px]" />
        <div className="absolute right-[8%] top-[-10%] hidden h-[430px] w-[4px] rotate-[24deg] rounded-full bg-[#24b6c7]/25 sm:block" />

        <div className="absolute left-[6%] top-[18%] h-16 w-24 rounded-[20px] bg-[#313947]/70 sm:h-24 sm:w-32 sm:rounded-[24px]" />
        <div className="absolute left-[42%] top-[8%] h-14 w-20 rounded-[18px] bg-[#2f3744]/65 sm:h-20 sm:w-28 sm:rounded-[20px]" />
        <div className="absolute right-[10%] top-[20%] h-20 w-24 rounded-[24px] bg-[#303949]/60 sm:h-28 sm:w-36 sm:rounded-[28px]" />
        <div className="absolute left-[16%] top-[44%] hidden h-20 w-24 rounded-[22px] bg-[#303847]/65 sm:block" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={selectedShipment.tone === 'danger' ? '#ff8d83' : '#7fe3b4'}
            strokeDasharray="1.6 1.6"
            strokeLinecap="round"
            strokeWidth="0.7"
            points={selectedShipment.points.map((point) => `${point.left},${point.top}`).join(' ')}
          />
        </svg>

        {selectedShipment.points.map((point) => (
          <button
            key={point.label}
            type="button"
            className="absolute -translate-x-1/2 -translate-y-1/2 text-right"
            style={{ left: `${point.left}%`, top: `${point.top}%` }}
          >
            <div
              className={`h-3.5 w-3.5 rounded-full border-2 sm:h-4 sm:w-4 ${
                progress >= point.progress
                  ? 'border-[#78f0b2] bg-[#78f0b2]/70'
                  : 'border-white/60 bg-white/10'
              }`}
            />
            <p className="mt-2 hidden whitespace-nowrap rounded-md bg-black/35 px-2 py-1 text-xs text-white/90 sm:block">
              {point.label}
            </p>
          </button>
        ))}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
          style={{ left: `${vehiclePosition.left}%`, top: `${vehiclePosition.top}%` }}
        >
          <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24b6c7]/20 blur-xl sm:h-16 sm:w-16" />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black/85 shadow-[0_12px_24px_rgba(0,0,0,0.35)] sm:h-14 sm:w-14">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white sm:h-8 sm:w-8"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.5 14.2V10c0-.97.78-1.75 1.75-1.75h8.25c.97 0 1.75.78 1.75 1.75v4.2h.7c.4 0 .78.16 1.06.44l1.34 1.34c.28.28.44.66.44 1.06v.96h.71a1 1 0 1 1 0 2H18.7a2.6 2.6 0 0 1-5.1 0H9.4a2.6 2.6 0 0 1-5.1 0H3.5a1 1 0 1 1 0-2h.7v-.8c0-.44.14-.87.4-1.23l1.1-1.57H5.25A1.75 1.75 0 0 1 3.5 14.2Zm2.8 4.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm9.85 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-[22px] border border-white/10 bg-black/20 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="text-right">
            <p className="text-sm text-[#bfc4c9]">
              شحنة #{selectedShipment.id} • {selectedShipment.categoryLabel}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {selectedShipment.product}
            </p>
            <p className="mt-2 text-sm leading-7 text-[#d4d9dc]">{selectedShipment.alert}</p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsTracking((value) => !value)}
              className="rounded-[14px] bg-[#7e9691] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8aa5a0]"
            >
              {isTracking ? 'إيقاف التتبع' : 'تشغيل التتبع'}
            </button>
            <div className="rounded-[14px] bg-white/10 px-4 py-2 text-sm text-white">
              {Math.round(progress * 100)}%
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-5 pt-1 sm:px-6 sm:pb-6 lg:px-8">
        <div className="mx-auto mb-5 h-2 w-24 rounded-full bg-white/90 sm:w-28" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="rounded-[18px] bg-[#2d302a] px-4 py-3 text-right">
            <p className="text-xs text-[#99a29d]">آخر تحديث</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {selectedShipment.lastUpdate}
            </p>
          </div>

          <div className="text-right">
            <p className="text-base text-[#9b9d98]">الشحنة المحددة</p>
            <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">#{selectedShipment.id}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="المسافة المتبقية" value={`${derivedStats.distanceLeft} كم`} />
          <StatCard label="الوقت المتوقع" value={`${derivedStats.etaMinutes} دقيقة`} />
          <StatCard
            label="النقاط المنجزة"
            value={`${derivedStats.completedStops}/${selectedShipment.points.length}`}
          />
          <StatCard label="حالة التتبع" value={isTracking ? 'نشط' : 'متوقف'} />
        </div>

        <div className="mt-6 h-2 rounded-full bg-[#2d2f2b]">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              selectedShipment.tone === 'danger' ? 'bg-[#f38b84]' : 'bg-[#55d98c]'
            }`}
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
          <div className="flex items-end justify-center rounded-[24px] bg-[#2a2c27] p-4">
            <img
              src={heroTruck}
              alt="شاحنة الشحنة"
              className="h-auto w-full max-w-[220px] object-contain"
            />
          </div>

          <div className="grid gap-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <DetailBlock label="محطة الانطلاق" value={selectedShipment.origin} />
              <DetailBlock label="محطة الوصول" value={selectedShipment.destination} />
              <DetailBlock label="الكمية" value={selectedShipment.quantity} />
              <DetailBlock label="الوزن" value={selectedShipment.weight} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <DetailBlock label="المنتج" value={selectedShipment.product} />
              <DetailBlock label="الحالة" value={selectedShipment.status} />
              <DetailBlock label="درجة الحرارة" value={selectedShipment.temperature} />
              <DetailBlock label="المدى المطلوب" value={selectedShipment.targetTemperature} />
            </div>

            <div className="rounded-[24px] border border-white/8 bg-[#2a2c27] p-5 text-right">
              <p className="text-sm text-[#8f918b]">التوصية التشغيلية</p>
              <p className="mt-2 text-lg font-semibold leading-8 text-white sm:text-xl">
                {selectedShipment.recommendation}
              </p>
            </div>

            <div className="flex flex-col gap-5 rounded-[24px] border border-white/8 bg-[#2a2c27] p-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center justify-end gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#33a853] text-white sm:h-16 sm:w-16">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1.5 1.5 0 0 1 1.54-.36c1.12.37 2.3.57 3.55.57A1.5 1.5 0 0 1 22 16.89V20.5A1.5 1.5 0 0 1 20.5 22C10.28 22 2 13.72 2 3.5A1.5 1.5 0 0 1 3.5 2h3.61a1.5 1.5 0 0 1 1.5 1.5c0 1.25.2 2.43.57 3.55a1.5 1.5 0 0 1-.36 1.54l-2.2 2.2Z" />
                  </svg>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#25271f] sm:h-16 sm:w-16">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.55 1.28 4.85 3.34 6.46-.12.98-.54 2.42-1.56 3.72-.18.23-.2.55-.05.8.14.24.42.38.7.34 2.18-.32 3.84-1.19 4.85-1.86.77.2 1.59.31 2.42.31 5.52 0 10-3.94 10-8.8S17.52 3 12 3Zm-3 9.3a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm3 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm3 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 self-start sm:self-auto">
                <div className="text-right">
                  <p className="text-xl font-semibold text-white sm:text-2xl">
                    {selectedShipment.driver}
                  </p>
                  <p className="mt-1 text-sm text-[#8f918b]">سائق الشحنة</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#8d7558] text-white sm:h-16 sm:w-16">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Zm0 2.1c-4.01 0-7.27 2.9-7.27 6.47 0 .46.37.83.83.83h12.88c.46 0 .83-.37.83-.83 0-3.57-3.26-6.47-7.27-6.47Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[20px] bg-[#2a2c27] p-4 text-right">
      <p className="text-sm text-[#8f918b]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{value}</p>
    </div>
  )
}

function DetailBlock({ label, value }) {
  return (
    <div className="text-right">
      <p className="text-sm text-[#8f918b]">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white sm:text-xl">{value}</p>
    </div>
  )
}

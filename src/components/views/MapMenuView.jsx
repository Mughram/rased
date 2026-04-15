import { useEffect, useState } from 'react'
import heroTruck from '../../assets/hero.png'

const routePoints = [
  { left: 18, top: 74, label: 'جازان', progress: 0.1 },
  { left: 30, top: 60, label: 'أبو عريش', progress: 0.3 },
  { left: 45, top: 49, label: 'بيشة', progress: 0.5 },
  { left: 63, top: 34, label: 'وادي الدواسر', progress: 0.75 },
  { left: 79, top: 18, label: 'الرياض', progress: 1 },
]

function interpolatePosition(progress) {
  const safeProgress = Math.min(Math.max(progress, 0), 1)
  const scaled = safeProgress * (routePoints.length - 1)
  const index = Math.floor(scaled)
  const nextIndex = Math.min(index + 1, routePoints.length - 1)
  const point = routePoints[index]
  const nextPoint = routePoints[nextIndex]
  const localProgress = scaled - index

  return {
    left: point.left + (nextPoint.left - point.left) * localProgress,
    top: point.top + (nextPoint.top - point.top) * localProgress,
  }
}

export default function MapMenuView() {
  const [isTracking, setIsTracking] = useState(true)
  const [progress, setProgress] = useState(0.38)

  useEffect(() => {
    if (!isTracking) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 0.015
        return next >= 1 ? 0.1 : next
      })
    }, 1400)

    return () => window.clearInterval(intervalId)
  }, [isTracking])

  const vehiclePosition = interpolatePosition(progress)
  const completedStops = routePoints.filter((point) => progress >= point.progress).length
  const distanceLeft = Math.max(12, Math.round((1 - progress) * 248))
  const etaMinutes = Math.max(8, Math.round((1 - progress) * 95))

  return (
    <section className="overflow-hidden rounded-[28px] border border-white/8 bg-[#22241f] shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
      <div className="relative h-[340px] overflow-hidden bg-[#4a5568] sm:h-[400px] lg:h-[440px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(43,220,255,0.12),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(43,220,255,0.1),transparent_20%),linear-gradient(180deg,#4a5568_0%,#465062_100%)]" />
        <div className="absolute -left-8 top-0 h-[460px] w-[6px] rotate-[14deg] rounded-full bg-[#24b6c7]/70 shadow-[0_0_25px_rgba(36,182,199,0.45)]" />
        <div className="absolute left-[24%] top-[-3%] h-[500px] w-[6px] rotate-[-18deg] rounded-full bg-[#24b6c7]/70 shadow-[0_0_25px_rgba(36,182,199,0.45)]" />
        <div className="absolute right-[8%] top-[-10%] h-[430px] w-[4px] rotate-[24deg] rounded-full bg-[#24b6c7]/45" />

        <div className="absolute left-[6%] top-[18%] h-24 w-32 rounded-[24px] bg-[#313947]/80" />
        <div className="absolute left-[42%] top-[8%] h-20 w-28 rounded-[20px] bg-[#2f3744]/80" />
        <div className="absolute right-[10%] top-[20%] h-28 w-36 rounded-[28px] bg-[#303949]/75" />
        <div className="absolute left-[16%] top-[44%] h-20 w-24 rounded-[22px] bg-[#303847]/75" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-5 text-sm text-white/90">
          <span>12:30</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-5 rounded-sm border border-white/70" />
            <span className="h-2 w-2 rounded-full bg-white/80" />
          </div>
        </div>

        {routePoints.map((point) => (
          <div
            key={point.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${point.left}%`, top: `${point.top}%` }}
          >
            <div
              className={`h-4 w-4 rounded-full border-2 ${
                progress >= point.progress
                  ? 'border-[#78f0b2] bg-[#78f0b2]/70'
                  : 'border-white/60 bg-white/10'
              }`}
            />
            <p className="mt-2 whitespace-nowrap rounded-md bg-black/35 px-2 py-1 text-xs text-white/90">
              {point.label}
            </p>
          </div>
        ))}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear"
          style={{ left: `${vehiclePosition.left}%`, top: `${vehiclePosition.top}%` }}
        >
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#24b6c7]/20 blur-xl" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-black/85 shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-white"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.5 14.2V10c0-.97.78-1.75 1.75-1.75h8.25c.97 0 1.75.78 1.75 1.75v4.2h.7c.4 0 .78.16 1.06.44l1.34 1.34c.28.28.44.66.44 1.06v.96h.71a1 1 0 1 1 0 2H18.7a2.6 2.6 0 0 1-5.1 0H9.4a2.6 2.6 0 0 1-5.1 0H3.5a1 1 0 1 1 0-2h.7v-.8c0-.44.14-.87.4-1.23l1.1-1.57H5.25A1.75 1.75 0 0 1 3.5 14.2Zm2.8 4.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm9.85 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 rounded-[22px] border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-[#bfc4c9]">تتبع مباشر للشحنة #267</p>
              <p className="mt-2 text-xl font-semibold text-white">
                السيارة تتحرك الآن باتجاه الرياض
              </p>
            </div>

            <div className="flex items-center gap-3">
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
      </div>

      <div className="px-5 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-5 h-2 w-28 rounded-full bg-white/90" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base text-[#9b9d98]">شحنة رقم</p>
            <p className="mt-1 text-4xl font-bold text-white">#267</p>
          </div>
          <div className="rounded-[18px] bg-[#2d302a] px-4 py-3 text-right">
            <p className="text-xs text-[#99a29d]">آخر تحديث</p>
            <p className="mt-1 text-lg font-semibold text-white">قبل دقيقة</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[20px] bg-[#2a2c27] p-4">
            <p className="text-sm text-[#8f918b]">المسافة المتبقية</p>
            <p className="mt-2 text-3xl font-semibold text-white">{distanceLeft} كم</p>
          </div>
          <div className="rounded-[20px] bg-[#2a2c27] p-4">
            <p className="text-sm text-[#8f918b]">الوقت المتوقع</p>
            <p className="mt-2 text-3xl font-semibold text-white">{etaMinutes} دقيقة</p>
          </div>
          <div className="rounded-[20px] bg-[#2a2c27] p-4">
            <p className="text-sm text-[#8f918b]">النقاط المنجزة</p>
            <p className="mt-2 text-3xl font-semibold text-white">{completedStops}/5</p>
          </div>
          <div className="rounded-[20px] bg-[#2a2c27] p-4">
            <p className="text-sm text-[#8f918b]">حالة التتبع</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {isTracking ? 'نشط' : 'متوقف'}
            </p>
          </div>
        </div>

        <div className="mt-8 h-2 rounded-full bg-[#2d2f2b]">
          <div
            className="h-full rounded-full bg-[#55d98c] transition-all duration-1000 ease-linear"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
          <div className="flex items-end justify-center rounded-[24px] bg-[#2a2c27] p-4">
            <img
              src={heroTruck}
              alt="شاحنة الشحنة"
              className="h-auto w-full max-w-[220px] object-contain"
            />
          </div>

          <div className="grid gap-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm text-[#8f918b]">محطة المغادرة</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  ميناء جازان، جازان
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8f918b]">محطة الوصول</p>
                <p className="mt-2 text-xl font-semibold text-white">
                  السوق المركزي، الرياض
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8f918b]">الكمية</p>
                <p className="mt-2 text-xl font-semibold text-white">30 صندوق</p>
              </div>
              <div>
                <p className="text-sm text-[#8f918b]">الوزن</p>
                <p className="mt-2 text-xl font-semibold text-white">112 kg</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[#8f918b]">التحميل</p>
              <p className="mt-2 text-xl font-semibold text-white">
                سوق السمك - جازان
              </p>
            </div>

            <div className="flex flex-col gap-5 rounded-[24px] border border-white/8 bg-[#2a2c27] p-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#33a853] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1.5 1.5 0 0 1 1.54-.36c1.12.37 2.3.57 3.55.57A1.5 1.5 0 0 1 22 16.89V20.5A1.5 1.5 0 0 1 20.5 22C10.28 22 2 13.72 2 3.5A1.5 1.5 0 0 1 3.5 2h3.61a1.5 1.5 0 0 1 1.5 1.5c0 1.25.2 2.43.57 3.55a1.5 1.5 0 0 1-.36 1.54l-2.2 2.2Z" />
                  </svg>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#25271f]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 3C6.48 3 2 6.94 2 11.8c0 2.55 1.28 4.85 3.34 6.46-.12.98-.54 2.42-1.56 3.72-.18.23-.2.55-.05.8.14.24.42.38.7.34 2.18-.32 3.84-1.19 4.85-1.86.77.2 1.59.31 2.42.31 5.52 0 10-3.94 10-8.8S17.52 3 12 3Zm-3 9.3a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm3 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm3 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-4 self-start sm:self-auto">
                <div className="text-right">
                  <p className="text-2xl font-semibold text-white">عبدالرحمن سامر</p>
                  <p className="mt-1 text-sm text-[#8f918b]">سائق الشاحنة</p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#8d7558] text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-10 w-10"
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

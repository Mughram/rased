import LogoMark from './LogoMark'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2d2a2a]">
      <div className="flex flex-col items-center gap-4">
        <LogoMark className="h-40 w-[280px] animate-pulse" />
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full animate-[loadingBar_1s_ease-in-out] rounded-full bg-[#0A8A87]" />
        </div>
      </div>
    </div>
  )
}

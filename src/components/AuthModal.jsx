import LogoMark from './LogoMark'
import SignInForm from './auth/SignInForm'
import SignUpForm from './auth/SignUpForm'

export default function AuthModal({ mode, onModeChange, onClose }) {
  const isSignIn = mode === 'signin'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm">
      <div className="grid w-full max-w-[1080px] overflow-hidden rounded-[36px] border border-white/10 bg-[#262823] shadow-[0_30px_80px_rgba(0,0,0,0.38)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden bg-[radial-gradient(circle_at_top,rgba(126,150,145,0.24),transparent_42%),linear-gradient(180deg,#38403a_0%,#2a2d27_100%)] p-8 lg:flex lg:flex-col lg:justify-between">
          <div>
            <LogoMark className="h-28 w-auto" />
            <p className="mt-4 text-sm text-[#c9cbc4]">هوية مشروع رصيد</p>
            <h2 className="mt-4 text-5xl font-bold leading-[1.15] text-white">
              تتبع ذكي للشحنات من أول دخول
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#d7d8d3]">
              ادخل إلى لوحة المتابعة وابدأ بإدارة الشحنات الحرارية، المخاطر
              المتوقعة، والمسارات المباشرة من واجهة واحدة.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-[#b9bbb4]">تنبيهات مباشرة</p>
              <p className="mt-2 text-3xl font-semibold text-white">24/7</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-[#b9bbb4]">نسبة الشحنات الآمنة</p>
              <p className="mt-2 text-3xl font-semibold text-[#9fe5b6]">75%</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <LogoMark className="mb-4 h-20 w-auto lg:hidden" />
              <p className="text-sm text-[#9a9c95]">مرحباً بك</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                {isSignIn ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
              </h1>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#2d302a] text-xl text-white transition hover:bg-[#353932]"
              aria-label="إغلاق"
            >
              ×
            </button>
          </div>

          <div className="mt-6 inline-flex rounded-2xl bg-[#2d302a] p-1">
            <button
              type="button"
              onClick={() => onModeChange('signin')}
              className={`rounded-2xl px-5 py-2 text-sm font-semibold transition ${
                isSignIn
                  ? 'bg-[#7e9691] text-white'
                  : 'text-[#b9bbb4] hover:text-white'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => onModeChange('signup')}
              className={`rounded-2xl px-5 py-2 text-sm font-semibold transition ${
                !isSignIn
                  ? 'bg-[#7e9691] text-white'
                  : 'text-[#b9bbb4] hover:text-white'
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          <div className="mt-8">
            {isSignIn ? (
              <SignInForm
                onSwitch={() => onModeChange('signup')}
                onSubmit={onClose}
              />
            ) : (
              <SignUpForm
                onSwitch={() => onModeChange('signin')}
                onSubmit={onClose}
              />
            )}
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-[#8f918b]">
            بالمتابعة، سيتم فتح منصة رصيد وحفظ حالة الدخول الأولى على هذا
            المتصفح.
          </p>
        </div>
      </div>
    </div>
  )
}

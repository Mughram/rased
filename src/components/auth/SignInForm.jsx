export default function SignInForm({ onSwitch, onSubmit }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="mb-2 block text-sm text-[#c9cbc4]" htmlFor="signin-email">
          البريد الإلكتروني
        </label>
        <input
          id="signin-email"
          type="email"
          placeholder="name@example.com"
          className="h-12 w-full rounded-2xl border border-white/10 bg-[#2d302a] px-4 text-white outline-none placeholder:text-[#8b8d86] focus:border-[#7e9691]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-[#c9cbc4]" htmlFor="signin-password">
          كلمة المرور
        </label>
        <input
          id="signin-password"
          type="password"
          placeholder="••••••••"
          className="h-12 w-full rounded-2xl border border-white/10 bg-[#2d302a] px-4 text-white outline-none placeholder:text-[#8b8d86] focus:border-[#7e9691]"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-2xl bg-[#7e9691] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#8aa5a0]"
      >
        تسجيل الدخول
      </button>

      <p className="text-center text-sm text-[#b7b8b2]">
        ليس لديك حساب؟{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-[#dff3ee]"
        >
          إنشاء حساب
        </button>
      </p>
    </form>
  )
}

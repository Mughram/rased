export default function HomeView({ currentItem }) {
  return (
    <section className="rounded-[24px] border border-dashed border-white/10 bg-[#232520] p-6 sm:p-8">
      <p className="text-sm text-[#9a9c95]">{currentItem.label}</p>
      <h2 className="mt-3 text-2xl font-semibold text-white lg:text-3xl">
        {currentItem.title}
      </h2>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#c6c8c1] lg:text-xl">
        {currentItem.description}
      </p>
    </section>
  )
}

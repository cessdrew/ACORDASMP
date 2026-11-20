export default function SkillCard({ title, description, icon: Icon }) {
  return (
    <article className="group rounded-2xl border border-[#eadfe6] bg-white/80 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#d8b5c8] hover:shadow-lg hover:shadow-[#84526d]/10">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-[#f7eaf1] text-[#a85f86] transition group-hover:bg-[#b96d95] group-hover:text-white">
        <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <h3 className="text-[15px] font-semibold text-[#493943]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#817681]">{description}</p>
    </article>
  );
}
